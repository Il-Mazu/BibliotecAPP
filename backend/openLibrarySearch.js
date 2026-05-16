import { openLibraryCoverUrl } from "./openLibraryCovers.js";

const SEARCH_URL = "https://openlibrary.org/search.json";

/** Campi Solr utili per il form di aggiunta libro. */
const SEARCH_FIELDS = [
  "key",
  "title",
  "subtitle",
  "author_name",
  "first_publish_year",
  "isbn",
  "cover_i",
  "edition_key",
  "subject",
  "number_of_pages_median",
  "first_sentence",
].join(",");

function pickIsbn(isbns) {
  if (!isbns?.length) return null;
  const normalized = isbns.map((v) => String(v).replace(/[^\dX]/gi, ""));
  return normalized.find((v) => v.length === 13) || normalized[0] || null;
}

function formatAuthors(names) {
  if (!names?.length) return "Autore sconosciuto";
  return names.join(", ");
}

const GENERIC_SUBJECTS = new Set([
  "fiction",
  "accessible book",
  "protected daisy",
  "in library",
  "large type books",
  "books and reading",
]);

/** Sceglie un genere leggibile tra i soggetti Open Library. */
function pickGenre(subjects) {
  if (!subjects?.length) return null;
  const candidates = subjects.filter(
    (s) => s.length <= 48 && !/^LCCN|^DDC|^lcsh:/i.test(s)
  );
  const specific = candidates.find(
    (s) => !GENERIC_SUBJECTS.has(s.toLowerCase())
  );
  return specific || candidates[0] || subjects[0];
}

function pickDescription(firstSentence) {
  if (!firstSentence?.length) return null;
  return firstSentence
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
}

function buildTitle(title, subtitle) {
  if (!title) return "";
  if (!subtitle?.trim()) return title;
  return `${title}: ${subtitle.trim()}`;
}

export function mapSearchDoc(doc) {
  const coverId = doc.cover_i || null;
  const isbn = pickIsbn(doc.isbn);
  const olid = doc.edition_key?.[0] || null;
  const coverKeys = { coverId, isbn, olid };

  return {
    title: buildTitle(doc.title, doc.subtitle),
    author: formatAuthors(doc.author_name),
    year: doc.first_publish_year ?? null,
    genre: pickGenre(doc.subject),
    description: pickDescription(doc.first_sentence),
    pages: doc.number_of_pages_median ?? null,
    isbn,
    coverId,
    coverUrl: openLibraryCoverUrl(coverKeys, "M"),
    coverUrlSmall: openLibraryCoverUrl(coverKeys, "S"),
    openLibraryKey: doc.key,
  };
}

export async function searchOpenLibrary(query, { limit = 10, lang = "it" } = {}) {
  const params = new URLSearchParams({
    q: query.trim(),
    limit: String(limit),
    fields: SEARCH_FIELDS,
  });
  if (lang) params.set("lang", lang);

  const response = await fetch(`${SEARCH_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Open Library search failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.docs ?? []).map(mapSearchDoc);
}

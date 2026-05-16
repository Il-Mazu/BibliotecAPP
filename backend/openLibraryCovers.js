const COVERS_BASE = "https://covers.openlibrary.org/b";

/**
 * @see https://openlibrary.org/dev/docs/api/covers
 * @param {"S"|"M"|"L"} size
 */
export function openLibraryCoverUrl({ coverId, isbn, olid }, size = "M") {
  if (coverId) {
    return `${COVERS_BASE}/id/${coverId}-${size}.jpg`;
  }
  const cleanIsbn = isbn?.replace(/[^\dX]/gi, "");
  if (cleanIsbn) {
    return `${COVERS_BASE}/isbn/${cleanIsbn}-${size}.jpg`;
  }
  const cleanOlid = olid?.replace(/^\//, "");
  if (cleanOlid) {
    return `${COVERS_BASE}/olid/${cleanOlid}-${size}.jpg`;
  }
  return null;
}

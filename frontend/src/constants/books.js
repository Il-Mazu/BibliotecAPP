export const SAMPLE_BOOKS = [
  {
    id: 1,
    title: "Il nome della rosa",
    author: "Umberto Eco",
    year: 1980,
    genre: "Romanzo storico",
    description: "Un misterioso omicidio in un'abbazia medievale diventa il pretesto per una straordinaria avventura intellettuale.",
    coverColor: "#2D4A6E",
    pages: 502,
    isbn: "978-8845292866",
  },
  {
    id: 2,
    title: "Se una notte d'inverno ...",
    author: "Italo Calvino",
    year: 1979,
    genre: "Metafiction",
    description: "Un romanzo che mette in discussione la natura stessa della lettura, dove il lettore diventa protagonista.",
    coverColor: "#6B3A52",
    pages: 260,
    isbn: "978-8804668237",
  },
  {
    id: 3,
    title: "I Promessi Sposi",
    author: "Alessandro Manzoni",
    year: 1827,
    genre: "Romanzo storico",
    description: "Il capolavoro della letteratura italiana del XIX secolo, ambientato nella Lombardia del Seicento.",
    coverColor: "#3D6B4A",
    pages: 720,
    isbn: "978-8804622697",
  },
  {
    id: 4,
    title: "Uno, nessuno e centomila",
    author: "Luigi Pirandello",
    year: 1926,
    genre: "Romanzo filosofico",
    description: "La crisi d'identità di Vitangelo Moscarda, che scopre di essere percepito diversamente da tutti.",
    coverColor: "#7A4B2E",
    pages: 192,
    isbn: "978-8845289958",
  },
];

export const GENRE_COLORS = {
  "Romanzo storico": { bg: "#E4E8DC", text: "#3A4A32" },
  "Metafiction": { bg: "#EDE4DC", text: "#5C3A4A" },
  "Romanzo filosofico": { bg: "#F0E6D8", text: "#6B4A28" },
  Giallo: { bg: "#F2ECD8", text: "#6B5520" },
  Narrativa: { bg: "#E0E8DC", text: "#2E4A38" },
  default: { bg: "#EDE6D8", text: "#6B5E4E" },
};

export const COVER_PALETTE = ["#2D4A6E", "#6B3A52", "#3D6B4A", "#7A4B2E", "#3A5C6B", "#5C3D6B"];

export function getGenreStyle(genre) {
  return GENRE_COLORS[genre] || GENRE_COLORS.default;
}

export function previewColorFromKey(key) {
  return COVER_PALETTE[(key?.charCodeAt(0) ?? 0) % COVER_PALETTE.length];
}

export function randomCoverColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 45%, 35%)`;
}

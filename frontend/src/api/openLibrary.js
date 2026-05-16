const API_BASE = "http://localhost:3001";

export async function searchOpenLibrary(query) {
  const res = await fetch(
    `${API_BASE}/openlibrary/search?q=${encodeURIComponent(query)}`
  );
  return res.json();
}

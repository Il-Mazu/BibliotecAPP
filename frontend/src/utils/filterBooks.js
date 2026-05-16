export function filterBooks(books, searchQuery, filterGenre) {
  const q = searchQuery.toLowerCase();
  return books.filter((book) => {
    const matchSearch =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q);
    const matchGenre = filterGenre === "Tutti" || book.genre === filterGenre;
    return matchSearch && matchGenre;
  });
}

export function getGenres(books) {
  return ["Tutti", ...Array.from(new Set(books.map((b) => b.genre).filter(Boolean)))];
}

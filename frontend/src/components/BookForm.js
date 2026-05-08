import React, { useState } from 'react';

function BookForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched]= useState(false);

  // 1. La funzione viene chiamata solo al submit del form
  const handleSearch = async (e) => {
    e.preventDefault(); // Impedisce il refresh della pagina
    setHasSearched(true);
    if (query.trim().length < 2) {
      alert("Inserisci almeno 2 caratteri per la ricerca");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/openlibrary/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <h2>Aggiungi un Nuovo Libro</h2>
      
      {/* 2. Colleghiamo handleSearch qui */}
      <form className="book-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="title">Titolo</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Inserisci il titolo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Ricerca in corso..." : "Cerca Libro"}
        </button>
      </form>

      <ul>
        {results.length > 0 ? (
          results.map((book) => (
            <li key={book.openLibraryKey}>
              {book.title} — {book.author} ({book.year})
            </li>
          ))
        ) : (
          !loading && hasSearched && query && <li>Nessun risultato trovato</li>
        )}
      </ul>
    </div>
  );
}

export default BookForm;
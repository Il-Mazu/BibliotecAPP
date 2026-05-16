import { useState } from "react";
import BookCover from "./BookCover";
import { ADD_BOOK_FIELDS } from "../constants/addBookFields";
import { previewColorFromKey, randomCoverColor } from "../constants/books";
import { searchOpenLibrary } from "../api/openLibrary";

const EMPTY_FORM = {
  title: "",
  author: "",
  year: "",
  genre: "",
  description: "",
  pages: "",
  isbn: "",
};

export default function AddBookModal({ onClose, onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const previewColor = selected
    ? previewColorFromKey(selected.openLibraryKey)
    : "#2D4A6E";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setHasSearched(true);
    setLoading(true);
    setSelected(null);
    try {
      const data = await searchOpenLibrary(query);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectBook = (book) => {
    setSelected(book);
    setForm({
      title: book.title || "",
      author: book.author || "",
      year: book.year || "",
      genre: book.genre || "",
      description: book.description || "",
      pages: book.pages || "",
      isbn: book.isbn || "",
    });
  };

  const clearSelection = () => {
    setSelected(null);
    setResults([]);
    setHasSearched(false);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onAdd({
      id: Date.now(),
      ...form,
      coverColor: randomCoverColor(),
    });
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="modal-header">
        <div className="modal-header-row">
          <div>
            <h2>Aggiungi un libro</h2>
            <p>Cerca nel catalogo OpenLibrary o inserisci manualmente</p>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca titolo, autore…"
          />
          <button type="submit" className="btn-search" disabled={loading}>
            {loading ? (
              <span className="material-symbols-outlined">hourglass_empty</span>
            ) : (
              "Cerca"
            )}
          </button>
        </form>

        {hasSearched && results.length > 0 && !selected && (
          <div>
            <p className="results-label">{results.length} risultati trovati</p>
            <div className="results-list">
              {results.map((book) => (
                <div
                  key={book.openLibraryKey}
                  className="result-item"
                  onClick={() => selectBook(book)}
                >
                  <BookCover
                    title={book.title}
                    author={book.author}
                    color={previewColor}
                    size="small"
                  />
                  <div className="result-item-info">
                    <p>{book.title}</p>
                    <p>
                      {book.author} · {book.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSearched && results.length === 0 && !loading && (
          <p className="no-results">Nessun risultato. Compila il form manualmente.</p>
        )}
      </div>

      <div className="modal-form">
        {selected && (
          <div className="selected-book-banner">
            <BookCover
              title={form.title}
              author={form.author}
              color={previewColor}
              size="small"
            />
            <div>
              <p className="label">Libro selezionato</p>
              <p className="title">{form.title}</p>
            </div>
            <button type="button" className="btn-clear-selection" onClick={clearSelection}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        <div className="form-grid">
          {ADD_BOOK_FIELDS.map(({ key, label, placeholder, full, textarea, type }) => (
            <div key={key} className={`form-field${full ? " full" : ""}`}>
              <label>{label}</label>
              {textarea ? (
                <textarea
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={placeholder}
                  rows={3}
                />
              ) : (
                <input
                  type={type || "text"}
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Annulla
          </button>
          <button type="button" className="btn-submit" onClick={handleSubmit}>
            Aggiungi alla collezione
          </button>
        </div>
      </div>
    </>
  );
}

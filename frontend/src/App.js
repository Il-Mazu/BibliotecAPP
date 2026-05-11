import { useState, useEffect } from "react";
import "./index.css";

const SAMPLE_BOOKS = [
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
    title: "Se una notte d'inverno un viaggiatore",
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

const GENRE_COLORS = {
  "Romanzo storico":    { bg: "#E8F0F7", text: "#1D3A5C" },
  "Metafiction":        { bg: "#F2EAF5", text: "#4A1E6B" },
  "Romanzo filosofico": { bg: "#FDF0E8", text: "#6B3A10" },
  "Giallo":             { bg: "#FEF9E7", text: "#6B5500" },
  "Narrativa":          { bg: "#E8F5F0", text: "#1C5C40" },
  default:              { bg: "#F0F0F0", text: "#555"    },
};

function BookCoverSVG({ title, author, color, size = "full" }) {
  if (size === "small") {
    return (
      <div
        style={{
          width: 60,
          height: 84,
          background: color,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'white' }}>menu_book</span>
      </div>
    );
  }

  const w = 160;
  const h = 220;
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");
  const gradId = `g-${title.length}-${w}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: "block", borderRadius: 6, flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={color} stopOpacity="1"  />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${gradId})`} rx="4" />
      <rect x="8" y="8" width={w - 16} height={h - 16} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2" />
      <rect x="8" y={h - 36} width={w - 16} height="1" fill="rgba(255,255,255,0.25)" />

      <text x={w / 2} y={h / 2 - 14} textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="Georgia, serif">{line1}</text>
      <text x={w / 2} y={h / 2 + 4}  textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="Georgia, serif">{line2}</text>
      <text x={w / 2} y={h - 18}      textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="Georgia, serif">{author}</text>
    </svg>
  );
}

function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">{children}</div>
    </div>
  );
}

function AddBookModal({ onClose, onAdd }) {
  const [query,       setQuery]       = useState("");
  const [results,     setResults]     = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [selected,    setSelected]    = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [form, setForm] = useState({
    title: "", author: "", year: "", genre: "",
    description: "", pages: "", isbn: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setHasSearched(true);
    setLoading(true);
    setSelected(null);
    try {
      const res  = await fetch(`http://localhost:3001/openlibrary/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
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
      title:       book.title       || "",
      author:      book.author      || "",
      year:        book.year        || "",
      genre:       book.genre       || "",
      description: book.description || "",
      pages:       book.pages       || "",
      isbn:        book.isbn        || "",
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
      coverColor: `hsl(${Math.floor(Math.random() * 360)}, 45%, 35%)`,
    });
  };

  const coverColors = ["#2D4A6E", "#6B3A52", "#3D6B4A", "#7A4B2E", "#3A5C6B", "#5C3D6B"];
  const previewColor = selected
    ? coverColors[(selected.openLibraryKey?.charCodeAt(0) ?? 0) % coverColors.length]
    : "#2D4A6E";

  const FIELDS = [
    { key: "title",       label: "Titolo *",    placeholder: "Es: Il nome della rosa",  full: true  },
    { key: "author",      label: "Autore",       placeholder: "Es: Umberto Eco"                      },
    { key: "year",        label: "Anno",         placeholder: "Es: 1980",               type: "number" },
    { key: "genre",       label: "Genere",       placeholder: "Es: Romanzo storico"                  },
    { key: "pages",       label: "Pagine",       placeholder: "Es: 502",                type: "number" },
    { key: "isbn",        label: "ISBN",         placeholder: "Es: 978-…"                            },
    { key: "description", label: "Descrizione",  placeholder: "Breve sinossi…",         full: true, textarea: true },
  ];

  return (
    <>
      <div className="modal-header">
        <div className="modal-header-row">
          <div>
            <h2>Aggiungi un libro</h2>
            <p>Cerca nel catalogo OpenLibrary o inserisci manualmente</p>
          </div>
          <button className="btn-modal-close" onClick={onClose}><span className="material-symbols-outlined">close</span></button>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca titolo, autore…"
          />
          <button type="submit" className="btn-search" disabled={loading}>
            {loading ? <span className="material-symbols-outlined">hourglass_empty</span> : "Cerca"}
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
                  <BookCoverSVG title={book.title} author={book.author} color={previewColor} size="small" />
                  <div className="result-item-info">
                    <p>{book.title}</p>
                    <p>{book.author} · {book.year}</p>
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
            <BookCoverSVG title={form.title} author={form.author} color={previewColor} size="small" />
            <div>
              <p className="label">Libro selezionato</p>
              <p className="title">{form.title}</p>
            </div>
            <button className="btn-clear-selection" onClick={clearSelection}><span className="material-symbols-outlined">close</span></button>
          </div>
        )}

        <div className="form-grid">
          {FIELDS.map(({ key, label, placeholder, full, textarea, type }) => (
            <div key={key} className={`form-field${full ? " full" : ""}`}>
              <label>{label}</label>
              {textarea ? (
                <textarea
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  rows={3}
                />
              ) : (
                <input
                  type={type || "text"}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button className="btn-submit" onClick={handleSubmit}>Aggiungi alla collezione</button>
        </div>
      </div>
    </>
  );
}

function BookDetailModal({ book, onClose, onDelete }) {
  if (!book) return null;
  const genre = GENRE_COLORS[book.genre] || GENRE_COLORS.default;

  const META = [
    { label: "Anno",   value: book.year  || "—" },
    { label: "Pagine", value: book.pages || "—" },
    { label: "ISBN",   value: book.isbn  || "—" },
  ];

  return (
    <div className="detail-modal">
      <div className="detail-top">
        <BookCoverSVG title={book.title} author={book.author} color={book.coverColor} size="full" />
        <div className="detail-info">
          <div style={{ marginBottom: 12 }}>
            <span
              className="genre-badge"
              style={{ background: genre.bg, color: genre.text }}
            >
              {book.genre || "—"}
            </span>
          </div>
          <h2 className="detail-title">{book.title}</h2>
          <p className="detail-author">{book.author}</p>
          <div className="detail-meta-grid">
            {META.map(({ label, value }) => (
              <div key={label} className="detail-meta-item">
                <p>{label}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {book.description && (
        <div className="detail-description-section">
          <p className="detail-description-label">Descrizione</p>
          <p className="detail-description-text">{book.description}</p>
        </div>
      )}

      <div className="detail-actions">
        <button className="btn-delete-detail" onClick={() => { onDelete(book.id); onClose(); }}>
          Elimina
        </button>
        <button className="btn-close-detail" onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
}

export default function App() {
  const [books,        setBooks]        = useState(SAMPLE_BOOKS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailBook,   setDetailBook]   = useState(null);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [filterGenre,  setFilterGenre]  = useState("Tutti");

  const genres = ["Tutti", ...Array.from(new Set(books.map(b => b.genre).filter(Boolean)))];

  const filtered = books.filter(b => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q);
    const matchGenre  = filterGenre === "Tutti" || b.genre === filterGenre;
    return matchSearch && matchGenre;
  });

  const addBook    = (book) => { setBooks(prev => [book, ...prev]); setShowAddModal(false); };
  const deleteBook = (id)   =>  setBooks(prev => prev.filter(b => b.id !== id));

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-logo">
          <div className="header-logo-icon">
            <img src="/logo.svg" alt="BibliotecApp Logo" style={{ width: '24px', height: '24px' }} />
          </div>
          <div>
            <h1>BibliotecApp</h1>
            <p>GESTIONE COLLEZIONE</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="header-count">
            <strong>{books.length}</strong> libri in catalogo
          </div>
          <button className="btn-add-book" onClick={() => setShowAddModal(true)}>
            <span className="plus">+</span> Aggiungi libro
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="filters-bar">
          <div className="search-wrapper">
            <span className="search-icon material-symbols-outlined">search</span>
            <input
              className="search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cerca titolo o autore…"
            />
          </div>
          <div className="genre-filters">
            {genres.map(g => (
              <button
                key={g}
                className={`btn-genre${filterGenre === g ? " active" : ""}`}
                onClick={() => setFilterGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Catalogo</h2>
          <div className="section-divider" />
          <span className="section-count">{filtered.length} titoli</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon material-symbols-outlined">inbox</div>
            <p>Nessun libro trovato</p>
          </div>
        ) : (
          <div className="books-grid">
            {filtered.map((book, i) => {
              const genre = GENRE_COLORS[book.genre] || GENRE_COLORS.default;
              return (
                <div
                  key={book.id}
                  className="book-card"
                  style={{ animationDelay: `${i * 0.04}s` }}
                  onClick={() => setDetailBook(book)}
                >
                  <div
                    className="card-cover-area"
                    style={{ background: `linear-gradient(135deg, ${book.coverColor}22, ${book.coverColor}11)` }}
                  >
                    <div className="cover-wrap">
                      <BookCoverSVG title={book.title} author={book.author} color={book.coverColor} size="full" />
                    </div>
                    <div className="card-cover-info">
                      <span
                        className="genre-badge"
                        style={{ background: genre.bg, color: genre.text }}
                      >
                        {book.genre || "—"}
                      </span>
                      <h3 className="card-title">{book.title}</h3>
                      <p className="card-author">{book.author}</p>
                    </div>
                  </div>

                  <div className="card-body">
                    {book.description && (
                      <p className="card-description">{book.description}</p>
                    )}
                    <div className="card-footer">
                      <div className="card-meta">
                        {book.year  && <div className="meta-item"><p>Anno</p><p>{book.year}</p></div>}
                        {book.pages && <div className="meta-item"><p>Pagine</p><p>{book.pages}</p></div>}
                      </div>
                      <button
                        className="btn-delete-card"
                        title="Elimina"
                        onClick={e => { e.stopPropagation(); deleteBook(book.id); }}
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <AddBookModal onClose={() => setShowAddModal(false)} onAdd={addBook} />
      </Modal>

      <Modal open={!!detailBook} onClose={() => setDetailBook(null)}>
        <BookDetailModal
          book={detailBook}
          onClose={() => setDetailBook(null)}
          onDelete={deleteBook}
        />
      </Modal>
    </div>
  );
}

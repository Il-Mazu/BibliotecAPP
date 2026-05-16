import BookCover from "./BookCover";
import { getGenreStyle } from "../constants/books";

const DETAIL_META = [
  { key: "year", label: "Anno" },
  { key: "pages", label: "Pagine" },
  { key: "isbn", label: "ISBN" },
];

export default function BookDetailModal({ book, onClose, onDelete }) {
  if (!book) return null;

  const genre = getGenreStyle(book.genre);

  return (
    <div className="detail-modal">
      <div className="detail-top">
        <BookCover
          title={book.title}
          author={book.author}
          color={book.coverColor}
          coverUrl={book.coverUrl}
        />
        <div className="detail-info">
          <div style={{ marginBottom: 12 }}>
            <span className="genre-badge" style={{ background: genre.bg, color: genre.text }}>
              {book.genre || "—"}
            </span>
          </div>
          <h2 className="detail-title">{book.title}</h2>
          <p className="detail-author">{book.author}</p>
          <div className="detail-meta-grid">
            {DETAIL_META.map(({ key, label }) => (
              <div key={key} className="detail-meta-item">
                <p>{label}</p>
                <p>{book[key] || "—"}</p>
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
        <button
          type="button"
          className="btn-delete-detail"
          onClick={() => {
            onDelete(book.id);
            onClose();
          }}
        >
          Elimina
        </button>
        <button type="button" className="btn-close-detail" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
}

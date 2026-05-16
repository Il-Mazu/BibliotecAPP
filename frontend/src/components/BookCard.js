import BookCover from "./BookCover";
import { getGenreStyle } from "../constants/books";

export default function BookCard({ book, index, onSelect, onDelete }) {
  const genre = getGenreStyle(book.genre);

  return (
    <div
      className="book-card"
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={() => onSelect(book)}
    >
      <div
        className="card-cover-area"
        style={{
          background: `linear-gradient(135deg, ${book.coverColor}22, ${book.coverColor}11)`,
        }}
      >
        <div className="cover-wrap">
          <BookCover title={book.title} author={book.author} color={book.coverColor} />
        </div>
        <div className="card-cover-info">
          <span className="genre-badge" style={{ background: genre.bg, color: genre.text }}>
            {book.genre || "—"}
          </span>
          <h3 className="card-title">{book.title}</h3>
          <p className="card-author">{book.author}</p>
        </div>
      </div>

      <div className="card-body">
        {book.description && <p className="card-description">{book.description}</p>}
        <div className="card-footer">
          <div className="card-meta">
            {book.year && (
              <div className="meta-item">
                <p>Anno</p>
                <p>{book.year}</p>
              </div>
            )}
            {book.pages && (
              <div className="meta-item">
                <p>Pagine</p>
                <p>{book.pages}</p>
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn-delete-card"
            title="Elimina"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book.id);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

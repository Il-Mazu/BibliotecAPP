import BookGrid from "./BookGrid";

export default function CatalogSection({ books, onSelect, onDelete }) {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Catalogo</h2>
        <div className="section-divider" />
        <span className="section-count">{books.length} titoli</span>
      </div>
      <BookGrid books={books} onSelect={onSelect} onDelete={onDelete} />
    </>
  );
}

import BookCard from "./BookCard";
import EmptyState from "./EmptyState";

export default function BookGrid({ books, onSelect, onDelete }) {
  if (books.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="books-grid">
      {books.map((book, index) => (
        <BookCard
          key={book.id}
          book={book}
          index={index}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

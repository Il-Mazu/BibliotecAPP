import { useState } from "react";
import "./index.css";
import { SAMPLE_BOOKS } from "./constants/books";
import { filterBooks, getGenres } from "./utils/filterBooks";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import FiltersBar from "./components/FiltersBar";
import CatalogSection from "./components/CatalogSection";
import Modal from "./components/Modal";
import AddBookModal from "./components/AddBookModal";
import BookDetailModal from "./components/BookDetailModal";

export default function App() {
  const [books, setBooks] = useState(SAMPLE_BOOKS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailBook, setDetailBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("Tutti");
  const { theme, toggleTheme } = useTheme();

  const genres = getGenres(books);
  const filtered = filterBooks(books, searchQuery, filterGenre);

  const addBook = (book) => {
    setBooks((prev) => [book, ...prev]);
    setShowAddModal(false);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className={`app ${theme}`}>
      <Header
        bookCount={books.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onAddBook={() => setShowAddModal(true)}
      />

      <main className="app-main">
        <FiltersBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          genres={genres}
          filterGenre={filterGenre}
          onFilterGenre={setFilterGenre}
        />
        <CatalogSection
          books={filtered}
          onSelect={setDetailBook}
          onDelete={deleteBook}
        />
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

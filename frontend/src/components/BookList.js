import React from 'react';

const BookList = () => {
  const testBooks = [
    { id: 1, title: 'Franco gatti', author: 'Gatti franco', year: 1980, genre: 'Giallo Storico' },
  ];

  return (
    <div className="book-list-container">
      <h2>Collezione Libri</h2>
      <div className="books-grid">
        {testBooks.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p className="book-author">Autore: {book.author}</p>
            <p className="book-year">Anno: {book.year}</p>
            <p className="book-genre">Genere: {book.genre}</p>
            <div className="book-actions">
              <button className="edit-btn">Modifica</button>
              <button className="delete-btn">Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;

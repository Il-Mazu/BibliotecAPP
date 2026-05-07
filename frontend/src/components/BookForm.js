import React from 'react';

const BookForm = () => {
  return (
    <div className="book-form-container">
      <h2>Aggiungi un Nuovo Libro</h2>
      <form className="book-form">
        <div className="form-group">
          <label htmlFor="title">Titolo</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Inserisci il titolo..."
          />
        </div>
        <button type="submit" className="submit-btn">Aggiungi Libro</button>
      </form>
    </div>
  );
};

export default BookForm;

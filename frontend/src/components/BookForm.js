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
        <div className="form-group">
          <label htmlFor="author">Autore</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Inserisci l'autore..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Anno di Pubblicazione</label>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Inserisci l'anno..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genere</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Inserisci il genere..."
          />
        </div>
        <button type="submit" className="submit-btn">Aggiungi Libro</button>
      </form>
    </div>
  );
};

export default BookForm;

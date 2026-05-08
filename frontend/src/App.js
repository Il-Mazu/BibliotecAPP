import React from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';





function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>BibliotecAPP</h1>
      </header>
      <main className="app-main">
        <BookForm />
        <BookList />
      </main>
    </div>
  );
}

export default App;

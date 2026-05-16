export default function Header({ bookCount, theme, onToggleTheme, onAddBook }) {
  return (
    <header className="app-header">
      <div className="header-logo">
        <div className="header-logo-icon">
          <img src="/logo.svg" alt="BibliotecApp Logo" style={{ width: 24, height: 24 }} />
        </div>
        <div>
          <h1>BibliotecApp</h1>
          <p>GESTIONE COLLEZIONE</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="header-count">
          <strong>{bookCount}</strong> libri in catalogo
        </div>

        <div className="toggle-switch">
          <label
            className="switch-label"
            aria-label={theme === "light" ? "Attiva modalità scura" : "Attiva modalità chiara"}
            title={theme === "light" ? "Attiva modalità scura" : "Attiva modalità chiara"}
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={theme === "light"}
              onChange={onToggleTheme}
            />
            <span className="slider" />
          </label>
        </div>

        <button type="button" className="btn-add-book" onClick={onAddBook}>
          <span className="plus">+</span> Aggiungi libro
        </button>
      </div>
    </header>
  );
}

export default function FiltersBar({ searchQuery, onSearchChange, genres, filterGenre, onFilterGenre }) {
  return (
    <div className="filters-bar">
      <div className="search-wrapper">
        <span className="search-icon material-symbols-outlined">search</span>
        <input
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cerca titolo o autore…"
        />
      </div>
      <div className="genre-filters">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={`btn-genre${filterGenre === genre ? " active" : ""}`}
            onClick={() => onFilterGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

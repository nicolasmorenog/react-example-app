import { useState } from 'react';

const Sidebar = ({ isDarkMode, toggleTheme, onSearch, locations, selectedLocation }) => {
  const [searchValue, setSearchValue] = useState('');

  // filtrado
  const filteredLocations = locations.filter((loc) => {
    const nameMatch = loc.name.toLowerCase().includes(searchValue.toLowerCase());
    const idMatch = loc.id.toString().includes(searchValue);
    return nameMatch || idMatch;
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // si el usuario empieza a escribir, reseteamos la selección natural para cerrar info windows
    onSearch(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{ padding: '0 20px', marginTop: '20px' }}>
          <button className={`theme-toggle-btn ${isDarkMode ? 'dark' : ''}`} onClick={toggleTheme}>
            {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="search-input" className="visually-hidden">
          Buscar por nombre o ID
        </label>
        <input
          id="search-input"
          autoComplete="off"
          name="search"
          className="input"
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={searchValue}
          onChange={handleInputChange}
          aria-describedby="search-help"
        />
        <span id="search-help" className="visually-hidden">
          Escribe el nombre o ID de la ubicación para filtrar los resultados
        </span>
      </div>
      <div className="sidebar-static-title">
        <h2>Resultados:</h2>
      </div>
      <div className="sidebar-content" style={{ overflowY: 'auto' }}>
        {filteredLocations.map((loc) => (
          <button
            type="button"
            className={`location-card ${selectedLocation?.id === loc.id ? 'active-card' : ''}`}
            key={loc.id}
            onClick={() => onSearch(loc)}
            aria-label={`Ver ubicación ${loc.name}${loc.status === 'inactive' ? ' - Fuera de servicio' : ''}`}
          >
            <h4>{loc.name}</h4>
            <p>{loc.address}</p>
            {selectedLocation?.id === loc.id && loc.status === 'inactive' && (
              <div className="status-badge-inactive">
                <strong>
                  <p>⚠️ TEMPORALMENTE FUERA DE SERVICIO!</p>
                </strong>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

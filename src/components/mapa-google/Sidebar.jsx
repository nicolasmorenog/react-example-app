import { useState } from 'react';

const Sidebar = ({ isDarkMode, toggleTheme, onSearch, locations }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // buscamos coincidencias por ID o por nombre
    const found = locations.find((loc) => loc.id === value || loc.name.toLowerCase().includes(value.toLowerCase()));

    if (found && value !== '') {
      onSearch(found);
    } else if (value === '') {
      onSearch(null);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{ padding: '0 20px', marginTop: '20px' }}>
          <button className={`theme-toggle-btn ${isDarkMode ? 'dark' : ''}`} onClick={toggleTheme}>
            {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>
        <h2>Marcadores</h2>
        <p>Descripción</p>
      </div>
      <div className="input-container">
        <input
          id="search-input"
          name="search"
          className="input"
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="sidebar-content" style={{ overflowY: 'auto' }}>
        {locations.map((loc) => (
          <div style={{ padding: '15px', borderBottom: '1px solid' }} key={loc.id}>
            <h4>{loc.name}</h4>
            <p>{loc.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const Sidebar = ({ isDarkMode, toggleTheme }) => {
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
        <input id="search-input" name="search" className="input" type="text" placeholder="Buscar" />
      </div>
      <div className="sidebar-content">
        <h3>Lugar</h3>
        <p>Dirección</p>
      </div>
    </div>
  );
};

export default Sidebar;

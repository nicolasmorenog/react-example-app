const Sidebar = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button
          onClick={toggleTheme}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: isDarkMode ? '#f1f1f1' : '#152341',
            color: isDarkMode ? '#152341' : 'white',
            width: '100%',
          }}
        >
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
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

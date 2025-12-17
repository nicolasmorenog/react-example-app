const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
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

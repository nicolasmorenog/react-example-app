import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { IconReload } from '@tabler/icons-react';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

import Item from '../components/to-do-list-API/Item';
import ItemList from '../components/to-do-list-API/ItemList';

import { supabase } from '../supabaseClient';

function ToDoListAPI({ isEditing = false }) {
  const { fetchTasks, lista, setLista, handleEdit, handleReset } = useContext(AppContext);
  const [filtro, setFiltro] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Ordenación.
  const [sortOrder, setSortOrder] = useState('createdAt-desc');

  // useEffect para cargar las tareas al iniciar el componente.
  useEffect(() => {
    // Mapeo de nombres del front al back.
    const columnMapping = {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      name: 'name',
    };

    const [sortColumn, sortDirection] = sortOrder.split('-');
    const column = columnMapping[sortColumn];
    const ascending = sortDirection === 'asc';
    fetchTasks({ column, ascending });
  }, [sortOrder]); // Se ejecuta cada vez que cambia el orden

  // Checkbox de completado.
  const handleToggle = async (id) => {
    const now = new Date().toISOString();
    const itemToToggle = lista.find((item) => item.id === id);
    const newCompletedAt = itemToToggle.completedAt === null ? now : null;

    const { error } = await supabase.from('todos').update({ completed_at: newCompletedAt }).eq('id', id);

    if (error) {
      toast.error('Failed to update item status.');
    } else {
      const nuevaLista = lista.map((item) =>
        item.id === id ? { ...item, completedAt: newCompletedAt, updatedAt: now } : item
      );
      setLista(nuevaLista);
      console.table(nuevaLista);
    }
  };

  // Contadores de items en cada filtro.
  const allItemsCount = lista.length;
  const pendingItemsCount = lista.filter((item) => item.completedAt === null).length;
  const completedItemsCount = allItemsCount - pendingItemsCount;

  // Filtrado.
  let filteredList;
  if (filtro === 'pending') {
    filteredList = lista.filter((item) => item.completedAt === null);
  } else if (filtro === 'completed') {
    filteredList = lista.filter((item) => item.completedAt !== null);
  } else {
    filteredList = lista;
  }

  // Paginación.
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const firstIndex = (currentPage - 1) * rowsPerPage;
  const lastIndex = firstIndex + rowsPerPage;
  let paginatedList = filteredList.slice(firstIndex, lastIndex);

  // Función para manejar el cambio de filas por página
  const handleRowsPerPageChange = (e) => {
    const newRows = Number(e.target.value);
    setRowsPerPage(newRows);
    setCurrentPage(1);
  };

  return (
    <div className="main-container">
      <h2>To Do List</h2>
      <div className="item">
        <div>
          <Item />
        </div>
      </div>
      <div className="filter-container">
        <div className="filter-group">
          <button
            className={`filter-button${filtro === 'all' ? '' : 'active-button'}`}
            onClick={() => {
              setFiltro('all');
              setCurrentPage(1);
            }}
          >
            All ({allItemsCount})
          </button>
          <button
            className={`filter-button${filtro === 'pending' ? '' : 'active-button'}`}
            onClick={() => {
              setFiltro('pending');
              setCurrentPage(1);
            }}
          >
            Pending ({pendingItemsCount})
          </button>
          <button
            className={`filter-button${filtro === 'completed' ? '' : 'active-button'}`}
            onClick={() => {
              setFiltro('completed');
              setCurrentPage(1);
            }}
          >
            Completed ({completedItemsCount})
          </button>
        </div>
        <button className="reset-button" onClick={handleReset} aria-label="Reset all items">
          <IconReload stroke={2} />
          Reset
        </button>
      </div>
      <div className="sort-container">
        <label htmlFor="sort-select">Order by: </label>
        <select id="sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="createdAt-asc">First Created</option>
          <option value="createdAt-desc">Last Created</option>
          <option value="name-asc">Alphabetical (A-Z)</option>
          <option value="name-desc">Alphabetical (Z-A)</option>
          <option value="updatedAt-asc">First Modified</option>
          <option value="updatedAt-desc">Last Modified</option>
        </select>
      </div>
      <div className="item-list">
        <ItemList
          lista={paginatedList}
          handleToggle={handleToggle}
          handleEdit={handleEdit}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          isEditing={isEditing}
        />
        <div className="pagination-controls">
          <div className="rows-per-page-selector">
            <label htmlFor="rows-per-page">Rows per page: </label>
            <select
              id="rows-per-page"
              className="rows-per-page-dropdown"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          {filteredList.length > rowsPerPage && (
            <div className="pagination">
              {filteredList.slice(firstIndex - rowsPerPage, lastIndex - rowsPerPage).length > 0 ? (
                <button onClick={() => setCurrentPage(currentPage - 1)}>&lt; Previous</button>
              ) : (
                <button className="inactive-button" disabled>
                  &lt; Previous
                </button>
              )}
              {currentPage > 1 && <button className="adjacent-page">{currentPage - 1}</button>}
              <button className="pagination-current-page">{currentPage}</button>
              {filteredList.slice(firstIndex + 10, lastIndex + 10).length > 0 && (
                <button className="adjacent-page">{currentPage + 1}</button>
              )}
              {filteredList.slice(firstIndex + 10, lastIndex + 10).length > 0 ? (
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next &gt;</button>
              ) : (
                <button className="inactive-button" disabled>
                  Next &gt;
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoListAPI;

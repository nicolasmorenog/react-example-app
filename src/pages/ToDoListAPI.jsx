import { useState, useMemo } from 'react';
import { IconReload } from '@tabler/icons-react';

import Item from '@/components/to-do-list-API/Item';
import ItemList from '@/components/to-do-list-API/ItemList';
import Pagination from '@/components/Pagination';
import { useToDoList } from '@/hooks/useToDoList';

const ITEMS_PER_PAGE = 10;

function ToDoListAPI({ isEditing = false }) {
  const { lista, isLoading, error, handleAddItem, handleToggle, handleEdit, handleDelete, handleReset } =
    useToDoList();

  const [filtro, setFiltro] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Early return for loading state
  if (isLoading) {
    return (
      <main className="main-container">
        <h2>To Do List</h2>
        <p role="status" aria-live="polite">
          Loading your tasks...
        </p>
      </main>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <main className="main-container">
        <h2>To Do List</h2>
        <p role="alert" aria-live="assertive">
          {error}
        </p>
      </main>
    );
  }

  // Memoized counters to avoid recalculation on every render
  const allItemsCount = lista.length;
  const pendingItemsCount = useMemo(() => lista.filter((item) => item.completedAt === null).length, [lista]);
  const completedItemsCount = allItemsCount - pendingItemsCount;

  // Memoized filtered list
  const filteredList = useMemo(() => {
    if (filtro === 'pending') {
      return lista.filter((item) => item.completedAt === null);
    }
    if (filtro === 'completed') {
      return lista.filter((item) => item.completedAt !== null);
    }
    return lista;
  }, [lista, filtro]);

  // Memoized paginated list
  const paginatedList = useMemo(() => {
    const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastIndex = firstIndex + ITEMS_PER_PAGE;
    return filteredList.slice(firstIndex, lastIndex);
  }, [filteredList, currentPage]);

  // Handler for filter change
  const handleFilterChange = (newFilter) => {
    setFiltro(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handler for page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="main-container">
      <h2>To Do List</h2>

      <section aria-labelledby="add-item-section">
        <h3 id="add-item-section" className="visually-hidden">
          Add new task
        </h3>
        <div className="item">
          <div>
            <Item handleAddItem={handleAddItem} />
          </div>
        </div>
      </section>

      <section aria-labelledby="filter-section">
        <h3 id="filter-section" className="visually-hidden">
          Filter and actions
        </h3>
        <div className="filter-container">
          <div className="filter-group" role="group" aria-label="Filter tasks">
            <button
              type="button"
              className={`filter-button${filtro === 'all' ? '' : 'active-button'}`}
              onClick={() => handleFilterChange('all')}
              aria-pressed={filtro === 'all'}
              aria-label={`Show all tasks (${allItemsCount})`}
            >
              All ({allItemsCount})
            </button>
            <button
              type="button"
              className={`filter-button${filtro === 'pending' ? '' : 'active-button'}`}
              onClick={() => handleFilterChange('pending')}
              aria-pressed={filtro === 'pending'}
              aria-label={`Show pending tasks (${pendingItemsCount})`}
            >
              Pending ({pendingItemsCount})
            </button>
            <button
              type="button"
              className={`filter-button${filtro === 'completed' ? '' : 'active-button'}`}
              onClick={() => handleFilterChange('completed')}
              aria-pressed={filtro === 'completed'}
              aria-label={`Show completed tasks (${completedItemsCount})`}
            >
              Completed ({completedItemsCount})
            </button>
          </div>
          <button type="button" className="reset-button" onClick={handleReset} aria-label="Reset all tasks">
            <IconReload stroke={2} aria-hidden="true" />
            Reset
          </button>
        </div>
      </section>

      <section aria-labelledby="tasks-list-section">
        <h3 id="tasks-list-section" className="visually-hidden">
          Tasks
        </h3>
        <div className="item-list" aria-live="polite" aria-atomic="false">
          <ItemList
            lista={paginatedList}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            isEditing={isEditing}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={filteredList.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </section>
    </main>
  );
}

export default ToDoListAPI;

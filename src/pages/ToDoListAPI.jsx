import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { IconReload } from '@tabler/icons-react';

import Item from '../components/lista-compra/Item';
import ItemList from '../components/lista-compra/ItemList';

const LOCAL_STORAGE_KEY = 'miApp.toDoListAPI';

function ToDoListAPI({ isEditing = false }) {
  //Leer localStorage
  const [lista, setLista] = useState(() => {
    try {
      const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (savedValue === null) {
        return [];
      }
      return JSON.parse(savedValue);
    } catch (error) {
      console.error('Error: ', error);
      return [];
    }
  });

  // Array de datos que obtendremos de la API
  const [data, setData] = useState(null);

  // Obtener datos
  useEffect(() => {
    if (lista.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=100')
        .then((response) => response.json())
        .then((apiData) => setData(apiData));
    }
  }, []);

  // Sincronizar datos
  useEffect(() => {
    if (data && lista.length === 0) {
      const now = new Date().toISOString();
      const listaAPIData = data.map((todo) => ({
        id: todo.id,
        name: todo.title,
        completedAt: todo.completed ? now : null,
        createdAt: now,
        updatedAt: now,
      }));
      setLista(listaAPIData);
    }
  }, [data]);

  //Guardar localStorage
  useEffect(() => {
    const valueToSave = JSON.stringify(lista);
    localStorage.setItem(LOCAL_STORAGE_KEY, valueToSave);
    console.log('LISTA GUARDADA: ');
    console.table(lista);
  }, [lista]);

  const [filtro, setFiltro] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleToggle = (id) => {
    const now = new Date().toISOString();

    const nuevaLista = lista.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          updatedAt: now,
          completedAt: item.completedAt === null ? now : null,
        };
      } else {
        return item;
      }
    });

    setLista(nuevaLista);
    console.table(nuevaLista);
  };

  let filteredList;

  if (filtro === 'pending') {
    filteredList = lista.filter((item) => item.completedAt === null);
  } else if (filtro === 'completed') {
    filteredList = lista.filter((item) => item.completedAt !== null);
  } else {
    filteredList = lista;
  }

  const handleEdit = (id, newName) => {
    const now = new Date().toISOString();

    const nuevaLista = lista.map((item) => {
      if (item.id === id) {
        console.log('Item:', item.name, '-->', newName);
        return { ...item, name: newName, updatedAt: now };
      } else {
        return item;
      }
    });

    setLista(nuevaLista);
  };

  const handleDelete = (id) => {
    const nuevaLista = lista.filter((item) => item.id !== id);
    const anteriorLista = [...lista];
    setLista(nuevaLista);

    const itemToDelete = lista.find((item) => item.id === id);

    toast.success(`Item "${itemToDelete.name}" has been deleted`, {
      action: {
        label: 'Undo',
        onClick: () => setLista(anteriorLista),
      },
    });
  };

  const handleReset = () => {
    const anteriorLista = [...lista];
    setLista([]);

    toast.success('All your items were cleared', {
      action: {
        label: 'Undo',
        onClick: () => setLista(anteriorLista),
      },
    });
  };

  // Contadores de items en cada filtro
  const allItemsCount = lista.length;
  const pendingItemsCount = lista.filter((item) => item.completedAt === null).length;
  const completedItemsCount = allItemsCount - pendingItemsCount;

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  let paginatedList = filteredList.slice(firstIndex, lastIndex);

  return (
    <div className="main-container">
      <h2>To Do List</h2>
      <div className="item">
        <div>
          <Item setLista={setLista} />
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
        <button className="reset-button" onClick={handleReset}>
          <IconReload stroke={2} />
          Reset
        </button>
      </div>
      <div className="item-list">
        <ItemList
          lista={paginatedList}
          handleToggle={handleToggle}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          isEditing={isEditing}
        />
        {filteredList.length > 10 && (
          <div className="pagination">
            {filteredList.slice(firstIndex - 10, lastIndex - 10).length > 0 ? (
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
            {/* {filteredList.slice(firstIndex + 10, lastIndex + 10).length > 0 && <button>···</button>} */}
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
  );
}

export default ToDoListAPI;

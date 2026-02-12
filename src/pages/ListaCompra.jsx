import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { IconReload } from '@tabler/icons-react';

import Item from '../components/lista-compra/Item';
import ItemList from '../components/lista-compra/ItemList';

const LOCAL_STORAGE_KEY = 'miApp.listaCompra';

function ListaCompra({ isEditing = false }) {
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

  const allItemsCount = lista.length;
  const pendingItemsCount = lista.filter((item) => item.completedAt === null).length;
  const completedItemsCount = allItemsCount - pendingItemsCount;

  return (
    <main className="main-container">
      <h2>Shopping List</h2>
      <section aria-labelledby="add-item-section">
        <h3 id="add-item-section" className="visually-hidden">
          Add new item
        </h3>
        <div className="item">
          <div>
            <Item setLista={setLista} />
          </div>
        </div>
      </section>
      <section aria-labelledby="filter-section">
        <h3 id="filter-section" className="visually-hidden">
          Filter and actions
        </h3>
        <div className="filter-container">
          <div className="filter-group" role="group" aria-label="Filter shopping items">
            <button
              type="button"
              className={`filter-button${filtro === 'all' ? '' : 'active-button'}`}
              onClick={() => setFiltro('all')}
              aria-pressed={filtro === 'all'}
              aria-label={`Show all items (${allItemsCount})`}
            >
              All ({allItemsCount})
            </button>
            <button
              type="button"
              className={`filter-button${filtro === 'pending' ? '' : 'active-button'}`}
              onClick={() => setFiltro('pending')}
              aria-pressed={filtro === 'pending'}
              aria-label={`Show pending items (${pendingItemsCount})`}
            >
              Pending ({pendingItemsCount})
            </button>
            <button
              type="button"
              className={`filter-button${filtro === 'completed' ? '' : 'active-button'}`}
              onClick={() => setFiltro('completed')}
              aria-pressed={filtro === 'completed'}
              aria-label={`Show completed items (${completedItemsCount})`}
            >
              Completed ({completedItemsCount})
            </button>
          </div>
          <button type="button" className="reset-button" onClick={handleReset} aria-label="Reset all items">
            <IconReload stroke={2} aria-hidden="true" />
            Reset
          </button>
        </div>
      </section>
      <section aria-labelledby="items-list-section">
        <h3 id="items-list-section" className="visually-hidden">
          Shopping items
        </h3>
        <div className="item-list" aria-live="polite" aria-atomic="false">
          <ItemList
            lista={filteredList}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            isEditing={isEditing}
          />
        </div>
      </section>
    </main>
  );
}

export default ListaCompra;

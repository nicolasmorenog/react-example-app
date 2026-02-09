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
    <div className="main-container">
      <h2>Shopping List</h2>
      <div className="item">
        <div>
          <Item setLista={setLista} />
        </div>
      </div>
      <div className="filter-container">
        <div className="filter-group">
          <button
            className={`filter-button${filtro === 'all' ? '' : 'active-button'}`}
            onClick={() => setFiltro('all')}
          >
            All ({allItemsCount})
          </button>
          <button
            className={`filter-button${filtro === 'pending' ? '' : 'active-button'}`}
            onClick={() => setFiltro('pending')}
          >
            Pending ({pendingItemsCount})
          </button>
          <button
            className={`filter-button${filtro === 'completed' ? '' : 'active-button'}`}
            onClick={() => setFiltro('completed')}
          >
            Completed ({completedItemsCount})
          </button>
        </div>
        <button className="reset-button" onClick={handleReset} aria-label="Reset all items">
          <IconReload stroke={2} />
          Reset
        </button>
      </div>
      <div className="item-list">
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
    </div>
  );
}

export default ListaCompra;

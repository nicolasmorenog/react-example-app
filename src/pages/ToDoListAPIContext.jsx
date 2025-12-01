import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { IconReload } from '@tabler/icons-react';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

import Item from '../components/to-do-list-API/Item';
import ItemList from '../components/to-do-list-API/ItemList';

import { supabase } from '../supabaseClient';

function ToDoListAPI({ isEditing = false }) {
  const { fetchTasks, lista, setLista } = useContext(AppContext);
  const [filtro, setFiltro] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState(null);

  // useEffect para cargar las tareas al iniciar el componente.
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para añadir un nuevo item.
  const handleAddItem = async (newItemName) => {
    const { data: newItems, error } = await supabase
      .from('todos')
      .insert([{ name: newItemName }])
      .select();

    if (error) {
      toast.error('Failed to add new item.');
    } else if (newItems && newItems.length > 0) {
      // Actualizamos el estado local con el nuevo item devuelto por Supabase.
      const newItemObject = {
        id: newItems[0].id,
        name: newItems[0].name,
        completedAt: null,
        createdAt: newItems[0].created_at,
        updatedAt: newItems[0].created_at,
      };
      setLista([...lista, newItemObject]);
      toast.success(`Item "${newItemObject.name}" added!`);
    }
  };

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

  // Función para editar item.
  const handleEdit = async (id, newName) => {
    const now = new Date().toISOString();
    const { error } = await supabase.from('todos').update({ name: newName, updated_at: now }).eq('id', id);

    if (error) {
      toast.error('Failed to edit item.');
    } else {
      const nuevaLista = lista.map((item) => (item.id === id ? { ...item, name: newName, updatedAt: now } : item));
      setLista(nuevaLista);
    }
  };

  // Función para borrar item.
  const handleDelete = async (id) => {
    const itemToDelete = lista.find((item) => item.id === id);
    const { error: deleteError } = await supabase.from('todos').delete().eq('id', id);

    if (deleteError) {
      toast.error('Failed to delete item');
    } else {
      const nuevaLista = lista.filter((item) => item.id !== id);
      setLista(nuevaLista);
      toast.success(`Item "${itemToDelete.name}" has been deleted`, {
        action: {
          label: 'Undo',

          // Función para recuperar item.
          onClick: async () => {
            const itemToRestore = {
              id: itemToDelete.id,
              name: itemToDelete.name,
              created_at: itemToDelete.createdAt,
              updated_at: itemToDelete.updatedAt,
              completed_at: itemToDelete.completedAt,
            };
            const { error: restoreError } = await supabase.from('todos').insert(itemToRestore).select();

            if (restoreError) {
              toast.error(`Item couldn't be restored`);
            } else {
              setLista((prev) => [...prev, itemToDelete]);
              toast.success('Item was restored!');
            }
          },
        },
      });
    }
  };

  // Función para reestablecer la lista.
  const handleReset = async () => {
    const anteriorLista = [...lista];
    const { error } = await supabase.from('todos').delete().neq('id', 0); // Borra todos los registros

    if (error) {
      toast.error('Failed to clear the list');
    } else {
      setLista([]);
      toast.success('All your items were cleared!', {
        action: {
          label: 'Undo',
          onClick: () => setLista(anteriorLista),
        },
      });
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
  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  let paginatedList = filteredList.slice(firstIndex, lastIndex);

  return (
    <div className="main-container">
      <h2>To Do List</h2>
      <div className="item">
        <div>
          <Item handleAddItem={handleAddItem} />
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

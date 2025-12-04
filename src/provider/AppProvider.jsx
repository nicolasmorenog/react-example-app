import { AppContext } from '@/context/AppContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';

export const AppProvider = ({ children }) => {
  // Estado para la lista de tareas. Lo inicializamos como un array vacío.
  const [lista, setLista] = useState([]);

  // Obtenemos las tareas de Supabase.
  const fetchTasks = async () => {
    const { data: todos, error } = await supabase.from('todos').select('*');

    if (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Could not fetch tasks');
    } else {
      // Mapeamos los datos de Supabase a la estructura de Item.
      const listaAPIData = todos.map((todo) => ({
        id: todo.id,
        name: todo.name,
        completedAt: todo.completed_at,
        createdAt: todo.created_at,
        updatedAt: todo.created_at,
      }));
      setLista(listaAPIData);
      console.table(listaAPIData);
    }
  };

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
              toast.error(`Item "${itemToRestore.name}" couldn't be restored`);
            } else {
              setLista((prev) => [...prev, itemToDelete]);
              toast.success(`Item "${itemToRestore.name}" was restored!`);
            }
          },
        },
      });
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
      toast.success(`Item "${newName}" was saved!`);
    }
  };

  return (
    <AppContext.Provider value={{ fetchTasks, lista, setLista, handleAddItem, handleDelete, handleEdit }}>
      {children}
    </AppContext.Provider>
  );
};

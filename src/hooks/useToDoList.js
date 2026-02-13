import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/supabaseClient';

/**
 * Custom hook for managing To-Do list with Supabase backend
 * Handles CRUD operations and provides loading/error states
 */
export function useToDoList() {
  const [lista, setLista] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);

    const { data: todos, error: fetchError } = await supabase.from('todos').select('*');

    if (fetchError) {
      console.error('Error fetching tasks:', fetchError);
      setError('Could not fetch tasks');
      toast.error('Could not fetch tasks');
      setIsLoading(false);
      return;
    }

    const listaAPIData = todos.map((todo) => ({
      id: todo.id,
      name: todo.name,
      completedAt: todo.completed_at,
      createdAt: todo.created_at,
      updatedAt: todo.created_at,
    }));

    setLista(listaAPIData);
    setIsLoading(false);
    console.table(listaAPIData);
  };

  // Initial fetch
  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      await fetchTasks();
    };

    if (isMounted) {
      loadTasks();
    }

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Add new item
  const handleAddItem = async (newItemName) => {
    const { data: newItems, error: addError } = await supabase
      .from('todos')
      .insert([{ name: newItemName }])
      .select();

    if (addError) {
      toast.error('Failed to add new item.');
      return;
    }

    if (newItems && newItems.length > 0) {
      const newItemObject = {
        id: newItems[0].id,
        name: newItems[0].name,
        completedAt: null,
        createdAt: newItems[0].created_at,
        updatedAt: newItems[0].created_at,
      };
      setLista((prev) => [...prev, newItemObject]);
      toast.success(`Item "${newItemObject.name}" added!`);
    }
  };

  // Toggle item completion status
  const handleToggle = async (id) => {
    const now = new Date().toISOString();
    const itemToToggle = lista.find((item) => item.id === id);
    const newCompletedAt = itemToToggle.completedAt === null ? now : null;

    const { error: toggleError } = await supabase.from('todos').update({ completed_at: newCompletedAt }).eq('id', id);

    if (toggleError) {
      toast.error('Failed to update item status.');
      return;
    }

    const nuevaLista = lista.map((item) =>
      item.id === id ? { ...item, completedAt: newCompletedAt, updatedAt: now } : item
    );
    setLista(nuevaLista);
    console.table(nuevaLista);
  };

  // Edit item name
  const handleEdit = async (id, newName) => {
    const now = new Date().toISOString();
    const { error: editError } = await supabase.from('todos').update({ name: newName, updated_at: now }).eq('id', id);

    if (editError) {
      toast.error('Failed to edit item.');
      return;
    }

    const nuevaLista = lista.map((item) => (item.id === id ? { ...item, name: newName, updatedAt: now } : item));
    setLista(nuevaLista);
  };

  // Delete item
  const handleDelete = async (id) => {
    const itemToDelete = lista.find((item) => item.id === id);
    const { error: deleteError } = await supabase.from('todos').delete().eq('id', id);

    if (deleteError) {
      toast.error('Failed to delete item');
      return;
    }

    const nuevaLista = lista.filter((item) => item.id !== id);
    setLista(nuevaLista);

    toast.success(`Item "${itemToDelete.name}" has been deleted`, {
      action: {
        label: 'Undo',
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
  };

  // Reset all items
  const handleReset = async () => {
    const anteriorLista = [...lista];
    const { error: resetError } = await supabase.from('todos').delete().neq('id', 0);

    if (resetError) {
      toast.error('Failed to clear the list');
      return;
    }

    setLista([]);
    toast.success('All your items were cleared!', {
      action: {
        label: 'Undo',
        onClick: () => setLista(anteriorLista),
      },
    });
  };

  return {
    lista,
    isLoading,
    error,
    handleAddItem,
    handleToggle,
    handleEdit,
    handleDelete,
    handleReset,
  };
}

import { AppContext } from '@/context/AppContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';

export const AppProvider = ({ children }) => {
  const example = () => {
    console.log(1);
  };

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

  return <AppContext.Provider value={{ example, fetchTasks, lista, setLista }}>{children}</AppContext.Provider>;
};

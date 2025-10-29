import { createContext, useContext, useState, ReactNode } from 'react';

interface TodosContextType {
  completedTodos: Record<number, boolean>;
  toggleTodo: (todoId: number) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [completedTodos, setCompletedTodos] = useState<Record<number, boolean>>({});

  const toggleTodo = (todoId: number) => {
    setCompletedTodos(prev => ({
      ...prev,
      [todoId]: !prev[todoId]
    }));
  };

  return (
    <TodosContext.Provider value={{ completedTodos, toggleTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
};

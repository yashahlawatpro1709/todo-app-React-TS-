import React, { createContext, useContext, useState } from "react";

export type TodosProviderProps = {
  children: React.ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    return todosFromLocalStorage ? JSON.parse(todosFromLocalStorage) : [];
  });

  const updateLocalStorage = (updatedTodos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAddToDo = (task: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      task: task,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => {
      const updatedTodos = [newTodo, ...prev];
      updateLocalStorage(updatedTodos);
      return updatedTodos;
    });
  };

  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      updateLocalStorage(updatedTodos);
      return updatedTodos;
    });
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const updatedTodos = prev.filter((todo) => todo.id !== id);
      updateLocalStorage(updatedTodos);
      return updatedTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo }}
    >
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todosConsumer;
};

export default TodosProvider;

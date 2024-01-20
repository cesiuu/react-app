import React, { useState, useEffect, useContext } from 'react';
import './../../style/todo.css';
import { UserContext } from './UserContext';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data: Todo[] = await response.json();
        setTodos(data.filter((todo) => todo.userId === currentUser?.id));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [currentUser]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.trim() === '') {
      alert('Todo cannot be empty.');
      return;
    }
    if (!currentUser) {
      alert('Please log in to add new todos.');
      return;
    }

    const newTodoItem: Todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
      userId: currentUser.id,
    };

    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    setNewTodo('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const getUncheckedTodosCount = () => {
    return todos.filter((todo) => !todo.completed).length;
  };

  useEffect(() => {
    document.title = "Todo"
 }, []);

  return (
    <div className="todo-div">
      <h1>Todo Page</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo"
          disabled={!currentUser}
        />
        <button type="submit" disabled={!currentUser}>
          Add Todo
        </button>
      </form>
      {currentUser ? (
        <ul>
          <li>
            <strong>{currentUser.name}</strong>
            <p>Todos left: {getUncheckedTodosCount()}</p>
            <ul>
              {todos.map((todo) => (
                <li className="todo-li" key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
                  <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : (
        <p>Please log in to view and add todos.</p>
      )}
    </div>
  );
};

export default TodoPage;

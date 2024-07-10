import React, { useEffect, useState } from "react";
import { createTodo, getAllTodo } from "./firebase/crud";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { todos } = await getAllTodo();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [update]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createTodo(newTodo);
      setNewTodo({
        title: "",
        description: "",
      });
      setUpdate(!update);
    } catch (error) {
      console.error("error fetching todos:", error);
    }
  };

  return (
    <div className="min-h-screen max-h-full bg-zinc-950 px-4">
      <form className="flex items-center gap-2 py-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button type="submit" className="bg-white px-3 py-2 rounded-md">
          Add Todo
        </button>
      </form>
      <div className="font-bold text-white space-y-4">
        {todos?.map((todo) => (
          <div className="w-full bg-gray-700 rounded-md px-2" key={todo.id}>
            <div className="text-xl">{todo.title}</div>
            <p className="font-normal">{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

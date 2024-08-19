"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";

import TodoItem from "./todoItem";

export default function WithSession({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`/todo/api?user=${user}`);
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addTodo = async (newTodo) => {
    if (!newTodo.trim()) {
      console.error("Todo cannot be empty");
      return;
    }

    try {
      await axios.post(`/todo/api?user=${user}`, {
        id: todos.length + 1,
        task: newTodo,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setNewTodo("");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(
        "Failed to add todo",
        error.response ? error.response.data : error.message
      );
    }
  };
  const deleteTodo = async (newTodo) => {
    const res = await fetch("/todo/api/noSession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTodo }),
    });
    const data = await res.json();
    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      console.error("Expected an array but got", data);
    }
  };

  const editTodo = async (newTodo) => {
    const res = await fetch("/todo/api/noSession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTodo }),
    });
    const data = await res.json();
    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      console.error("Expected an array but got", data);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3/4">
      <div className="flex space-x-2 flex-row mb-5">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className=" p-1 pl-5 text-sm text-gray-700 border-2"
        />
        <button
          onClick={() => addTodo(newTodo)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <IoMdAdd className="w-8 h-8" />
        </button>
      </div>
      <TodoItem todos={todos} onEdit={editTodo} onDelete={deleteTodo} />
    </div>
  );
}

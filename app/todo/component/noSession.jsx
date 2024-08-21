"use client";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import TodoItem from "./todoItem";

const items = [
  {
    id: 1,
    task: "Belajar Javascript",
    completed: true,
    created_at: "2024-08-05T15:00:00Z",
    updated_at: "2024-08-05T16:00:00Z",
  },
  {
    id: 2,
    task: "Belajar HTML",
    completed: true,
    created_at: "2024-08-05T15:00:00Z",
    updated_at: "2024-08-05T16:00:00Z",
  },
  {
    id: 3,
    task: "Mencoba Tailwind CSS",
    completed: false,
    created_at: "2024-08-06T09:00:00Z",
    updated_at: "2024-08-06T09:00:00Z",
  },
];
export default function NoSession() {
  const [todos, setTodos] = useState(items);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (todo) => {
    const updatedTodos = {
      id: todos.length + 1,
      task: todo,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setNewTodo("");
    setTodos([...todos, updatedTodos]);
  };

  const editTodo = (todos, index) => {
    const newTodo = prompt(
      "Masukkan todo baru:",
      (todos[index].task = {
        id: todos[index].id,
        task: todos[index].task,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    );
    if (newTodo) {
      const updatedTodos = [...todos];
      updatedTodos[index] = newTodo;
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
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

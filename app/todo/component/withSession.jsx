"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

import TodoItem from "./todoItem";

export default function WithSession({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`/todo/api?user=${user}`);
      if (response.status === 404 || response.length === 0) {
        setTodos([
          {
            id: 1,
            task: "no data yet",
          },
        ]);
      } else {
        const data = await response.json();
        setTodos(data);
      }
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
      const lastId = todos.slice(-1)[0]?.id || 0;
      await axios.post(`/todo/api?user=${user}`, {
        id: lastId + 1,
        task: newTodo,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      toast.success("Todo berhasil ditambahkan");
      setNewTodo("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(
        "gagal menambahkan todo",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todo/api?user=${user}&id=${id}`);
      toast.success("Todo berhasil dihapus");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      toast.error(
        "gagal menghapus todo",
        error.response ? error.response.data : error.message
      );
    }
  };

  const editTodo = (id) => {
    // Find the todo item with the given id
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo(todo.task);
      setEditingTodoId(id); // Set the ID of the todo being edited
    }
  };
  const saveEdit = async () => {
    if (!newTodo.trim()) {
      toast.error("Todo tidak boleh kosong");
      return;
    }

    try {
      await axios.put(`/todo/api?user=${user}&id=${editingTodoId}`, {
        task: newTodo,
        updated_at: new Date().toISOString(),
      });
      toast.success("Todo berhasil diperbarui");
      setNewTodo("");
      setEditingTodoId(null);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(
        "Failed to update todo",
        error.response ? error.response.data : error.message
      );
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
        {editingTodoId ? (
          <button
            onClick={saveEdit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => addTodo(newTodo)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <IoMdAdd className="w-8 h-8" />
          </button>
        )}
      </div>
      <TodoItem todos={todos} onEdit={editTodo} onDelete={deleteTodo} />
      <Toaster position="top-center" />
    </div>
  );
}

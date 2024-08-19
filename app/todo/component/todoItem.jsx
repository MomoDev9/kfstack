export default function TodoItem({ todos, onEdit, onDelete }) {
  return (
    <ul className="min-h-64 max-h-[50vh] overflow-y-auto overflow-hidden mb-4">
      {todos.map((todo, i) => (
        <li
          key={i}
          className="relative flex items-center p-2 bg-gray-100 rounded mb-2 group hover:bg-gray-300 transition-colors duration-300"
        >
          <span
            className={
              todo.completed
                ? "border-l-4 p-2 border-green-400 line-through"
                : `p-2 border-l-4 border-gray-400`
            }
          >
            {todo.task}
          </span>
          <div className="absolute -right-12 group-hover:-right-0 transition-all duration-500">
            <button
              onClick={() => onEdit(todo.id)}
              className="h-full bg-yellow-400 text-white rounded"
            >
              E
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="h-full bg-red-400 text-white rounded"
            >
              D
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

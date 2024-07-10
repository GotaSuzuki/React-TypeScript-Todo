import { useState } from "react";
import { TodoType } from "../types/Todo";

type TodoProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const Todo = ({ todos, setTodos }: TodoProps) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const deleteTodo = (id: string) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const toggleTodo = (id: string) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodo);
  };

  const allDelete = () => {
    const newTodo = todos.filter((todo) => !todo.isDone);
    setTodos(newTodo);
  };

  const startEditing = (id: string, title: string) => {
    setEditId(id);
    setEditTitle(title);
  };

  const saveEdit = (id: string) => {
    if (editTitle === "") return;
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editTitle } : todo
    );
    setTodos(newTodos);
    setEditId(null);
    setEditTitle("");
  };

  return (
    <div>
      {todos.map((todo) => (
        <ul key={todo.id}>
          <li style={{ listStyle: "none" }}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onClick={() => toggleTodo(todo.id)}
            />
            {editId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button disabled>削除</button>
                <button onClick={() => saveEdit(todo.id)}>完了</button>
              </>
            ) : (
              <>
                {todo.title}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={!todo.isDone}>
                  削除
                </button>
                <button onClick={() => startEditing(todo.id, todo.title)}>
                  編集
                </button>
              </>
            )}
          </li>
        </ul>
      ))}
      <button
        onClick={() => allDelete()}
        disabled={todos.filter((todo) => todo.isDone).length === 0}>
        一括削除
      </button>
    </div>
  );
};

export default Todo;

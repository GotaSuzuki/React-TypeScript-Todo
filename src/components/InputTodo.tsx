import { useRef } from "react";
import { TodoType } from "../types/Todo";
import { v4 as uuidv4 } from "uuid";

type InputTodoProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const InputTodo: React.FC<InputTodoProps> = ({ setTodos, todos }) => {
  const todoRef = useRef<HTMLInputElement | null>(null);
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoRef.current?.value === "") return;
    const newTodo: TodoType = {
      id: uuidv4(),
      title: todoRef.current?.value ?? "",
      isDone: false
    };
    setTodos([...todos, newTodo]);
    if (todoRef.current) {
      todoRef.current.value = "";
    }
  };
  return (
    <div>
      <form onSubmit={addTodo}>
        <input type="text" placeholder="Todoを入力" ref={todoRef} />
        <button type="submit">追加</button>
      </form>
    </div>
  );
};

export default InputTodo;

import { useState } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import Todo from "./components/Todo";
import { TodoType } from "./types/Todo";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: "0", title: "Todo1", isDone: false },
    { id: "1", title: "Todo2", isDone: true }
  ]);

  return (
    <>
      <InputTodo todos={todos} setTodos={setTodos} />
      <Todo todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;

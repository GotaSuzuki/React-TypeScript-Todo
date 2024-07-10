import React, { useRef } from "react";
import { TodoType } from "../types/Todo";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type InputTodoProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const InputTodo: React.FC<InputTodoProps> = ({ setTodos, todos }) => {
  const todoRef = useRef<HTMLInputElement | null>(null);
  const addTodo = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
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
      todoRef.current.blur();
      todoRef.current.focus();
    }
  };
  return (
    <div>
      <form onSubmit={addTodo}>
        <TextField
          id="outlined-basic"
          label="Todoを入力"
          variant="outlined"
          size="small"
          inputRef={todoRef}
          autoFocus
        />
        <Button type="submit" variant="outlined" size="small">
          追加
        </Button>
      </form>
    </div>
  );
};

export default InputTodo;

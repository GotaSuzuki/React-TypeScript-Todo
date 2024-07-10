import React, { useRef } from "react";
import { TodoType } from "../types/Todo";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

type InputTodoProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch"
  }
}));

const StyledForm = styled("form")({
  display: "flex",
  flexGrow: 1
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
    marginBottom: theme.spacing(2)
  }
}));

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
    <FormWrapper>
      <StyledForm onSubmit={addTodo}>
        <StyledTextField
          id="outlined-basic"
          label="Todoを入力"
          variant="outlined"
          size="small"
          inputRef={todoRef}
          autoFocus
        />
        <Button type="submit" variant="contained" color="primary">
          追加
        </Button>
      </StyledForm>
    </FormWrapper>
  );
};

export default InputTodo;

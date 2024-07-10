import { useState } from "react";
import { TodoType } from "../types/Todo";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

type TodoProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: "#f5f5f5"
}));

const TodoList = styled(List)({
  width: "100%"
});

const TodoItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: "#ffffff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
}));

const TodoText = styled(Typography)<{ isDone: boolean }>(({ isDone }) => ({
  flexGrow: 1,
  marginLeft: "10px",
  textDecoration: isDone ? "line-through" : "none",
  color: isDone ? "#888" : "inherit"
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1)
}));

const DeleteAllButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2)
}));

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
    <TodoWrapper>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <Checkbox
              checked={todo.isDone}
              onClick={() => toggleTodo(todo.id)}
            />
            {editId === todo.id ? (
              <>
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  size="small"
                  fullWidth
                />
                <ButtonGroup>
                  <Button
                    onClick={() => saveEdit(todo.id)}
                    variant="contained"
                    size="small">
                    完了
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <TodoText isDone={todo.isDone}>{todo.title}</TodoText>
                <ButtonGroup>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    disabled={!todo.isDone}
                    variant="outlined"
                    color="error"
                    size="small">
                    削除
                  </Button>
                  <Button
                    onClick={() => startEditing(todo.id, todo.title)}
                    variant="contained"
                    color="primary"
                    size="small">
                    編集
                  </Button>
                </ButtonGroup>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
      <DeleteAllButton
        onClick={() => allDelete()}
        disabled={todos.filter((todo) => todo.isDone).length === 0}
        variant="contained"
        color="secondary">
        完了したタスクを一括削除
      </DeleteAllButton>
    </TodoWrapper>
  );
};

export default Todo;

import { Box, Checkbox, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  refresh: () => void;
}

const TodoItem = ({ todo, refresh }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleDelete = async () => {
    await axiosInstance.delete(`/todos/${todo.id}`);
    refresh();
  };

  const handleUpdate = async () => {
    await axiosInstance.patch(`/todos/${todo.id}`, { title });
    setIsEditing(false);
    refresh();
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <Checkbox checked={todo.completed} />
      {isEditing ? (
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      ) : (
        <Box flex={1}>{todo.title}</Box>
      )}
      {isEditing ? (
        <IconButton onClick={handleUpdate}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <EditIcon />
        </IconButton>
      )}
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;

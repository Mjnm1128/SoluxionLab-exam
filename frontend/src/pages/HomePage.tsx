import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/todos");
      setTodos(res.data);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    try {
      await axiosInstance.post("/todos", { title: newTodo.trim() });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Failed to add todo.");
    }
  };

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EFE6E6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to bottom right, #F9F3F3, #EFE6E6)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `
            radial-gradient(ellipse at 10% 20%, rgba(226, 218, 218, 0.4) 0%, rgba(226, 218, 218, 0.4) 25%, transparent 26%),
            radial-gradient(ellipse at 90% 80%, rgba(226, 218, 218, 0.4) 0%, rgba(226, 218, 218, 0.4) 25%, transparent 26%),
            radial-gradient(circle at 30% 70%, rgba(226, 218, 218, 0.6) 0%, rgba(226, 218, 218, 0.6) 15%, transparent 16%)
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#F9F3F3",
          borderRadius: 4,
          p: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "serif",
            color: "#302E30",
            mb: 1,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          To do list title
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#A09A9A",
            mb: 4,
          }}
        />

        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: "40px",
            boxShadow: "none",
            border: "1px solid #ddd",
            backgroundColor: "#E2DAD1",
            mb: 2,
            height: "60px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <InsertPhotoIcon sx={{ color: "#302E30" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#302E30" }}
            placeholder="Enter new task here"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              p: "10px",
              backgroundColor: "#302E30",
              color: "white",
              "&:hover": {
                backgroundColor: "#424042",
              },
            }}
            aria-label="add"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Paper>

        {loading ? (
          <Box mt={3} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" mt={3}>
            {error}
          </Typography>
        ) : todos.length === 0 ? (
          <Typography mt={3} color="#A09A9A" textAlign="center">
            No tasks found. Add a new task above.
          </Typography>
        ) : (
          <Box>
            {todos.map((todo) => (
              <Paper
                key={todo.id}
                sx={{
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: "40px",
                  boxShadow: "none",
                  border: "1px solid #ddd",
                  backgroundColor: "#E2DAD1",
                  my: 2,
                  height: "60px",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" alignItems="center">
                  <IconButton sx={{ p: "10px" }}>
                    <InsertPhotoIcon sx={{ color: "#302E30" }} />
                  </IconButton>
                  <Typography sx={{ ml: 1, color: "#302E30" }}>
                    {todo.title}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}
                    sx={{ color: "#A09A9A" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton sx={{ p: "10px" }}>
                    <DragIndicatorIcon sx={{ color: "#A09A9A" }} />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#A09A9A",
            my: 4,
          }}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="text"
            onClick={handleLogout}
            sx={{
              color: "#A09A9A",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#A09A9A",
              color: "white",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#8C8686",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;

import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { setToken } from "../utils/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      setToken(res.data.access_token);

      if (onLogin) {
        onLogin();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
        maxWidth="xs"
        sx={{
          zIndex: 2,
        }}
      >
        <Paper
          sx={{
            p: 4,
            backgroundColor: "#F9F3F3",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "serif",
              color: "#302E30",
              mb: 1,
              fontWeight: 500,
            }}
          >
            Login
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "#A09A9A",
              mb: 4,
            }}
          />
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  backgroundColor: "#E2DAD1",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#302E30",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#302E30",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#302E30",
                },
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ color: "#302E30" }} />
                      ) : (
                        <VisibilityIcon sx={{ color: "#302E30" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  backgroundColor: "#E2DAD1",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#302E30",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#302E30",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#302E30",
                },
              }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#302E30",
                color: "white",
                borderRadius: "40px",
                height: "56px",
                "&:hover": {
                  backgroundColor: "#424042",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;

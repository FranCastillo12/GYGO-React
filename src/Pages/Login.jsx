
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/Auth";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    primary: { main: "#2DA14C" },
    secondary: { main: "#ffffff" },
    background: { default: "#f9f9f5" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: { borderRadius: 12 },
});

const Paper = styled("div")(({ theme }) => ({
  padding: "40px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width: "100%",
}));


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "No se pudo iniciar sesión",
        text: "Por favor, completá todos los campos.",
        confirmButtonColor: "#f8bb86",
      });
      return;
    }

    try {
      const { success, isTwoFactor, tempToken, error } = await loginUser(
        email,
        password
      );
      if (!success) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Usuario o contraseña incorrectos",
          confirmButtonColor: "#d33",
        });

        return;
      }

      if (isTwoFactor) {
        // Redirect to 2FA page
        navigate(`/verify-2fa?tempToken=${encodeURIComponent(tempToken)}`);
      } else {
        // Normal login success — redirect to dashboard or home
        navigate("/DashboardGroupPage");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor, intentá nuevamente más tarde.",
        confirmButtonColor: "#d33",
      });

    }
  };

  return (
    <div>
      {/* <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} */}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="xs">
            <Paper>
              <Box textAlign="center" mb={1}>
                <img
                  src="/src/assets/Logo.png"
                  alt="Logo"
                  style={{ maxWidth: "120px"}}
                />
              </Box>

              <Box textAlign="center" mb={2}>
                <Typography variant="h4" fontWeight={600} color="primary">
                  SIGN IN
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Sign into your account
                </Typography>
              </Box>

              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Correo Eletronico"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Contraseña"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
                >
                  Sign In
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}

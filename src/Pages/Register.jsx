import { useState } from "react";
import { useParams } from "react-router-dom";
import { registerUser } from "../API/Auth";
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

export function Register() {
  const { inviteToken } = useParams();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.username) {
      Swal.fire({
        icon: "warning",
        title: "No se pudo registrar al usuario",
        text: "Por favor, completá todos los campos.",
        confirmButtonColor: "#f8bb86",
      });
      return;
    }

    try {
      const response = await registerUser(inviteToken, form);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "El usuario ha sido registrado correctamente.",
          confirmButtonColor: "#2DA14C",
        });
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar al usuario",
          text: "",
          confirmButtonColor: "#d33",
        });
        return;
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
      {/* <h2>Registro {inviteToken ? "por invitación" : "normal"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>} */}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "88vh",
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
                  style={{ maxWidth: "120px" }}
                />
              </Box>

              <Box textAlign="center" mb={2}>
                <Typography variant="h4" fontWeight={600} color="primary">
                  Registro {inviteToken ? "por invitación" : "normal"}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Registrar un usuario
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                   name="email"
                  label="Correo Eletronico"
                  variant="outlined"
                  
                  value={form.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre de usuario"
                   name="username"
                  variant="outlined"
                  value={form.username}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Contraseña"
                  name="password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
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
                  Registrar
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}

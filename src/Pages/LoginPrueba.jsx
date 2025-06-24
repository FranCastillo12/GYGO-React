import React, { useState } from "react";
import { Login } from "../API/Login";
import { useNavigate } from "react-router-dom";
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
import { Visibility, VisibilityOff,Email  } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

import Swal from "sweetalert2";

// Tema personalizado con palette primary y secondary
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

export function LoginPrueba() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
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
      const result = await Login(email, password);
      console.log(result);
      if (result) {
        navigate("/DashboardGroupPage");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Usuario o contraseña incorrectos",
          confirmButtonColor: "#d33",
        });
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
            {/* Logo */}
            <Box textAlign="center" mb={2}>
              <img
                src="" 
                alt="Logo de la aplicación"
                style={{ maxWidth: "120px", marginBottom: 8 }}
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

            <form onSubmit={handleSubmit}>
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

              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    color="primary"
                    underline="hover"
                  >
                    Forgot your password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
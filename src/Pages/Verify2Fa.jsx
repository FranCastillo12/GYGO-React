import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verify2FACode } from "../API/Auth";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";

export function Verify2FA() {
  const [searchParams] = useSearchParams();
  const tempToken = searchParams.get("tempToken");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, error } = await verify2FACode(tempToken, code);

      if (success) {
        Swal.fire({
          icon: "success",
          title: "¡Código verificado!",
          text: "Has ingresado correctamente.",
          confirmButtonColor: "#2DA14C",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Código incorrecto",
          text: "El código ingresado no es válido. Inténtalo nuevamente.",
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
    <div>
      {/* <h2>Enter 2FA Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>} */}

      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={2}>
              Autenticación en dos pasos
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Introduzca el código enviado a su correo o aplicación de
              autenticación.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Código de verificación"
                variant="outlined"
                margin="normal"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                 sx={{ mt: 2, backgroundColor: '#2DA14C', '&:hover': { backgroundColor: '#259b42' } }}
              >
                Verificar
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}

import { useState } from "react";
import { sendInvite } from "../API/Auth";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export function SendInvite() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendInvite(email);

      if (response.success) {
         Swal.fire({
                  icon: "success",
                  title: "Invitación enviada",
                  text: "Invitación enviada exitosamente.",
                  confirmButtonColor: "#2DA14C",
                });
      
      } else {

          Swal.fire({
                  icon: "error",
                  title: "Error al enviar la invitación",
                  text: "No se pudo enviar la invitación. Por favor, inténtalo nuevamente.",
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
      {/* <h2>Enviar Invitación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo del invitado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Invitación</button>
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
        <Container maxWidth="sm">
          <Paper
            elevation={4}
            sx={{ p: 4, borderRadius: 3, backgroundColor: "#ffffff" }}
          >
            <Typography variant="h4" align="center" fontWeight={600} mb={3}>
              Enviar Invitación
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo del invitado"
                variant="outlined"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  backgroundColor: "#2DA14C",
                  "&:hover": { backgroundColor: "#259b42" },
                }}
              >
                Enviar Invitación
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

export default function Dashboard() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom color="primary">
          Bienvenido al Dashboard
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Aquí puedes ver información general del sistema.
        </Typography>

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">Tarjeta de Ejemplo</Typography>
              <Typography color="textSecondary">
                Puedes mostrar métricas aquí.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
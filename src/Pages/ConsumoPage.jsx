import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Divider,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Simulación de datos
const data = [
  { mes: 'Jun 2024', consumo: 450 },
  { mes: 'Ago 2024', consumo: 320 },
  { mes: 'Sep 2024', consumo: 420 },
  { mes: 'Nov 2024', consumo: 990 },
  { mes: 'Ene 2025', consumo: 400 },
  { mes: 'Feb 2025', consumo: 320 },
  { mes: 'Abr 2025', consumo: 450 },
  { mes: 'May 2025', consumo: 470 },
  { mes: 'Jun 2025', consumo: 1200 },
];

const limite = 6000;

export function DashboardConsumo() {
 const consumoActual = 1200;
  const metaMensual = 900;
  const diferencia = consumoActual - metaMensual;
  const excedido = diferencia > 0;

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Consumo del Grupo
      </Typography>

      {/* Fila 1: Acumulado + Junio + Meta */}
      <Grid container spacing={3} mb={3}>
        {/* Total acumulado */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">Total acumulado</Typography>
            <Typography variant="h4" fontWeight="bold">10,500 kWh</Typography>
            <Box mt={1} display="flex" alignItems="center" color="error.main">
              
              <Typography>¡Has superado el límite permitido de consumo!</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Junio 2025 */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold">Junio 2025</Typography>
            <Stack spacing={1} mt={1}>
              <Typography>Consumo: <b>1,200 kWh</b></Typography>
              <Typography color="error">⚠️ Exceso de consumo</Typography>
              <Divider />
              <Typography>Factor: Electricidad</Typography>
              <Typography>Emisión Calculada: 360,00</Typography>
            </Stack>
          </Paper>
        </Grid>

        {/* Meta mensual vs Real */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6">Meta mensual vs Consumo</Typography>
            <Stack spacing={1} mt={1}>
              <Typography>Meta: <b>{metaMensual} kWh</b></Typography>
              <Typography>Real: <b>{consumoActual} kWh</b></Typography>
              {excedido ? (
                <Typography color="error">
                  🔺 Sobrepasaste la meta en <b>+{diferencia} kWh</b>
                </Typography>
              ) : (
                <Typography color="success.main">
                  ✅ Meta alcanzada (ahorraste <b>{-diferencia} kWh</b>)
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Fila 2: Gráfico */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Consumo mensual (kWh)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="consumo" stroke="#1976d2" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Fila 3: Alertas */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#fff3e0' }}>
        <Typography variant="h6">Resumen de alertas</Typography>
        <ul>
          <li><b>Total acumulado excedido</b></li>
          <li><b>Exceso de consumo mensual</b></li>
          <li><b>Meta mensual no alcanzada</b></li>
        </ul>
      </Paper>
    </Box>
  );
}
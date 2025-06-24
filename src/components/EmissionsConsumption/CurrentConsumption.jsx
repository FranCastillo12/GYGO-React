import { useEffect, useState } from "react";
import { GetCurrentConsumption } from "../../API/EmissionsConsumption";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function ConsumoActual() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ConsumoActualData = async () => {
    try {
      const result = await GetCurrentConsumption();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los datos");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ConsumoActualData();
  },);

if (loading) return <CircularProgress />;

  const totalConsumo = data.reduce((acc, item) => acc + item.monthlyConsumption, 0);
  const totalEmisiones = data.reduce((acc, item) => acc + item.emissions, 0);



  return (
    <>
      <Typography variant="h5" gutterBottom>
        Resumen Consumo Actual
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Consumo</Typography>
              <Typography variant="h4">{totalConsumo} kWh</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Emisiones</Typography>
              <Typography variant="h4">{totalEmisiones} kg CO₂</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Consumo</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Mes</TableCell>
              <TableCell>Consumo (kWh)</TableCell>
              <TableCell>Emisiones (kg CO₂)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.consumptionId}>
                <TableCell>{item.nameConsumption}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.month}</TableCell>
                <TableCell>{item.monthlyConsumption}</TableCell>
                <TableCell>{item.emissions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

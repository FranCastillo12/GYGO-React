import { useEffect, useState } from "react";
import { GetConsumptionHistory } from "../../API/EmissionsConsumption";
import { Typography, CircularProgress } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function HistorialConsumo({ groupID }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

const HistorialConsumoData = async () => {
    try {
      const result = await GetConsumptionHistory();
      
        const sorted = [...result].sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });
      setData(sorted);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los datos");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    HistorialConsumoData();
  },);


  if (loading) return <CircularProgress />;
  const chartData = data.map(item => ({
    ...item,
    fecha: `${item.year}-${item.month.toString().padStart(2, "0")}`,
  }));


  return (
    <>
      <Typography variant="h5" gutterBottom>Historial de Consumo Mensual</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="monthlyConsumption" stroke="#ff5722" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
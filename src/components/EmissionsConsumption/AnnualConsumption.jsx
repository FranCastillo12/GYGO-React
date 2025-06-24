import { useEffect, useState } from "react";
import { GetAnnualConsumption } from "../../API/EmissionsConsumption";
import { Typography, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


export default function ConsumoAnual({ groupID }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

const ConsumoAnualData = async () => {
    try {
      const result = await GetAnnualConsumption();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los datos");
    }finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    ConsumoAnualData();
  },);




  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h5" gutterBottom>Consumo Anual (kWh)</Typography>
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="anualConsumption" fill="#ff9800" barSize={35} /> {/* ← MÁS DELGADAS */}
  </BarChart>
</ResponsiveContainer>
    </>
  );
}
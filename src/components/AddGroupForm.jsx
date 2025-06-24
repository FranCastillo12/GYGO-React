import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostAddGroup } from "../API/AddGroup";
import { GetServices } from "../API/Services";

export const AddGroupForm = () => {
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [correogrupo, setCorreogrupo] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Fetch para los servicios
  const fetchServices = async () => {
    try {
      const data = await GetServices();
      setServicesData(data);
    } catch (err) {
      console.error(err);
    }
  };
  ///Termina el fetch
  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!nombreGrupo || !correogrupo || !selectedService) {
        Swal.fire({
          icon: "warning",
          title: "No se pudo registrar la empresa",
          text: "Por favor, completá todos los campos.",
          confirmButtonColor: "#f8bb86",
        });
        return;
      }

      const result = await PostAddGroup(
        nombreGrupo,
        correogrupo,
        selectedService
      );
      setLoading(false);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "La empresa se ha sido registrado correctamente.",
          confirmButtonColor: "#2DA14C",
        }).then(() => {
          window.location.href = "/DashboardGroupPage";
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: result.error.message,
          confirmButtonColor: "#d33",
        }).then(() => {
          window.location.href = "/DashboardGroupPage";
        });
        return;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              id="outlined-basic"
              sx={{ width: "50%" }}
              label="Nombre del Grupo"
              variant="outlined"
              value={nombreGrupo}
              onChange={(e) => setNombreGrupo(e.target.value)}
              required
            ></TextField>
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              sx={{ width: "50%" }}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Registrar"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Crear nuevo grupo
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre del Grupo"
              variant="outlined"
              margin="normal"
              required
              value={nombreGrupo}
              onChange={(e) => setNombreGrupo(e.target.value)}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={correogrupo}
              onChange={(e) => setCorreogrupo(e.target.value)}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Servicio</InputLabel>
              <Select
                label="Servicio"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {servicesData.map((service) => (
                  <MenuItem key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, backgroundColor: "#1976d2" }}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Registrar"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

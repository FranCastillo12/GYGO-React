import React, { useState, useEffect } from "react";
import { getReportCompanies } from "../API/Reports";
import { GetServices } from "../API/Reports";
import { ReportCompaniesPDF } from "../utils/ReportCompaniesPDF";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
  IconButton,
  Grid,
  FormControl,
  Select,
  CircularProgress,
  Switch,
  TextField,
  Button,
  Typography,
  Modal,
  Box,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  Card,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
export function ReportCompanies() {
  const [ReportCompaniesData, SetReportCompaniesData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ServicesData, setServicesData] = useState([]);
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre de la Empresa",
      width: 300,
      resizable: false,
    },
    {
      field: "fechaCreación",
      headerName: "Fecha de incorporación ",
      width: 150,
      resizable: false,
    },
    {
      field: "serviceName",
      headerName: "Servicio",
      width: 150,
      resizable: false,
    },
    {
      field: "numberOfUsers",
      headerName: "Cantidad Usuarios",
      width: 120,
      resizable: false,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      filterable: false,
      resizable: false,
      renderCell: (params) => (
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Tooltip title="Ver detalles">
            <IconButton onClick={() => setSelectedId(params.row.grupoId)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchReportCompanies = async () => {
    try {
      const data = await getReportCompanies();
      SetReportCompaniesData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await GetServices();
      setServicesData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReportCompanies();
    fetchServices();
  }, []);

  const CreatePDF = async () => {
    try {
      ReportCompaniesPDF(ReportCompaniesData);
    } catch (error) {
      console.log("Error a crear el pdf");
    } finally {
    }
  };

  return (
    <div id="container">
      <div style={{ height: 410, width: "100%", textAlign: "left" }}>
        <Card
          variant="outlined"
          spacing={3}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={1}>
                  <h4 variant="h6">Empresas Registradas</h4>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={CreatePDF}
                style={{ backgroundColor: "#44af69", fontWeight: "bold" }}
              >
                Descargar Reporte
              </Button>
            </Grid>
          </Grid>

          <div style={{ paddingTop: "2%", paddingBottom: "3%" }}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              {/* BLOQUE IZQUIERDO: Filtros */}
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Box>
                      <Typography variant="body2" gutterBottom textAlign="left">
                        Status
                      </Typography>
                      <FormControl size="small" sx={{ width: 180 }}>
                        <Select>
                          <MenuItem value="todos">Todos</MenuItem>
                          <MenuItem value="true">Activos</MenuItem>
                          <MenuItem value="false">Inactivos</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  {/* Filtrar por servicios */}
                  <Grid item>
                    <Box>
                      <Typography variant="body2" gutterBottom textAlign="left">
                        Servicios
                      </Typography>
                      <FormControl size="small" sx={{ width: 180 }}>
                        <Select defaultValue="">
                          <MenuItem value="">Todos</MenuItem>
                          {ServicesData.map((service) => (
                            <MenuItem
                              key={service.serviceId}
                              value={service.serviceId}
                            >
                              {service.serviceName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  {/* Filtrar por servicios */}
                </Grid>
              </Grid>
            </Grid>
          </div>

          <DataGrid
            rows={ReportCompaniesData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableSelectionOnClick // Esto evita que se seleccione la fila al hacer clic
            checkboxSelection={false}
            isRowSelectable={() => false}
            showToolbar
            getRowId={(row) => row.grupoId} // Aquí le dices que use proyectoId como id único
            disableColumnMenu
          />
        </Card>
      </div>
    </div>
  );
}

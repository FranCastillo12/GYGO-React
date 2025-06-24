import React, { useState, useEffect } from "react";
import { getReportCompanies } from "../API/Reports";
import { GetServices } from "../API/Reports";
import { ReportCompaniesPDF } from "../utils/ReportCompaniesPDF";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
 
  Divider,
  Grid,
  FormControl,
  Select,
  CircularProgress,
  Switch,
  TextField,
  Button,
  IconButton,
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
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};




export function ReportCompanies() {
  const [ReportCompaniesData, SetReportCompaniesData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ServicesData, setServicesData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [serviceFilter, setServiceFilter] = useState("todos");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre de la Empresa",
      width: 200,
      resizable: false,
    },
    {
      field: "fechaCreación",
      headerName: "Fecha de incorporación ",
      width: 200,
      resizable: false,
        valueFormatter: (value) =>
   value
      ? new Date(value).toLocaleDateString("es-CR")
      : "N/A",
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
      width: 200,
      resizable: false,
    },
    {
      field: "estatus",
      headerName: "Estado",
      width: 90,
      resizable: false,
      valueFormatter: (value) => (value ? "Activo" : "Inactivo"),
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
          style={{ display: "flex", justifyContent: "flex-end", width: "50%", paddingRight: 15 }}
        >
          <Tooltip title="Ver detalles">
            <IconButton  onClick={() => handleOpenModal(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchReportCompanies = async () => {
    try {
      const statusParam =
        statusFilter === "todos" ? null : statusFilter === "true";
      const idServiceParam =
        serviceFilter !== "todos" ? parseInt(serviceFilter) : null;
      const data = await getReportCompanies({
        status: statusParam,
        idService: idServiceParam,
      });

      SetReportCompaniesData(data);
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
  }, [statusFilter, serviceFilter]);

  const CreatePDF = async () => {
    try {
      console.log(ReportCompaniesData);
     
      ReportCompaniesPDF(ReportCompaniesData);
    } catch (error) {
      console.log("Error a crear el pdf");
    } finally {
    }
  };
  //Acciones para el modal
  const handleOpenModal = (group) => {
    console.log(group);
    setSelectedCompany(group);
    console.log(selectedCompany);
    setOpenModal(true);
  };
  const handleCloseModal = async() => {
    setOpenModal(false);
    setSelectedCompany(null);
  };
  //Fin de acciones del modal

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
                        <Select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
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
                        <Select
                          value={serviceFilter}
                          onChange={(e) => setServiceFilter(e.target.value)}
                        >
                          <MenuItem value="todos">Todos</MenuItem>
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
            autoHeight
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

      {/* Modal para ver los detalles de la empresa */}

      <Modal open={openModal} onClose={handleCloseModal}>
  <Box sx={style}>
    <Grid container justifyContent="space-between" alignItems="center">
      <Typography variant="h6" fontWeight="bold">
        Detalles de la Empresa
      </Typography>
      <IconButton onClick={handleCloseModal}>
        <CloseIcon />
      </IconButton>
    </Grid>

    <Divider sx={{ my: 2 }} />

    <Grid container spacing={1}>
      {[
        ["Nombre:", selectedCompany?.nombre || "-"],
        ["Correo:", selectedCompany?.correo || "-"],
        ["Fecha incorporación:", selectedCompany?.fechaCreación || "-"],
        ["Servicio asociado:", selectedCompany?.serviceName || "-"],
        ["Cantidad de usuarios:", selectedCompany?.numberOfUsers || "-"],
        ["Estado:", selectedCompany?.estatus ? "Activo" : "Inactivo"],
      ].map(([label, value], index) => (
        <Grid item xs={12} key={index}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              {label}
            </Typography>
            <Typography>{value}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>

    <Box display="flex" justifyContent="flex-end" mt={3}>
      <Button variant="contained" onClick={handleCloseModal}>
        Cerrar
      </Button>
    </Box>
  </Box>
</Modal>

      {/* Termina Modal para ver los detalles de la empresa */}
    </div>
  );
}

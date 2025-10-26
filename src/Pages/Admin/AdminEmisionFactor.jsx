import { useState, useEffect, useMemo } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EmissionFactorModal from "../../components/EmisionFactorForm";
import {
  RemoveRedEyeOutlined,
  EditOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import {
  getMeasurementUnits,
  getSectors,
  getSources,
  getAllPCGs,
  createEmissionFactor,
  getEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor,
} from "../../API/Factor";

import Swal from "sweetalert2";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Card,
  TextField,
  Stack,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const EmissionFactorDashboard = () => {
  const [emissionFactors, setEmissionFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFactor, setEditingFactor] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sources, setSources] = useState([]);
  const [pcgs, setPcgs] = useState([]);

  useEffect(() => {
    const fetchEmissionFactors = async () => {
      try {
        setLoading(true);
        const factors = await getEmissionFactors();
        setEmissionFactors(factors);
      } catch (err) {
        console.error("Error loading emission factors:", err);
        setError("Failed to load emission factors.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmissionFactors();
  }, []);

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        setLoading(true);
        const [unitsRaw, sectorsRaw, sourcesRaw, pcgsRaw] = await Promise.all([
          getMeasurementUnits(),
          getSectors(),
          getSources(),
          getAllPCGs(),
        ]);
        const units = unitsRaw.map((u) => ({
          id: u.unidadId,
          name: u.nombre,
          diminutivo: u.diminutivo,
        }));
        const sectors = sectorsRaw.map((s) => ({
          id: s.sectorId,
          name: s.nombre,
          diminutivo: s.diminutivo,
        }));
        const sources = sourcesRaw.map((s) => ({
          id: s.fuenteId,
          name: s.nombre,
        }));

        const pcgs = pcgsRaw.map((p) => ({ id: p.pcgId, name: p.gei }));

        setMeasurementUnits(units);
        setSectors(sectors);
        setSources(sources);
        setPcgs(pcgs);
        
      } catch (err) {
        console.error(err);
        setError("Failed to load reference data");
      } finally {
        setLoading(false);
      }
    };

    fetchReferenceData();
  }, []);

  const getUnitName = (id) =>
    measurementUnits.find((u) => u.id === id)?.name || "Unknown";
  const getSectorName = (id) =>
    sectors.find((s) => s.id === id)?.name || "Unknown";
  const getSourceName = (id) =>
    sources.find((s) => s.id === id)?.name || "Unknown";
  const getPcgName = (id) => pcgs.find((p) => p.id === id)?.name || "Unknown";

  const filteredFactors = useMemo(() => {
    if (!searchTerm) return emissionFactors;

    const search = searchTerm.toLowerCase();

    return emissionFactors.filter((factor) => {
      return (
        (factor.name || "").toLowerCase().includes(search) ||
        (getUnitName(factor.unit) || "").toLowerCase().includes(search) ||
        (getUnitName(factor.unitCarbon) || "").toLowerCase().includes(search) ||
        (getSectorName(factor.sectoId) || "").toLowerCase().includes(search) ||
        (getSourceName(factor.sourceId) || "").toLowerCase().includes(search) ||
        (getPcgName(factor.pcgId) || "").toLowerCase().includes(search)
      );
    });
  }, [emissionFactors, searchTerm]);

  const handleCreate = () => {
    setEditingFactor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (factor) => {
    setEditingFactor({
      id: factor.id,
      name: factor.name,
      valueUnit: factor.valueUnit,
      valueEmision: factor.valueEmision,
      valueFactor: factor.valueFactor,
      unit: factor.unit, // Diminutivo (ej: "L")
      unitCarbono: factor.unitCarbono, // Diminutivo (ej: "t CO2")
      pcgNombre: factor.pcgNombre, // Nombre del PCG (ej: "CO2")
      sector: factor.sector, // ID del sector
      source: factor.source,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingFactor(null);
  };

  const handleDelete = (factor) => {
    setDeleteConfirmation(factor);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      await deleteEmissionFactor(deleteConfirmation.id);

      setEmissionFactors((prev) =>
        prev.filter((f) => f.id !== deleteConfirmation.id)
      );
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting emission factor:", error);
    }
  };

  const handleModalSubmit = async (formData) => {
    try {
      let success;

      if (editingFactor) {
        success = await updateEmissionFactor(formData);
      } else {
        success = await createEmissionFactor(formData);
      }

      if (success) {
        if (editingFactor) {
          setEmissionFactors((prev) =>
            prev.map((f) => (f.id === editingFactor.id ? formData : f))
          );
        } else {
          setEmissionFactors((prev) => [...prev, formData]);
        }
        setIsModalOpen(false);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const columns = [
    { Header: "Nombre", accessor: "nombre", align: "left" },
    { Header: "Unidad Primaria", accessor: "UnidadPrimaria", align: "left" },
    {
      Header: "Unidad de Carbono",
      accessor: "UnidaddeCarbono",
      align: "center",
    },
    { Header: "Valor Unitario", accessor: "ValorUnitario", align: "center" },
    { Header: "Valor del Carbon", accessor: "ValorCarbon", align: "center" },
    { Header: "Factor de emisión", accessor: "Factoremisión", align: "center" },
    { Header: "PCG", accessor: "PCG", align: "center" },
    { Header: "Fuente", accessor: "Fuente", align: "center" },
    { Header: "Acciones", accessor: "Acciones", align: "center" },
  ];

  const rows = filteredFactors.map((factor) => ({
    nombre: (
      <MDTypography variant="caption" fontWeight="medium">
        {factor.name}
      </MDTypography>
    ),
    UnidadPrimaria: (
      <MDTypography variant="caption" color="text">
        {factor.unit}
      </MDTypography>
    ),
    UnidaddeCarbono: (
      <MDTypography variant="caption" color="text">
        {factor.unitCarbono}
      </MDTypography>
    ),
    ValorUnitario: (
      <MDTypography variant="caption" color="text">
        {factor.valueUnit}
      </MDTypography>
    ),
    ValorCarbon: (
      <MDTypography variant="caption" color="text">
        {factor.valueEmision}
      </MDTypography>
    ),
    Factoremisión: (
      <MDTypography variant="caption" color="text">
        {factor.valueFactor}
      </MDTypography>
    ),
    PCG: (
      <MDTypography variant="caption" color="text">
        {factor.pcgNombre}
      </MDTypography>
    ),
    Fuente: (
      <MDTypography variant="caption" color="text">
        {factor.source}
      </MDTypography>
    ),
    Acciones: (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title="Editar">
          <IconButton
            size="small"
            color="info"
            onClick={() => handleEdit(factor)}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(factor)}
          >
            <DeleteOutlineOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <MDBox mb={2}>
          <MDBox
            borderRadius="xl"
            border="1px solid #ccc"
            p={3}
            mb={2}
            bgColor="white"
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Grid>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <FilterAltOutlinedIcon fontSize="medium" />
                  <MDTypography variant="h6">Filtros y Acciones</MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <MDTypography variant="body2" color="text">
                    Gestiona los factores de emisión registrados dentro de la organización
                  </MDTypography>
                </MDBox>
              </Grid>

              <Grid>
                <MDButton
                  variant="outlined"
                  sx={{
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#E8F5E9",
                      borderColor: "#43A047",
                      color: "#388E3C",
                    },
                  }}
                  onClick={handleCreate}
                >
                  Crear Nuevo
                </MDButton>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar factores..."
                  size="medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: "250px" }}
                />
              </Grid>
            </Grid>
          </MDBox>

          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid size={{xs: 12}}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="success"
                    borderRadius="lg"
                    coloredShadow="success"
                  >
                    <MDTypography variant="h6" color="white" align="left">
                      Factores de Emisión
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    {filteredFactors.length === 0 ? (
                      <Card
                        sx={{
                          p: 4,
                          textAlign: "center",
                          minHeight: "100px",
                          width: "1200px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontWeight="regular"
                        >
                          {searchTerm
                            ? "No se encontraron factores de emisión que coincidan con la búsqueda."
                            : "No hay factores de emisión registrados aún."}
                        </MDTypography>
                      </Card>
                    ) : (
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
                    )}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>

        <Footer />
      </MDBox>

      {/* Create/Edit Modal */}
      <EmissionFactorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingFactor={editingFactor}
        measurementUnits={measurementUnits}
        sectors={sectors}
        sources={sources}
        pcgs={pcgs}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={() => setDeleteConfirmation(null)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro de que deseas eliminar "{deleteConfirmation?.name}"?
            <br />
            Esta acción no se puede deshacer.
          </p>
        </DialogContent>
        <DialogActions>
          <MDButton
            onClick={() => setDeleteConfirmation(null)}
            variant="outlined"
            color="error"
          >
            Cancelar
          </MDButton>
          <MDButton onClick={confirmDelete} variant="gradient" color="success">
            Eliminar
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};
export default EmissionFactorDashboard;

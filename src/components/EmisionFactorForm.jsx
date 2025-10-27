import { useState, useEffect } from "react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
} from "@mui/material";
import { name } from "dayjs/locale/es";

const EmissionFactorModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingFactor,
  measurementUnits,
  sources,
  pcgs,
}) => {
  const initialFormData = {
    id: 0,
    name: "",
    unit: 0,
    unitCarbon: 0,
    unitValue: 0,
    carbonValue: 0,
    pcgId: 0,
    sourceId: 0,
    sectoId: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emissionFactor =
    formData.factorValue !== 0
      ? (formData.unitValue / formData.carbonValue).toFixed(4)
      : 0;
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isOpen) {
      if (editingFactor) {
        const unitId =
          measurementUnits.find((u) => u.diminutivo === editingFactor.unit)
            ?.id || 0;
        const unitCarbonId =
          measurementUnits.find(
            (u) => u.diminutivo === editingFactor.unitCarbono
          )?.id || 0;
        const sourceId =
          sources.find((s) => s.name === editingFactor.source)?.id || 0;
        const pcgId =
          pcgs.find((p) => p.name === editingFactor.pcgNombre)?.id || 0;
        const sectorId = editingFactor.sector || 0;

        setFormData({
          id: editingFactor.id || 0,
          name: editingFactor.name || "",
          unit: unitId,
          unitCarbon: unitCarbonId,
          unitValue: editingFactor.valueUnit || 0,
          carbonValue:
            editingFactor.carbonValue || editingFactor.valueEmision || 0,
          pcgId: pcgId,
          sourceId: sourceId,
          sectoId: sectorId,
          factorValue: emissionFactor,
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [isOpen, editingFactor, measurementUnits, sources, pcgs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "unit",
      "unitCarbon",
      "unitValue",
      "carbonValue",
      "pcgId",
      "sourceId",
      "sectoId",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value === ""
          ? 0
          : Number(value) // Manejo de campo vacío
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //Validaciones básicas
      if (
        !formData.name.trim() ||
        !formData.unit ||
        !formData.unitCarbon ||
        !formData.unitValue ||
        !formData.carbonValue ||
        !formData.pcgId ||
        !formData.sourceId ||
        !formData.sectoId
      ) {
        setErrors({
          name: !formData.name.trim() ? "Requerido" : "",
          unit: !formData.unit ? "Requerido" : "",
          unitCarbon: !formData.unitCarbon ? "Requerido" : "",
          unitValue: !formData.unitValue ? "Requerido" : "",
          carbonValue: !formData.carbonValue ? "Requerido" : "",
          pcgId: !formData.pcgId ? "Requerido" : "",
          sourceId: !formData.sourceId ? "Requerido" : "",
          sectoId: !formData.sectoId ? "Requerido" : "",
        });
        return;
      }

      // 2. Crear payload con validación de números
      const payload = {
        ...formData,
        carbonValue: validateNumber(formData.carbonValue),
        unitValue: validateNumber(formData.unitValue),
        unit: validateNumber(formData.unit),
        unitCarbon: validateNumber(formData.unitCarbon),
        pcgId: validateNumber(formData.pcgId),
        sourceId: validateNumber(formData.sourceId),
        sectoId: validateNumber(formData.sectoId),
      };

      // 3. Llamar a la función del padre
      await onSubmit(payload);

      // 4. Cerrar el modal solo si todo sale bien
      onClose();
      setErrors({});
    } catch (error) {
      console.error("Error en el envío del formulario:", {
        error: error.message,
        stack: error.stack,
        formData: formData,
      });

      // Mostrar error al usuario (puedes usar tu sistema de notificaciones)
      alert(`Error al guardar: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función auxiliar para validar números (añadir al componente)
  const validateNumber = (value) => {
    if (value === null || value === undefined || value === "") return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const handleCloseModal = () => {
    setEditingFactor(null);
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setErrors({});
        onClose();
      }}
      aria-labelledby="add-product-modal"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h5" fontWeight="bold" color="dark">
            {editingFactor
              ? "Editar Factor de Emisión"
              : "Crear Factor de Emisión"}
          </MDTypography>

          <IconButton onClick={() => {
             setErrors({});
             onClose();
          }}>
            <CloseIcon />
          </IconButton>
        </MDBox>
      </DialogTitle>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <MDBox mb={2}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingresar el nombre del Factor de emisión"
              size="small"
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
          </MDBox>

          <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
            <MDBox flex={1} minWidth="45%">
              <MDTypography variant="caption" fontWeight="medium" mb={1}>
                Unidad de medida primaria
              </MDTypography>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                error={!!errors.unit}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 8,
                  border: "1.5px solid #e0e3e7",
                  backgroundColor: "#f8f9fa",
                  fontSize: "1rem",
                  color: "#344767",
                }}
              >
                <MenuItem value={0}>Selecciona la unidad...</MenuItem>
                {measurementUnits.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>

            <MDBox flex={1} minWidth="45%">
              <MDTypography variant="caption" fontWeight="medium" mb={1}>
                Unidad de medida del carbono
              </MDTypography>
              <Select
                name="unitCarbon"
                value={formData.unitCarbon}
                onChange={handleInputChange}
                error={!!errors.unitCarbon}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 8,
                  border: "1.5px solid #e0e3e7",
                  backgroundColor: "#f8f9fa",
                  fontSize: "1rem",
                  color: "#344767",
                }}
              >
                <MenuItem value={0}>Selecciona la unidad...</MenuItem>
                {measurementUnits.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>
          </MDBox>

          <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
            <MDBox flex={1} minWidth="45%">
              <TextField
                fullWidth
                type="number"
                label="Valor unitario"
                name="unitValue"
                value={formData.unitValue}
                onChange={handleInputChange}
                step="0.01"
                required
                placeholder="0.00"
                size="small"
                error={!!errors.unitValue}
                helperText={errors.unitValue}
                sx={{ mb: 2 }}
              />
            </MDBox>

            <MDBox flex={1} minWidth="45%">
              <TextField
                fullWidth
                type="number"
                label="Valor de emisión"
                name="carbonValue"
                value={formData.carbonValue}
                onChange={handleInputChange}
                step="0.01"
                required
                placeholder="0.00"
                size="small"
                error={!!errors.carbonValue}
                helperText={errors.carbonValue}
              />
            </MDBox>
          </MDBox>

          <MDBox mb={3}>
            <MDTypography variant="caption" fontWeight="medium" mb={1}>
              Factor de Emisión (Valor unitario ÷ Valor de emisión)
            </MDTypography>
            <MDTypography
              variant="h6"
              fontWeight="bold"
              color="info"
              sx={{
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
                padding: "10px",
                width: "fit-content",
                userSelect: "none",
              }}
            >
              {formData.valueFactor !== 0
                ? (formData.unitValue / formData.carbonValue).toFixed(4)
                : "N/A"}
            </MDTypography>
          </MDBox>
          <MDBox mb={2}>
            <MDTypography variant="caption" fontWeight="medium" mb={1}>
              PCG (Greenhouse Gas)
            </MDTypography>
            <Select
              name="pcgId"
              value={formData.pcgId}
              onChange={handleInputChange}
              error={!!errors.pcgId}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1.5px solid #e0e3e7",
                backgroundColor: "#f8f9fa",
                fontSize: "1rem",
                color: "#344767",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <MenuItem value={0} disabled hidden style={{ color: "#888" }}>
                Selecciona el PCG...
              </MenuItem>
              {pcgs.map((pcg) => (
                <MenuItem key={pcg.id} value={pcg.id} style={{ color: "#000" }}>
                  {pcg.name}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
          <MDBox flex={1} minWidth="45%">
            <MDTypography variant="caption" fontWeight="medium" mb={1}>
              Fuente
            </MDTypography>
            <Select
              name="sourceId"
              value={formData.sourceId}
              onChange={handleInputChange}
              error={!!errors.sourceId}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: "1.5px solid #e0e3e7",
                backgroundColor: "#f8f9fa",
                fontSize: "1rem",
                color: "#344767",
              }}
            >
              <MenuItem value={0}>Selecciona la fuente...</MenuItem>
              {sources.map((source) => (
                <MenuItem key={source.id} value={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
        </DialogContent>

        <DialogActions>
          {/* Footer Buttons */}
          <MDBox display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <MDButton
              variant="outlined"
              color="error"
              onClick={() => {
             setErrors({});
             onClose();
          }}
              disabled={isSubmitting}
            >
              Cerrar
            </MDButton>
            <MDButton
              type="submit"
              variant="gradient"
              color="success"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Guardando..."
                : editingFactor
                  ? "Editar"
                  : "Guardar"}
            </MDButton>
          </MDBox>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmissionFactorModal;

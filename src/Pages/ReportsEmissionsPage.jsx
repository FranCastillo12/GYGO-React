import { getMonthlyEmissions, getSourcesEmissions, getRangeByMonthsEmissions, getRangeByYearsEmissions } from "../API/EmissionsReport/MonthlyEmissions"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { GetYearsByGroup } from "../API/Consumptions/MonthlyConsum";
import { exportChartToPDF } from "../utils/CreateReportPDF";
import { exportToExcel } from "../utils/CreateReportExcel";
import {Box, Card, CardContent, Typography, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem,
  Grid, Paper, Divider, Stack } from "@mui/material"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" }
];


export const ReportsEmissionsPage = () => {
  const chartRef = useRef();
  const [labels, setLabels] = useState([]);
  const [emissions, setEmissions] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [loadingYears, setLoadingYears] = useState(true);

  const [formData, setFormData] = useState({
    year: "",
    initialMonth: "",
    finalMonth: "",
    initialYear: "",
    finalYear: ""
  });

  useEffect(() => {
    const fetchYears = async () => {
      setLoadingYears(true);
      const result = await GetYearsByGroup();
      setAvailableYears(result);
      setLoadingYears(false);
    };
    fetchYears()
  }, [])

  const handleReportTypeChange = (type) => {
    setSelectedReport(type);
    setLabels([]);
    setEmissions([]);
    setFormData({ year: "", initialMonth: "", finalMonth: "", initialYear: "", finalYear: "" });
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setLabelsName = async(months) => {
    const mes = await months.map(item => meses[item - 1].label)
    setLabels(mes)
  }

  const handleGenerate = async () => {
    const { year, initialMonth, finalMonth, initialYear, finalYear } = formData;
    switch (selectedReport) {
      case "monthly":
        if (year) {
          const res = await getMonthlyEmissions(year);
          const labelsFetch = res.map(item => item.labels);
          const emissionsFetch = res.map(item => item.emissions);
          setLabelsName(labelsFetch);
          setEmissions(emissionsFetch);
        }
        break;
      case "sources":
        if (year) {
          const res = await getSourcesEmissions(year);
          setLabels(res.labels);
          setEmissions(res.emissions);
        }
        break;
      case "rangeMonths":
        if (year && initialMonth && finalMonth) {
          const res = await getRangeByMonthsEmissions(year, initialMonth, finalMonth);
          if (res && res.length > 0) {
            setLabelsName(res[0].labels);
            setEmissions(res[0].emissions);
          } else {
            setLabels([]);
            setEmissions([]);
          }

        }
        break;
      case "rangeYears":
        if (initialYear && finalYear) {
          const res = await getRangeByYearsEmissions(initialYear, finalYear);
          if (res && res.length > 0) {
            setLabels(res[0].labels);
            setEmissions(res[0].emissions);
          } else {
            setLabels([]);
            setEmissions([]);
          }
        }
        break;
    }
  };


  const chartData = {
    labels,
    datasets: [
      {
        label: "Emisiones (kg CO₂e)",
        data: emissions,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Reporte de Emisiones" }
    }
  };


  return (
    <>
      <Box  >
        <Paper elevation={2} sx={{ p: 3, mb: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
          <Typography variant="h4" component="h2" sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
            Reportes de Emisiones
          </Typography>
        </Paper>

        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, color: "#333" }}>
              Seleccione el tipo de reporte
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonGroup
                variant="outlined"
                size="large"
                sx={{
                  "& .MuiButton-root": {
                    px: 3,
                    py: 1.5,
                    fontWeight: "medium",
                    borderRadius: "8px",
                    mx: 0.5,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  },
                }}
              >
                <Button
                  onClick={() => handleReportTypeChange("monthly")}
                  color={selectedReport === "monthly" ? "primary" : "inherit"}
                  variant={selectedReport === "monthly" ? "contained" : "outlined"}
                >
                  Por Mes
                </Button>
                <Button
                  onClick={() => handleReportTypeChange("sources")}
                  color={selectedReport === "sources" ? "primary" : "inherit"}
                  variant={selectedReport === "sources" ? "contained" : "outlined"}
                >
                  Por Fuente
                </Button>
                <Button
                  onClick={() => handleReportTypeChange("rangeMonths")}
                  color={selectedReport === "rangeMonths" ? "primary" : "inherit"}
                  variant={selectedReport === "rangeMonths" ? "contained" : "outlined"}
                >
                  Rango de Meses
                </Button>
                <Button
                  onClick={() => handleReportTypeChange("rangeYears")}
                  color={selectedReport === "rangeYears" ? "primary" : "inherit"}
                  variant={selectedReport === "rangeYears" ? "contained" : "outlined"}
                >
                  Rango de Años
                </Button>
              </ButtonGroup>
            </Box>
          </CardContent>
        </Card>



        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent>
            {selectedReport === "" && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  Seleccione un tipo de reporte para comenzar
                </Typography>
              </Box>
            )}



            {(selectedReport === "monthly" || selectedReport === "sources") && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: "#333" }}>
                  Configuración del Reporte
                </Typography>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="yearInputLabel">Año</InputLabel>
                      <Select
                        labelId="yearInputLabel"
                        id="yearInput"
                        name="year"
                        label="Año"
                        value={formData.year}
                        onChange={handleInputChange}
                        sx={{ borderRadius: 2, width: "200px;" }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {availableYears.map((y) => (
                          <MenuItem key={y.yearlyConsumptionId} value={y.year}>
                            {y.year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGenerate}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                        },
                      }}
                    >
                      Generar Reporte
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}



            {selectedReport === "rangeMonths" && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: "#333" }}>
                  Rango de Meses
                </Typography>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="yearInputLabel2">Año</InputLabel>
                      <Select
                        labelId="yearInputLabel2"
                        id="yearInput2"
                        label="Año"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        sx={{ borderRadius: 2, width: "200px;" }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {availableYears.map((y) => (
                          <MenuItem key={y.yearlyConsumptionId} value={y.year}>
                            {y.year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="initialMonthLabel">Mes Inicial</InputLabel>
                      <Select
                        labelId="initialMonthLabel"
                        id="initialMonth"
                        label="Mes Inicial"
                        name="initialMonth"
                        value={formData.initialMonth}
                        onChange={handleInputChange}
                        sx={{ borderRadius: 2, width: "200px;" }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {meses.map((m) => (
                          <MenuItem key={m.value} value={m.value}>
                            {m.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="finalMonthLabel">Mes Final</InputLabel>
                      <Select
                        labelId="finalMonthLabel"
                        name="finalMonth"
                        label="Mes Final"
                        value={formData.finalMonth}
                        onChange={handleInputChange}
                        sx={{ borderRadius: 2, width: "200px;" }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {meses.map((m) => (
                          <MenuItem key={m.value} value={m.value}>
                            {m.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGenerate}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                        },
                      }}
                    >
                      Generar Reporte
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}


            {selectedReport === "rangeYears" && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: "#333" }}>
                  Rango de Años
                </Typography>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="initialYearLabel">Año Inicial</InputLabel>
                      <Select
                        labelId="initialYearLabel"
                        name="initialYear"
                        label="Año Inicial"
                        value={formData.initialYear}
                        onChange={handleInputChange}
                        sx={{ borderRadius: 2, width: "200px;" }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {availableYears.map((y) => (
                          <MenuItem key={y.yearlyConsumptionId} value={y.year}>
                            {y.year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="finalYearLabel">Año Final</InputLabel>
                      <Select
                        labelId="finalYearLabel"
                        name="finalYear"
                        label="Año Final"
                        value={formData.finalYear}
                        onChange={handleInputChange}
                        sx={{ borderRadius: 2, width: "200px;" }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {availableYears.map((y) => (
                          <MenuItem key={y.yearlyConsumptionId} value={y.year}>
                            {y.year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGenerate}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                        },
                      }}
                    >
                      Generar Reporte
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>

        {labels.length > 0 ? (
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, color: "#333" }}>
                Resultados del Reporte
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Bar ref={chartRef} data={chartData} options={chartOptions} />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => exportChartToPDF(chartRef, labels, emissions)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  Descargar PDF
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => exportToExcel(labels, emissions)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  Descargar Excel
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          selectedReport !== "" && (
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No hay datos para mostrar
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )
        )}

      </Box>
    </>

  );

}
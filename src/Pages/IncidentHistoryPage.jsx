import { useEffect, useState } from "react";
import { GetIncidentsHistory } from "../API/IncidentsHistory";
import {
  Grid,
  Card,
  CardContent
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const IncidentsHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);

  const getIncidents = async () => {
    setIsLoading(true);
    try {
      const response = await GetIncidentsHistory();
      const transformed = response.map((i) => ({
        id: i.id,
        fecha: new Date(i.detectedAt).toLocaleDateString(),
        promedio: `${i.expectedAverage.toFixed(2)} kg CO₂`,
        reales: `${i.realEmissions.toFixed(2)} kg CO₂`,
        leido: i.isRead ? "✔️" : "❌",
      }));
      setIncidents(transformed);
    } catch (err) {
      console.log("Error al cargar incidentes: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIncidents();
  }, []);

  const columns = [
    { Header: "Fecha", accessor: "fecha", align: "left" },
    { Header: "Promedio Esperado", accessor: "promedio", align: "center" },
    { Header: "Emisiones Reales", accessor: "reales", align: "center" },
    { Header: "Leído", accessor: "leido", align: "center" },
  ];

  const rows = incidents.map((i) => ({
    fecha: (
      <MDTypography variant="caption" fontWeight="medium">
        {i.fecha}
      </MDTypography>
    ),
    promedio: (
      <MDTypography variant="caption" color="text" sx={{color: "#495057"}}>
        {i.promedio}
      </MDTypography>
    ),
    reales: (
      <MDTypography variant="caption" color="text" sx={{color: "#495057"}}>
        {i.reales}
      </MDTypography>
    ),
    leido: (
      <MDTypography variant="caption" color="text">
        {i.leido}
      </MDTypography>
    ),
  }));

  return (
    <DashboardLayout>
        <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{xs:12}}>
            <Card
              sx={{
                background: "#ffffff",
                mb: 3,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid>
                    <MDBox display="flex" flexDirection="column" gap={1}>
                      <MDTypography variant="h6">Historial de Incidentes</MDTypography>
                      <MDTypography variant="body2" color="#495057">
                        Visualiza todos los incidentes de exceso de emisiones registrados
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12}}>
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
                <MDTypography variant="h6" color="white">
                  Registro de Incidentes
                </MDTypography>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                  loading={isLoading}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
};

export default IncidentsHistoryPage;

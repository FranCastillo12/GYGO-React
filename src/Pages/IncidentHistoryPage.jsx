import { useEffect, useState } from "react";
import { GetIncidentsHistory } from "../API/IncidentsHistory";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, Container, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material"
import "../styles/MonthlyHistory.css";


const IncidentsHistoryPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate(-1)
    }

    const getIncidents = async () => {
        setIsLoading(true);
        try {
            const response = await GetIncidentsHistory();
            const transformed = response.map((i) => ({
                id: i.id,
                groupMail: i.groupMail,
                groupId: i.groupId,
                monthlyConsumptionId: i.monthlyConsumptionId,
                expectedAverage: i.expectedAverage,
                realEmissions: i.realEmissions,
                detectedAt: new Date(i.detectedAt),
                notifiedAt: i.notifiedAt ? new Date(i.notifiedAt) : null,
                wasResent: i.wasResent,
                isRead: i.isRead,
            }));
            console.table(transformed)
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
        {
            field: "detectedAt",
            headerName: "Fecha",
            flex: 1.5,

        },

        {
            field: "expectedAverage",
            headerName: "Promedio Esperado",
            flex: 0.8,
            valueGetter: (params) =>
                typeof params.row?.expectedAverage === "number"
                    ? `${params.row.expectedAverage.toFixed(2)} kg CO₂`
                    : "-",
            renderCell: (params) => {
                const value = params.row?.expectedAverage;
                return typeof value === "number"
                    ? `${value.toFixed(2)} kg CO₂`
                    : "-";
            },
        },
        {
            field: "realEmissions",
            headerName: "Emisiones Reales",
            width: 200,
            flex: 0.8,
            renderCell: (params) => {
                const value = params.row?.realEmissions;
                return typeof value === "number"
                    ? `${value.toFixed(2)} kg CO₂`
                    : "-";
            },
        },
        {
            field: "isRead",
            headerName: "Leído",
            flex: 0.5,
            renderCell: (params) => (
                <span>{params.row.isRead ? "✔️" : "❌"}</span>
            ),
        },
    ];


    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box display={"flex"} justifyContent={"flex-start"} sx={{ mb: 3 }}>
                <Button
                    onClick={handleRegresar}
                    startIcon={<ArrowBack fontSize="small" />}
                    sx={{
                        backgroundColor: "white",
                        color: "#7d4f50",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        px: 2,
                        py: 1,
                        fontSize: "14px",
                        textTransform: "none",
                        gap: "6px",
                        boxShadow: "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                            transform: "translateY(-1px)",
                            boxShadow: "none",
                        },
                    }}
                >
                    Volver
                </Button>
            </Box>

            <Typography variant="h4" gutterBottom sx={{mb:4}}>
                Historial de Incidentes de Emisiones
            </Typography>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
                    <CircularProgress />
                </Box>
            ) : incidents.length === 0 ? (
                <Typography variant="body1" align="center" mt={4}>
                    No hay incidentes registrados.
                </Typography>
            ) : (
                <Box mt={2} height={500}>
                    <DataGrid
                        rows={incidents}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        getRowId={(row) => row.id}
                        disableSelectionOnClick
                    />
                </Box>
            )}
        </Container>
    );
};

export default IncidentsHistoryPage;

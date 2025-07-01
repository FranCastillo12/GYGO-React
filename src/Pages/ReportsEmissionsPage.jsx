import { getMonthlyEmissions, getSourcesEmissions, getRangeByMonthsEmissions, getRangeByYearsEmissions } from "../API/EmissionsReport/MonthlyEmissions"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { GetYearsByGroup } from "../API/Consumptions/MonthlyConsum";
import { exportChartToPDF } from "../utils/CreateReportPDF";
import { exportToExcel } from "../utils/CreateReportExcel";
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

    const handleGenerate = async () => {
        const { year, initialMonth, finalMonth, initialYear, finalYear } = formData;
        switch (selectedReport) {
            case "monthly":
                if (year) {
                    const res = await getMonthlyEmissions(year);
                    const labelsFetch = res.map(item => item.labels);
                    const emissionsFetch = res.map(item => item.emissions);
                    setLabels(labelsFetch);
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
                        setLabels(res[0].labels);
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
        <div className="reports-container" style={{ width: "80%", margin: "auto" }}>
            <h2>Reportes de Emisiones</h2>
            <div className="report-buttons">
                <button onClick={() => handleReportTypeChange("monthly")}>Por Mes</button>
                <button onClick={() => handleReportTypeChange("sources")}>Por Fuente</button>
                <button onClick={() => handleReportTypeChange("rangeMonths")}>Rango de Meses</button>
                <button onClick={() => handleReportTypeChange("rangeYears")}>Rango de Años</button>
            </div>

            <div className="report-inputs" style={{ marginTop: "20px" }}>
                {selectedReport === "" && <p>Seleccione un tipo de reporte para comenzar.</p>}

                {(selectedReport === "monthly" || selectedReport === "sources") && (
                    <>
                        <label>Año:</label>
                        <select name="year" value={formData.year} onChange={handleInputChange}>
                            <option value="">Seleccione</option>
                            {availableYears.map((y) => (
                                <option key={y.yearlyConsumptionId} value={y.year}>{y.year}</option>
                            ))}
                        </select>
                    </>
                )}

                {selectedReport === "rangeMonths" && (
                    <>
                        <label>Año:</label>
                        <select name="year" value={formData.year} onChange={handleInputChange}>
                            <option value="">Seleccione</option>
                            {availableYears.map((y) => (
                                <option key={y.yearlyConsumptionId} value={y.year}>{y.year}</option>
                            ))}
                        </select>

                        <label>Mes Inicial:</label>
                        <select name="initialMonth" value={formData.initialMonth} onChange={handleInputChange}>
                            <option value="">Seleccione</option>
                            {meses.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>

                        <label>Mes Final:</label>
                        <select name="finalMonth" value={formData.finalMonth} onChange={handleInputChange}>
                            <option value="">Seleccione</option>
                            {meses.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                    </>
                )}

                {selectedReport === "rangeYears" && (
                    <>
                        <label>Año Inicial:</label>
                        <select name="initialYear" value={formData.initialYear} onChange={handleInputChange}>
                            <option value="">Seleccione</option>
                            {availableYears.map((y) => (
                                <option key={y.yearlyConsumptionId} value={y.year}>{y.year}</option>
                            ))}
                        </select>

                        <label>Año Final:</label>
                        <select name="finalYear" value={formData.finalYear} onChange={handleInputChange}>
                            <option value="">Seleccione</option>
                            {availableYears.map((y) => (
                                <option key={y.yearlyConsumptionId} value={y.year}>{y.year}</option>
                            ))}
                        </select>
                    </>
                )}

                {selectedReport !== "" && (
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={handleGenerate}>Generar Reporte</button>
                    </div>
                )}
            </div>

            {labels.length > 0 ? (
                <div style={{ marginTop: "30px" }}>
                    <Bar ref={chartRef} data={chartData} options={chartOptions} />
                    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                        <button onClick={ () => exportChartToPDF(chartRef)}>Descargar PDF</button>
                        <button onClick={ () => exportToExcel(labels, emissions)}>Descargar Excel</button>
                    </div>
                </div>
            ) : (
                selectedReport !== "" && <p style={{ marginTop: "30px" }}>No hay datos para mostrar.</p>
            )}
        </div>
    );

}
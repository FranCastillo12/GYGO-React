import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getMonthlyConsumptions } from "../API/Consumptions/MonthlyConsum";
import { ArrowBackOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import "../styles/monthlyConsum.css";
import { MonthlyConsumptionTable } from "../components/MonthlyConsumTable";

const meses = [
  { value: "", label: "Todos los meses" },
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
  { value: 12, label: "Diciembre" },
];

const años = [
  { value: "", label: "Todos los años" },
  { value: 2025, label: "2025" },
  { value: 2024, label: "2024" },
  { value: 2023, label: "2023" },
];

export function MonthlyConsumptionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const consumoInfo = location.state;

  const [consumosMensuales, setConsumosMensuales] = useState([]);
  const [consumosFiltrados, setConsumosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ mes: "", año: "" });

   const handleAddMonthlyConsumption = () => {
    navigate(`/consumption/monthly/add/${id}`);
  };

  useEffect(() => {
    const fetchMonthlyConsumption = async () => {
      setLoading(true);
      const result = await getMonthlyConsumptions(id);
      setConsumosMensuales(result);
      setLoading(false);
    };
    fetchMonthlyConsumption();
  }, [id]);

  useEffect(() => {
    let datosFiltrados = [...consumosMensuales];
    if (filtros.mes !== "") {
      datosFiltrados = datosFiltrados.filter(c => c.month === Number(filtros.mes));
    }
    if (filtros.año !== "") {
      datosFiltrados = datosFiltrados.filter(c => c.year === Number(filtros.año));
    }
    setConsumosFiltrados(datosFiltrados);
  }, [filtros, consumosMensuales]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFiltros = () => setFiltros({ mes: "", año: "" });

  const calcularTotales = () => {
    return consumosFiltrados.reduce(
      (acc, consumo) => ({
        cantidad: acc.cantidad + consumo.amount,
        emisiones: acc.emisiones + consumo.emissions,
      }),
      { cantidad: 0, emisiones: 0 }
    );
  };

  const totales = calcularTotales();

  return (
    <div className="consumo-mensual-container">
      <div className="consumo-mensual-content">
        <div className="header-section">
          <button className="back-button" onClick={() => navigate("/consumption")}> <ArrowBackOutlined /> <span>Volver</span> </button>
          <h1 className="main-title">Consumo Mensual</h1>
          <p className="subtitle">
            {consumoInfo ? `Detalle mensual de: ${consumoInfo.name}` : "Detalle de consumos por mes y año"}
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon total-icon"> <CalendarMonthOutlined /> </div>
              <div className="stat-info">
                <p className="stat-label">Total Registros</p>
                <p className="stat-value">{consumosFiltrados.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon quantity-icon">Σ</div>
              <div className="stat-info">
                <p className="stat-label">Cantidad Total</p>
                <p className="stat-value">{totales.cantidad.toFixed(2)} kWh</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon emissions-icon">CO₂</div>
              <div className="stat-info">
                <p className="stat-label">Emisiones Totales</p>
                <p className="stat-value">{totales.emisiones.toFixed(2)} kg</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon average-icon">⌀</div>
              <div className="stat-info">
                <p className="stat-label">Promedio Mensual</p>
                <p className="stat-value">
                  {consumosFiltrados.length > 0 ? (totales.emisiones / consumosFiltrados.length).toFixed(2) : 0} kg
                </p>
              </div>
            </div>
          </div>
        </div>
        

        <div className="filters-card">
          <div className="filters-header">
            <h3>Filtros</h3>
            <button className="clear-filters-button" onClick={limpiarFiltros}>Limpiar Filtros</button>
          </div>
          <div className="filters-content">
            <div className="filter-group">
              <label htmlFor="mes" className="filter-label">Mes</label>
              <select id="mes" name="mes" value={filtros.mes} onChange={handleFiltroChange} className="filter-select">
                {meses.map(mes => <option key={mes.value} value={mes.value}>{mes.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="año" className="filter-label">Año</label>
              <select id="año" name="año" value={filtros.año} onChange={handleFiltroChange} className="filter-select">
                {años.map(año => <option key={año.value} value={año.value}>{año.label}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="main-card">
          <div className="card-header">
            <div className="header-content">
              <h2 className="card-title">Registro de Consumos</h2>
              <button className="add-button" onClick={handleAddMonthlyConsumption}>
                <span>Agregar Consumo Mensual</span>
              </button>
            </div>
          </div>

        <MonthlyConsumptionTable
          consumos={consumosFiltrados}
          loading={loading}
          consumptionId={id}
        />
        </div>
      </div>
    </div>
  );
}

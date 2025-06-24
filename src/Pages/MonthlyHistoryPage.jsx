import { useState, useEffect } from "react"
import "../styles/MonthlyHistory.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon
} from "@mui/icons-material";
import { getMonthlyHistory } from "../API/Consumptions/MonthlyHistory";




export function MonthlyHistoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [historialCambios, setHistorialCambios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorialCambios = async () => {
      setLoading(true);
      try {
        const response = await getMonthlyHistory(id);
        setHistorialCambios(response);
      } catch (error) {
        console.error("Error al cargar historial de cambios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorialCambios();
  }, [id]);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTipoCambioIcon = (tipoCambio) => {
    switch (tipoCambio) {
      case "Creación":
        return <TrendingUpIcon fontSize="small" />;
      case "Update":
      case "Edición":
        return <EditIcon fontSize="small" />;
      default:
        return <HistoryIcon fontSize="small" />;
    }
  };

  const getTipoCambioColor = (tipo) => {
    switch (tipo) {
      case "Creación":
        return "badge-create";
      case "Update":
      case "Edición":
        return "badge-edit";
      default:
        return "badge-default";
    }
  };

  const calcularEstadisticas = () => {
    const tipos = historialCambios.reduce((acc, cambio) => {
      acc[cambio.tipo] = (acc[cambio.tipo] || 0) + 1;
      return acc;
    }, {});

    const tipoMasComun = Object.keys(tipos).reduce(
      (a, b) => (tipos[a] > tipos[b] ? a : b),
      ""
    );

    return {
      totalCambios: historialCambios.length,
      tipoMasComun,
    };
  };

  const estadisticas = calcularEstadisticas();

  const onVolver = () => {
    navigate(-1);
  };

  return (
    <div className="historial-cambios-container">
      <div className="historial-cambios-content">
        <div className="header-section">
          <div className="header-actions">
            <button className="back-button" onClick={onVolver}>
              <ArrowBackIcon fontSize="small" />
              <span>Volver</span>
            </button>
          </div>
          <h1 className="main-title">Historial de Cambios</h1>
          <p className="subtitle">Registro de cambios para el consumo mensual ID: {id}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon total-icon">
                <HistoryIcon />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Cambios</p>
                <p className="stat-value">{estadisticas.totalCambios}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon type-icon">
                {getTipoCambioIcon(estadisticas.tipoMasComun)}
              </div>
              <div className="stat-info">
                <p className="stat-label">Tipo Más Común</p>
                <p className="stat-value">{estadisticas.tipoMasComun || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="main-card">
          <div className="card-header">
            <div className="header-content">
              <h2 className="card-title">Registro de Actividades</h2>
              <div className="results-info">
                <span className="total-results">Total: {historialCambios.length} registros</span>
              </div>
            </div>
          </div>

          <div className="card-content">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <span className="loading-text">Cargando historial de cambios...</span>
              </div>
            ) : historialCambios.length === 0 ? (
              <div className="no-results">
                <HistoryIcon style={{ fontSize: 48 }} />
                <h3>No hay historial disponible</h3>
                <p>No se encontraron registros de cambios para este elemento.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="historial-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Tipo de Cambio</th>
                      <th>Descripción del Cambio</th>
                      <th>Fecha del Cambio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historialCambios.map((cambio) => (
                      <tr key={cambio.logId}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              <PersonIcon fontSize="small" />
                            </div>
                            <div className="user-details">
                              <span className="user-name">{cambio.username}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={`change-type-badge ${getTipoCambioColor(cambio.tipo)}`}>
                            {getTipoCambioIcon(cambio.tipo)}
                            <span>{cambio.tipo}</span>
                          </div>
                        </td>
                        <td className="description-cell">{cambio.cambio}</td>
                        <td className="date-cell">{formatDateTime(cambio.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
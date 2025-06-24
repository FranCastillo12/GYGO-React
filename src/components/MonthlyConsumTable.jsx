// MonthlyConsumptionTable.jsx
import { EditOutlined, HistoryOutlined } from "@mui/icons-material";
import "../styles/monthlyConsum.css";
import { useNavigate } from "react-router-dom";

const getNombreMes = (numeroMes) => {
  const meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return meses[numeroMes] || numeroMes;
};

export function MonthlyConsumptionTable({ consumos, loading, consumptionId }) {
    const navigate = useNavigate();
  const handleEditarConsumo = (monthlyId) => {
    navigate(`/consumption/monthly/edit/${consumptionId}/${monthlyId}`);
  };

  const handleVerHistorial = (id) => {
    navigate(`/consumption/monthly/history/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span className="loading-text">Cargando consumos mensuales...</span>
      </div>
    );
  }

  if (consumos.length === 0) {
    return (
      <div className="no-results">
        <HistoryOutlined />
        <h3>No se encontraron resultados</h3>
        <p>No hay consumos que coincidan con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="consumos-mensuales-table">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Año</th>
            <th>Cantidad</th>
            <th>Emisiones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consumos.map((consumo) => (
            <tr key={consumo.monthlyConsumptionId} className="table-row">
              <td>{getNombreMes(consumo.month)}</td>
              <td>{consumo.year}</td>
              <td>{consumo.amount.toLocaleString()} kWh</td>
              <td>{consumo.emissions.toFixed(2)} kg CO₂</td>
              <td>
                <div className="actions-container">
                  <button className="action-button edit-button" onClick={() => handleEditarConsumo(consumo.monthlyConsumptionId)}>
                    <EditOutlined /> <span>Editar</span>
                  </button>
                  <button className="action-button history-button" onClick={() => handleVerHistorial(consumo.monthlyConsumptionId)}>
                    <HistoryOutlined /> <span>Ver Historial</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

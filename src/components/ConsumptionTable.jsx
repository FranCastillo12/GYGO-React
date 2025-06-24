import { RemoveRedEyeOutlined, EditOutlined } from "@mui/icons-material";

export function ConsumptionTable({ consumos, loading, onVerConsumoMensual, onEditarConsumo }) {
  return (
    <div className="card-content">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span className="loading-text">Cargando consumos...</span>
        </div>
      ) : (
        <div className="table-container">
          <table className="consumos-table">
            <thead>
              <tr>
                <th>Nombre Consumo</th>
                <th>Nombre Factor</th>
                <th>Unidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consumos.map((consumo) => (
                <tr key={consumo.consumptionId} className="table-row">
                  <td className="type-cell">{consumo.name}</td>
                  <td className="type-cell">{consumo.factorName}</td>
                  <td className="type-cell">{consumo.unitAbbreviation}</td>
                  <td>
                    <div className="actions-container">
                      <button className="action-button view-button" onClick={() => onVerConsumoMensual(consumo)}>
                        <RemoveRedEyeOutlined />
                        <span>Ver Mensual</span>
                      </button>
                      <button className="action-button edit-button" onClick={() => onEditarConsumo(consumo.consumptionId)}>
                        <EditOutlined />
                        <span>Editar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

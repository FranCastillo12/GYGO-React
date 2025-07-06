import { useState, useEffect } from "react";
import "../styles/consumption.css";
import { useNavigate } from "react-router-dom";
import { ConsumptionTable } from "../components/ConsumptionTable";
import { getConsumptions } from "../API/Consumptions/Consumption";
import { Compost, WarningAmber } from "@mui/icons-material";
import { IncidentsHistoryModal } from "../components/IncidentsHistoryModal";

export function ConsumptionPage() {
  const [consumos, setConsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchConsumos = async () => {
      setLoading(true);
      const result = await getConsumptions();
      setConsumos(result);
      setLoading(false);
    };
    fetchConsumos();
  }, []);
  const handleAgregarConsumo = () => {
    navigate("/consumption/add");
  };

  const handleVerConsumoMensual = (consumo) => {
    navigate(`/consumption/monthly/${consumo.consumptionId}`, { state: consumo });
  };

  const handleEditarConsumo = (id) => {
    navigate(`/consumption/edit/${id}`);
  };

  const handleVerIncidentes = ( ) => {
    navigate("/emissions/incidents")
  }

  return (
    <div className="consumos-container">
      <div className="consumos-content">
        <div className="header-section">
          <h1 className="main-title">Consumos</h1>
          <p className="subtitle">
            Gestiona y monitorea todos los consumos de tu empresa para calcular tu huella de carbono
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon energy-icon">
                <Compost />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Consumos</p>
                <p className="stat-value">{consumos.length}</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon energy-icon">
                <WarningAmber />
              </div>
              <div className="stat-info">
                <p className="stat-label">Alertas de emisiones</p>
                <button
                  onClick={() => handleVerIncidentes()}
                  className="btn btn-alerts"
                >
                  Ver incidentes
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="main-card">
          <div className="card-header">
            <div className="header-content">
              <h2 className="card-title">Registro de Consumos</h2>
              <button className="add-button" onClick={handleAgregarConsumo}>
                <span>Agregar Consumo</span>
              </button>
            </div>
          </div>

          <ConsumptionTable
            consumos={consumos}
            loading={loading}
            onVerConsumoMensual={handleVerConsumoMensual}
            onEditarConsumo={handleEditarConsumo}
          />
          <IncidentsHistoryModal
            isOpen={showIncidentModal}
            onClose={() => setShowIncidentModal(false)}
          />

        </div>
      </div>
    </div>
  );
}

import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AddConsumptionForm } from "../components/AddConsumptionForm";
import "../styles/AddConsumption.css";

export function AddConsumptionPage() {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/consumption");
  };

  return (
    <div className="agregar-consumo-container">
      <div className="agregar-consumo-content">
        {/* Header */}
        <div className="header-section">
          <div className="header-actions">
            <button className="back-button" onClick={handleVolver}>
              <ArrowBackOutlined />
              <span>Volver</span>
            </button>
          </div>
          <h1 className="main-title">Agregar Consumo</h1>
          <p className="subtitle">
            Registra un nuevo consumo para calcular su impacto en la huella de carbono
          </p>
        </div>

        {/* Formulario */}
        <AddConsumptionForm />
      </div>
    </div>
  );
}
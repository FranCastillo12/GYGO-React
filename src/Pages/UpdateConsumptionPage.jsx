import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateConsumption, getConsumptionById } from "../API/Consumptions/Consumption";
import { getFactoresEmision } from "../API/FactorEmision";
import "../styles/AddConsumption.css";
import { ArrowBackOutlined, CheckBoxOutlined, ErrorOutline } from "@mui/icons-material";

export function UpdateConsumptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    consumptionId: 0,
    name: "",
    factorEmisionId: "",
    isActive: true,
  });

  const [factores, setFactores] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
  try {
    const dataList = await getConsumptionById(id);
    const data = dataList[0];
    if (data) {
      setFormData({
        consumptionId: data.consumptionId,
        name: data.name || "",
        factorEmisionId: data.factorEmisionId || "",
        isActive: data.isActive,
      });
    } else {
      console.error("No se encontró el consumo.");
    }
  } catch (e) {
    console.error("Error al cargar consumo:", e);
  }
};

    const fetchFactores = async () => {
      try {
        const result = await getFactoresEmision();
        setFactores(result);
      } catch (e) {
        console.error("Error al cargar factores:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchFactores();
  }, [id]);

  const factorSeleccionado = factores.find(f => f.id === Number(formData.factorEmisionId));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: "El nombre es obligatorio." });
      return;
    }
    if (!formData.factorEmisionId) {
      setErrors({ factorEmisionId: "Debe seleccionar un factor." });
      return;
    }
    try {
      await UpdateConsumption(formData);
      setSuccess(true);
      setTimeout(() => navigate("/consumption"), 2000);
    } catch (e) {
      console.error(e);
      setErrors({ submit: "Error al actualizar el consumo." });
    }
  };

  return (
    <div className="agregar-consumo-container">
      <div className="agregar-consumo-content">
        <div className="header-section">
          <button className="back-button" onClick={() => navigate("/consumption")}> <ArrowBackOutlined /> <span>Volver</span> </button>
          <h1 className="main-title">Editar Consumo</h1>
          <p className="subtitle">Modifique los datos del consumo seleccionado</p>
        </div>

        {success && (
          <div className="success-message">
            <CheckBoxOutlined />
            <span>¡Consumo actualizado exitosamente!</span>
          </div>
        )}

        <div className="form-card">
          <div className="card-header">
            <h2 className="card-title">Información del Consumo</h2>
          </div>

          <form onSubmit={handleSubmit} className="consumo-form">
            <div className="form-group">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                name="name"
                className={`form-input ${errors.name ? "error" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-message"><ErrorOutline /><span>{errors.name}</span></div>}
            </div>

            <div className="form-group">
              <label className="form-label">Factor de Emisión *</label>
              <select
                name="factorEmisionId"
                className={`form-select ${errors.factorEmisionId ? "error" : ""}`}
                value={formData.factorEmisionId}
                onChange={handleChange}
              >
                <option value="">Seleccione un factor</option>
                {factores.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              {errors.factorEmisionId && <div className="error-message"><ErrorOutline /><span>{errors.factorEmisionId}</span></div>}
              {factorSeleccionado && (
                <div className="factor-info">
                  <span>Nombre: {factorSeleccionado.name}</span> | 
                  <span>Unidad: {factorSeleccionado.unitCarbono}</span>
                </div>
              )}
            </div>

            <div className="form-check">
                <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Activo</label>
            </div>

            {errors.submit && <div className="error-message submit-error"><ErrorOutline /><span>{errors.submit}</span></div>}

            <div className="form-actions">
              <button type="submit" className="submit-button">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

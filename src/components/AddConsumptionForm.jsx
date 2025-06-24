import { useEffect, useState } from "react";
import {
  AddOutlined,
  CheckBoxOutlined,
  ErrorOutline,
} from "@mui/icons-material";
import { getFactoresEmision } from "../API/FactorEmision";
import { addConsumption } from "../API/Consumptions/Consumption";

export function AddConsumptionForm() {
  const [formData, setFormData] = useState({
    name: "",
    factorEmisionId: "",
  });

  const [factoresEmision, setFactoresEmision] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchFactores = async () => {
      try {
        const response = await getFactoresEmision();
        setFactoresEmision(response);
      } catch (error) {
        console.error("Error cargando factores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFactores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.factorEmisionId)
      newErrors.factorEmisionId = "Seleccione un factor";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const consumo = {
        name: formData.name,
        factorEmisionId: parseInt(formData.factorEmisionId),
      };

      await addConsumption(consumo); 

      setShowSuccess(true);
      setFormData({ name: "", factorEmisionId: "" });

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error al guardar:", err);
      setErrors({ submit: "Error al guardar. Intente de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      {showSuccess && (
        <div className="success-message">
          <CheckBoxOutlined />
          <span>¡Consumo agregado exitosamente!</span>
        </div>
      )}

      <div className="card-header">
        <h2 className="card-title">Información del Consumo</h2>
        <p className="card-description">
          Complete los campos para registrar el nuevo consumo
        </p>
      </div>

      <div className="card-content">
        <form onSubmit={handleSubmit} className="consumo-form">
          {/* nombre */}
          <div className="form-group">
            <label className="form-label">Nombre *</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Consumo de gasolina"
              className={`form-input ${errors.name ? "error" : ""}`}
            />
            {errors.name && (
              <div className="error-message">
                <ErrorOutline />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* factor de emision */}
          <div className="form-group">
            <label className="form-label">Factor de Emisión *</label>
            {loading ? (
              <span>Cargando factores...</span>
            ) : (
              <select
                name="factorEmisionId"
                value={formData.factorEmisionId}
                onChange={handleChange}
                className={`form-select ${errors.factorEmisionId ? "error" : ""}`}
              >
                <option value="">Seleccione un factor</option>
                {factoresEmision.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.unitCarbono})
                  </option>
                ))}
              </select>
            )}
            {errors.factorEmisionId && (
              <div className="error-message">
                <ErrorOutline />
                <span>{errors.factorEmisionId}</span>
              </div>
            )}
          </div>

          {/* error global */}
          {errors.submit && (
            <div className="error-message submit-error">
              <ErrorOutline />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* submit */}
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? (
                <>
                  <div className="loading-spinner-small"></div>
                  <span>Agregando...</span>
                </>
              ) : (
                <>
                  <AddOutlined />
                  <span>Agregar Consumo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

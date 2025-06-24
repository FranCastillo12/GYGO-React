import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddOutlined,
  ArrowBackOutlined,
  CheckBoxOutlined,
  ErrorOutline,
} from "@mui/icons-material";
import "../styles/consumption.css";
import { getConsumptionById } from "../API/Consumptions/Consumption"; // Deberías tener un fetch para esto
import { addMonthlyConsumption } from "../API/Consumptions/MonthlyConsum"; // Tu función para agregar

export function AddMonthlyConsumForm({ consumptionId }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    month: "",
    year: "",
    amount: "",
  });

  const [consumo, setConsumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchConsumo = async () => {
      try {
        const data = await getConsumptionById(consumptionId);
        console.log(data)
        setConsumo(data);
      } catch (error) {
        console.error("Error cargando el consumo base", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumo();
  }, [consumptionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.month) newErrors.month = "Debe ingresar el mes";
    if (!formData.year) newErrors.year = "Debe ingresar el año";
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = "La cantidad debe ser mayor a 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const newMonthly = {
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        consumptionId,
        amount: parseFloat(formData.amount),
      };

      await addMonthlyConsumption(newMonthly);

      setShowSuccess(true);
      setFormData({ month: "", year: "", amount: "" });

      setTimeout(() => {
        setShowSuccess(false);
        navigate(`/consumption/monthly/${consumptionId}`);
      }, 2500);
    } catch (error) {
      console.error("Error al agregar consumo mensual:", error);
      setErrors({ submit: "No se pudo agregar el consumo mensual" });
    } finally {
      setSubmitting(false);
    }
  };

  const calcularEmisiones = () => {
    if (!consumo || !formData.amount) return 0;
    const valorFactor = consumo.valueEmision / consumo.valueUnit;
    return (valorFactor * consumo.pcg).toFixed(2);
  };

  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <div className="agregar-consumo-container">
      <div className="agregar-consumo-content">
        {/* header */}
        <div className="header-section">
          <div className="header-actions">
            <button className="back-button" onClick={handleVolver}>
              <ArrowBackOutlined />
              <span>Volver</span>
            </button>
          </div>
          <h1 className="main-title">Agregar Consumo Mensual</h1>
          <p className="subtitle">
            Registrar un nuevo consumo mensual asociado al consumo seleccionado
          </p>
        </div>

        {showSuccess && (
          <div className="success-message">
            <CheckBoxOutlined />
            <span>¡Consumo mensual agregado!</span>
          </div>
        )}

        {/* form card s */}
        <div className="form-card">
          <div className="card-header">
            <h2 className="card-title">Información del Consumo Mensual</h2>
            <p className="card-description">
              Complete los campos requeridos para agregar el consumo mensual
            </p>
          </div>

          <div className="card-content">
            <form onSubmit={handleSubmit} className="consumo-form">
              {/* mes */}
              <div className="form-group">
                <label htmlFor="month" className="form-label">
                  Mes *
                </label>
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className={`form-select ${errors.month ? "error" : ""}`}
                >
                  <option value="">Seleccione un mes</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("es", { month: "long" })}
                    </option>
                  ))}
                </select>
                {errors.month && (
                  <div className="error-message">
                    <ErrorOutline />
                    <span>{errors.month}</span>
                  </div>
                )}
              </div>

              {/*año */}
              <div className="form-group">
                <label htmlFor="year" className="form-label">
                  Año *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`form-input ${errors.year ? "error" : ""}`}
                  min="1900"
                />
                {errors.year && (
                  <div className="error-message">
                    <ErrorOutline />
                    <span>{errors.year}</span>
                  </div>
                )}
              </div>

              {/* cantidad */}
              <div className="form-group">
                <label htmlFor="amount" className="form-label">
                  Cantidad *
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`form-input ${errors.amount ? "error" : ""}`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.amount && (
                  <div className="error-message">
                    <ErrorOutline />
                    <span>{errors.amount}</span>
                  </div>
                )}
                {formData.amount && consumo && (
                  <div className="calculation-preview">
                    <span>Huella estimada: </span>
                    <strong>{calcularEmisiones()} kg CO₂</strong>
                  </div>
                )}
              </div>

              {/* submit */}
              {errors.submit && (
                <div className="error-message submit-error">
                  <ErrorOutline />
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" disabled={submitting} className="submit-button">
                  {submitting ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      <span>Agregando...</span>
                    </>
                  ) : (
                    <>
                      <AddOutlined />
                      <span>Agregar Consumo Mensual</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

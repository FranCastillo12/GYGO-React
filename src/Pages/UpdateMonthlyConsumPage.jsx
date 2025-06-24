import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorOutline, SaveOutlined, ArrowBack } from "@mui/icons-material";
import "../styles/consumption.css";
import { UpdateMonthlyConsumption, getMonthlyConsumptions } from "../API/Consumptions/MonthlyConsum";

export function UpdateMonthlyConsumPage() {
  const { consumptionId, monthlyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    month: "",
    year: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const data = await getMonthlyConsumptions(consumptionId);
        const found = data.find((item) => item.monthlyConsumptionId === Number(monthlyId));
        if (found) {
          setFormData({
            month: found.month,
            year: found.year,
            amount: found.amount,
          });
        }
      } catch (error) {
        console.error("Error al cargar el consumo mensual:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthly();
  }, [consumptionId, monthlyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = "Mes inválido (1-12)";
    }
    if (!formData.year || formData.year < 2000 || formData.year > 2100) {
      newErrors.year = "Año inválido";
    }
    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Cantidad debe ser mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);

    try {
      const dto = {
        monthlyConsumptionId: Number(monthlyId),
        consumptionId: Number(consumptionId),
        month: Number(formData.month),
        year: Number(formData.year),
        amount: Number.parseFloat(formData.amount),
      };

      await UpdateMonthlyConsumption(dto);
      navigate(`/consumption/monthly/${consumptionId}`);
    } catch (error) {
      console.error("Error al actualizar consumo mensual:", error);
      setErrors({ submit: "Error al actualizar el consumo." });
    } finally {
      setSubmitting(false);
    }
  };

  const onVolver = () => {
    navigate(-1);
  };

  return (
    <div className="agregar-consumo-container">
      <div className="agregar-consumo-content">
        <div className="header-section">
          <button className="back-button" onClick={onVolver}>
            <ArrowBack /> Volver
          </button>
          <h1 className="main-title">Editar Consumo Mensual</h1>
        </div>

        <div className="form-card">
          <div className="card-header">
            <h2 className="card-title">Modificar los datos del consumo</h2>
          </div>

          <div className="card-content">
            {loading ? (
              <p>Cargando datos...</p>
            ) : (
              <form onSubmit={handleSubmit} className="consumo-form">
                <div className="form-group">
                  <label htmlFor="month">Mes *</label>
                  <input
                    type="number"
                    name="month"
                    id="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    className={`form-input ${errors.month ? "error" : ""}`}
                    min="1"
                    max="12"
                  />
                  {errors.month && (
                    <div className="error-message">
                      <ErrorOutline /> <span>{errors.month}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="year">Año *</label>
                  <input
                    type="number"
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`form-input ${errors.year ? "error" : ""}`}
                    min="2000"
                    max="2100"
                  />
                  {errors.year && (
                    <div className="error-message">
                      <ErrorOutline /> <span>{errors.year}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Cantidad *</label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`form-input ${errors.amount ? "error" : ""}`}
                    min="0"
                    step="0.01"
                  />
                  {errors.amount && (
                    <div className="error-message">
                      <ErrorOutline /> <span>{errors.amount}</span>
                    </div>
                  )}
                </div>

                {errors.submit && (
                  <div className="error-message submit-error">
                    <ErrorOutline /> <span>{errors.submit}</span>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" disabled={submitting} className="submit-button">
                    {submitting ? "Actualizando..." : (<><SaveOutlined /> Guardar Cambios</>)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
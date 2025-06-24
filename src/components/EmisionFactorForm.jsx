import { useState, useEffect } from "react"
import "../styles/EmisionFactorModal.css"

const EmissionFactorModal = ({ isOpen,
  onClose,
  onSubmit,
  editingFactor,
  measurementUnits,
  sectors,
  sources,
  pcgs}) => {
    
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    unit: 0,
    unitCarbon: 0,
    unitValue: 0,
    carbonValue: 0,
    pcgId: 0,
    sourceId: 0,
    sectoId: 0,
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emissionFactor = formData.carbonValue !== 0 ? formData.unitValue / formData.carbonValue : 0
  
  useEffect(() => {
    if (isOpen) {
      if (editingFactor) {
        if (editingFactor) {
          setFormData({
            id: editingFactor.id || 0,
            name: editingFactor.name || "",
            unit: typeof editingFactor.unit === "number" ? editingFactor.unit : 0,
            unitCarbon: typeof editingFactor.unitCarbon === "number" ? editingFactor.unitCarbon : 0,
            unitValue: editingFactor.unitValue || 0,
            carbonValue: editingFactor.carbonValue || 0,
            pcgId: editingFactor.pcgId || 0,
            sourceId: editingFactor.sourceId || 0,
            sectoId: editingFactor.sectoId || 0,
          });
}
      } else {
        setFormData({
          id: 0,
          name: "",
          unit: 0,
          unitCarbon: 0,
          unitValue: 0,
          carbonValue: 0,
          pcgId: 0,
          sourceId: 0,
          sectoId: 0,
        })
      }
    }
  }, [isOpen, editingFactor])

  const handleInputChange = (e) => {
  const { name, value, type } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "number" || ["unit", "unitCarbon", "sourceId", "sectoId", "pcgId"].includes(name)
        ? Number(value) || 0
        : value,
  }));
};

  const handleEdit = (factor) => {
    setEditingFactor(factor);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  
  const handleCloseModal = () => {
  setEditingFactor(null);
  setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{editingFactor ? "Edit Emission Factor" : "Create Emission Factor"}</h2>
          <button className="close-btn" onClick={handleCloseModal} disabled={isSubmitting}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter emission factor name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="unit">Primary Measurement Unit</label>
                <select id="unit" name="unit" value={formData.unit} onChange={handleInputChange} required>
                  <option value={0}>Select unit...</option>
                  {measurementUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="unitCarbon">Carbon Measurement Unit</label>
                <select
                  id="unitCarbon"
                  name="unitCarbon"
                  value={formData.unitCarbon}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>Select unit...</option>
                  {measurementUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="unitValue">Unit Value</label>
                <input
                  type="number"
                  id="unitValue"
                  name="unitValue"
                  value={formData.unitValue}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="carbonValue">Carbon Value</label>
                <input
                  type="number"
                  id="carbonValue"
                  name="carbonValue"
                  value={formData.carbonValue}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Emission Factor (Unit Value ÷ Carbon Value)</label>
              <div className="calculated-value">{emissionFactor.toFixed(4)}</div>
            </div>

            <div className="form-group">
              <label htmlFor="pcgId">PCG (Greenhouse Gas)</label>
              <select id="pcgId" name="pcgId" value={formData.pcgId} onChange={handleInputChange} required>
                <option value={0}>Select PCG...</option>
                {pcgs.map((pcg) => (
                  <option key={pcg.id} value={pcg.id}>
                    {pcg.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sectoId">Sector</label>
                <select id="sectoId" name="sectoId" value={formData.sectoId} onChange={handleInputChange} required>
                  <option value={0}>Select sector...</option>
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sourceId">Source</label>
                <select id="sourceId" name="sourceId" value={formData.sourceId} onChange={handleInputChange} required>
                  <option value={0}>Select source...</option>
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={handleCloseModal} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : editingFactor ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmissionFactorModal
import { useState, useEffect, useMemo } from "react"
import EmissionFactorModal from "../components/EmisionFactorForm"
import "../styles/EmisionFactorDash.css"
import {
  getMeasurementUnits,
  getSectors,
  getSources,
  getAllPCGs,
  createEmissionFactor,
  getEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor
} from "../API/Factor";



const EmissionFactorDashboard = () => {
  const [emissionFactors, setEmissionFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFactor, setEditingFactor] = useState(null); 
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sources, setSources] = useState([]);
  const [pcgs, setPcgs] = useState([]);

useEffect(() => {
  const fetchEmissionFactors = async () => {
    try {
      setLoading(true);
      const factors = await getEmissionFactors();
      console.log("Fetched emission factors", factors);
      setEmissionFactors(factors);
    } catch (err) {
      console.error("Error loading emission factors:", err);
      setError("Failed to load emission factors.");
    } finally {
      setLoading(false);
    }
  };

  fetchEmissionFactors();
}, []);

  useEffect(() => {
  const fetchReferenceData = async () => {
    try {
      setLoading(true);
      const [unitsRaw, sectorsRaw, sourcesRaw, pcgsRaw] = await Promise.all([
        getMeasurementUnits(),
        getSectors(),
        getSources(),
        getAllPCGs(),
      ]);

      const units = unitsRaw.map(u => ({ id: u.unidadId, name: u.nombre }));
      const sectors = sectorsRaw.map(s => ({ id: s.sectorId, name: s.nombre }));
      const sources = sourcesRaw.map(s => ({ id: s.fuenteId, name: s.nombre }));
      const pcgs = pcgsRaw.map(p => ({ id: p.pcgId, name: p.nombre }));

      setMeasurementUnits(units);
      setSectors(sectors);
      setSources(sources);
      setPcgs(pcgs);
    } catch (err) {
      console.error(err);
      setError("Failed to load reference data");
    } finally {
      setLoading(false);
    }
  };

  fetchReferenceData();
}, []);

  const getUnitName = (id) => measurementUnits.find(u => u.id === id)?.name || "Unknown";
  const getSectorName = (id) => sectors.find(s => s.id === id)?.name || "Unknown";
  const getSourceName = (id) => sources.find(s => s.id === id)?.name || "Unknown";
  const getPcgName = (id) => pcgs.find(p => p.id === id)?.name || "Unknown";

  const filteredFactors = useMemo(() => {
  if (!searchTerm) return emissionFactors;

  const search = searchTerm.toLowerCase();

  return emissionFactors.filter((factor) => {
    return (
      (factor.name || "").toLowerCase().includes(search) ||
      (getUnitName(factor.unit) || "").toLowerCase().includes(search) ||
      (getUnitName(factor.unitCarbon) || "").toLowerCase().includes(search) ||
      (getSectorName(factor.sectoId) || "").toLowerCase().includes(search) ||
      (getSourceName(factor.sourceId) || "").toLowerCase().includes(search) ||
      (getPcgName(factor.pcgId) || "").toLowerCase().includes(search)
    );
  });
}, [emissionFactors, searchTerm]);

  
  

  const handleCreate = () => {
    setEditingFactor(null)
    setIsModalOpen(true)
  }

  const handleEdit = (factor) => {
  setEditingFactor(factor);  
  setIsModalOpen(true);
};

  const handleModalClose = () => {
  setIsModalOpen(false);
  setEditingFactor(null);
  };

  const handleDelete = (factor) => {
    setDeleteConfirmation(factor)
  }

  const confirmDelete = async () => {
  if (!deleteConfirmation) return

  try {
    await deleteEmissionFactor(deleteConfirmation.id)

    setEmissionFactors((prev) => prev.filter((f) => f.id !== deleteConfirmation.id))
    setDeleteConfirmation(null)
  } catch (error) {
    console.error("Error deleting emission factor:", error)
  }
}

  const handleModalSubmit = async (data) => {
  try {
    if (editingFactor) {
      const success = await updateEmissionFactor(data);
      if (success) {
        setEmissionFactors((prev) =>
          prev.map((f) => (f.id === editingFactor.id ? { ...f, ...data } : f))
        );
      }
    } else {
      const success = await createEmissionFactor(data);
      if (success) {
        setEmissionFactors((prev) => [...prev, data]);
      }
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error("Error saving emission factor:", error);
  }
};

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Emission Factors</h2>
        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="Search emission factors..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="create-btn" onClick={handleCreate}>
            Create New
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {loading ? (
          <div className="loading">Loading emission factors...</div>
        ) : (
          <div className="table-container">
            <table className="emission-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Primary Unit</th>
                  <th>Carbon Unit</th>
                  <th>Unit Value</th>
                  <th>Carbon Value</th>
                  <th>Emission Factor</th>
                  <th>PCG</th>
                  <th>Sector</th>
                  <th>Source</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFactors.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="no-results">
                      {searchTerm ? "No emission factors match your search." : "No emission factors found."}
                    </td>
                  </tr>
                ) : (
                  filteredFactors.map((factor) => (
                    <tr key={factor.id}>
                      <td>{factor.name}</td>
                      <td>{factor.unit}</td>
                      <td>{factor.unitCarbono}</td>  
                      <td>{factor.valueUnit}</td>
                      <td>{factor.valueEmision}</td>
                      <td>{(factor.valueUnit / factor.valueEmision)}</td>
                      <td>{factor.pcgNombre}</td>  
                      <td>{getSectorName(factor.sector)}</td>
                      <td>{factor.source}</td> 
                      <td>
                        <div className="actions-cell">
                          <button className="edit-btn" onClick={() => handleEdit(factor)}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => handleDelete(factor)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <EmissionFactorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingFactor={editingFactor}
        measurementUnits={measurementUnits}
        sectors={sectors}
        sources={sources}
        pcgs={pcgs}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmation(null)}>
          <div className="confirmation-dialog">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete "{deleteConfirmation.name}"?
              <br />
              This action cannot be undone.
            </p>
            <div className="confirmation-actions">
              <button className="cancel-btn" onClick={() => setDeleteConfirmation(null)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmissionFactorDashboard

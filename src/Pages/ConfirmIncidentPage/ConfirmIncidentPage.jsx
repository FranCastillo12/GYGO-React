import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { appsettings } from "../../settings/appsettings";


export const ConfirmIncidentPage = () => {

    const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Marcando...");
  const [error, setError] = useState(null);

  const incident_id = searchParams.get("id");
  useEffect(()=>{
    const markAsRead = async() =>{
        try{
            const response = await fetch(`${appsettings.apiUrl}emissionsIncident/mark-as-read/${incident_id}`,{
                method: "PATCH",
                credentials: "include"
            });
            if(response.ok){
                setStatus("Incidente marcado como leído correctamente.");
            }else{
                const data = await response.json();
                setError(data.message || "Error marcando el incidente");
            }
        }catch(err){
            setError("Error de red o servidor");
        }
    }
     if (incident_id) {
      markAsRead();
    } else {
      setError("ID de incidente inválido.");
    }
  }, [incident_id])

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Confirmación de Incidente</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{status}</p>
      )}
    </div>
  )

} 
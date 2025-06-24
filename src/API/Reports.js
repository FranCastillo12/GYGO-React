import { appsettings } from "../settings/appsettings";

export async function getReportCompanies({
  status = null,
  idService = null,
} = {}) {
  const params = new URLSearchParams();

  if (status !== null) {
    params.append("status", status);
  }
  if (idService !== null) {
    params.append("idService", idService);
  }

  const url = `${appsettings.apiUrl}Reports/AllCompanies${params.toString() ? `?${params}` : ""}`;
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function GetServices() {
  const response = await fetch(`${appsettings.apiUrl}Services/GetServices`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

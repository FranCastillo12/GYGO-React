import { appsettings } from "../settings/appsettings";


export async function GetIncidentsHistory() {
    const response = await fetch(`${appsettings.apiUrl}EmissionsIncident/EmissionsIncident`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return [];
    }
}
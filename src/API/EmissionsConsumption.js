import {appsettings} from '../settings/appsettings'

export async function GetCurrentConsumption() {
  const response = await fetch(`${appsettings.apiUrl}EmissionsConsumption/CurrentConsumption`, {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}



export async function GetAnnualConsumption() {
  const response = await fetch(`${appsettings.apiUrl}EmissionsConsumption/AnnualConsumption`, {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}


export async function GetConsumptionHistory() {
      const response = await fetch(`${appsettings.apiUrl}EmissionsConsumption/ConsumptionHistory`, {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}
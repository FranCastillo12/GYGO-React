import { appsettings } from "../../settings/appsettings";

export async function getMonthlyConsumptions(id){
    const response = await fetch(`${appsettings.apiUrl}MonthlyConsumption/GetMonthlyByConsumption?consumption=${id}`,
        {
      method: "GET",
      credentials: "include",
    }
    ); //7217 puerto
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return [];
    }
}

export async function addMonthlyConsumption(monthlyConsumptionDTO){
    const response = await fetch(`${appsettings.apiUrl}MonthlyConsumption/Create`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monthlyConsumptionDTO)
        });
    
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const error = await response.text();
            throw new Error(error);
        }
}

export async function UpdateMonthlyConsumption(monthlyDTO){
    const response = await fetch(`${appsettings.apiUrl}MonthlyConsumption/Update`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monthlyDTO)
        });
    
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const error = await response.text();
            throw new Error(error);
        }
}

export async function GetYearsByGroup(){
    const response = await fetch(`${appsettings.apiUrl}MonthlyConsumption/ConsumptionsYears`,{
        method: 'GET',
        credentials: "include"
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        const error = await response.text();
            throw new Error(error);
    }
}
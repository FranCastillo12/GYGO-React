import { appsettings } from "../../settings/appsettings";

export async function getMonthlyHistory(id){
    const response = await fetch(`${appsettings.apiUrl}MonthlyConsumption/GetHistory?consumptionId=${id}`,
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
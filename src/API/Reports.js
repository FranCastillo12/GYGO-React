import {appsettings} from '../settings/appsettings'


export async function getReportCompanies() {
    const response = await fetch(`${appsettings.apiUrl}Reports/AllCompanies`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}

export async function GetServices() {
    const response = await fetch(`${appsettings.apiUrl}Services/GetServices`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}




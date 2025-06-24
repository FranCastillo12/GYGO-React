import {appsettings} from '../settings/appsettings'

export async function GetServices() {
    const response = await fetch(`${appsettings.apiUrl}Services/GetServices`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}
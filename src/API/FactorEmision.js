import { appsettings } from "../settings/appsettings";

export async function getFactoresEmision(){
    const response = await fetch(`${appsettings.apiUrl}Factor/getAll`,
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

export async function addFactorEmision(factorDTO){
    const response = await fetch(`${appsettings.apiUrl}Factor/create`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(factorDTO)
        });
    
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const error = await response.text();
            throw new Error(error);
        }
}
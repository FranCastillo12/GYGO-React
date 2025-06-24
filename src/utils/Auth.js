import { jwtDecode } from "jwt-decode";


export function getUserFromToken(token){
    try {
        const decoded = jwtDecode(token);

        const nameIdClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

        const userId = decoded[nameIdClaim] || decoded["userId"];

        if(!userId){
            throw new Error("No se encontró el userId en el token");
        }
        return userId;
    } catch (error) {
        console.error("Error al decodificar el token: ",error.message);
        return null;
    }
}

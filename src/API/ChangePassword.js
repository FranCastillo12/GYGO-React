import { appsettings } from "../settings/appsettings";

export async function PostChangePassword(UserDTO){

    try{

        const response = await fetch(`${appsettings.apiUrl}user/ChangePassword`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserDTO)
    });
     if (response.ok) {
        return { success: true };
    }
      const data = await response.json();
       
       return { success: false, error: data };

    }catch (error) {
    return { success: false, error: error.message };
    }

}
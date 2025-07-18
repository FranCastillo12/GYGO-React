import { appsettings } from "../settings/appsettings";


export  async function verify2FACode(tempToken, code) {
  console.log(tempToken);
  console.log(code);

  try {
    const response = await fetch(`${appsettings.apiUrl}Auth/verify-2FA`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tempToken, code }),
    });
    const data = await response.json();

    console.log(data);

    if (response.ok) {
     
      return { success: true,rol:data.rol };
    } else {
      return { success: false, error: data.error };
    }
  } catch (err) {
    return { success: false, error: 'Request failed.' };
  }
}

export  async function loginUser(email, password) {
  try {

    const response = await fetch(`${appsettings.apiUrl}Auth/login`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password}),
    });

    const data = await response.json();

    
    

    if (!response.ok) {
      console.error("Detalles del error:", errorData, "Código:", response.status);
      return { success: false, error: data.error };
    }

    if (data.message === "2FA required") {
      return {
        success: true,
        isTwoFactor: true,
        tempToken: data.tempToken,
        rol: data.rol,
        id: data.id,
        groupId: data.grupo ,
      };
    }

    return { success: true, isTwoFactor: false,rol: data.rol,id:data.id, groupId: data.grupo };
  } catch (err) {
    return { success: false, error: 'Login request failed.' };
  }
}


//Probar
export  async function sendInvite(email) {

  try {
    const response = await fetch(`${appsettings.apiUrl}Admin/sendInvite`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify(email)
    });

    if (response.ok) {
      return { success: true };
    }
    
    const data = await response.json();
    return { success: false, error: data };
  } catch (error) {
    return { success: false, error: 'Error en la solicitud.' };
  }
}

export async function registerUser(inviteToken, { email, username, password }) {
  
  const url = inviteToken ? `User/register/${inviteToken}` : 'User/Register';


  try {
    const response = await fetch(`${appsettings.apiUrl}${url}`, {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      return { success: true };
    }

    const data = await response.json();
    return { success: false, error: data.error || 'Registro fallido' };
  } catch {
    return { success: false, error: 'Error al comunicarse con el servidor' };
  }
}

async function fetchGroupId() {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        console.error('Token not found in cookies');
        return;
    }

    try {
        const response = await fetch(`${appsettings.apiUrl}/getGroupId?adminToken=${encodeURIComponent(token)}`);
        const groupId = await response.json();
        console.log('Group ID:', groupId);
        return groupId;
    } catch (error) {
        console.error('Error fetching group ID:', error);
    }
}

export async function getCurrentUser(){
  const response = await fetch(`${appsettings.apiUrl}User/UserProfile`,
        {
      method: "GET",
      credentials: "include",
    }
    ); 
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return [];
    }    
}

export async function logoutSesion() {
  console.log("api");
  const response = await fetch(`${appsettings.apiUrl}Auth/logout`, {
    method: "POST",
    credentials: "include", 
  });

  if (response.ok) {
    return true; 
  } else {
    return false;
  }
}

export async function refreshLogin() {
    try {
        const response = await fetch(`${appsettings.apiUrl}auth/refresh-login`, {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Failed to refresh login:", data);
            return null;
        }

        console.log("Refreshed login successfully:", data);
        return data;
    } catch (error) {
        console.error("Error calling refresh-login:", error);
        return null;
    }
}

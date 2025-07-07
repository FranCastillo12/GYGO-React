import { appsettings } from "../settings/appsettings";



export  async function verify2FACode(tempToken, code) {
  try {
    

    const response = await fetch(`${appsettings.apiUrl}Auth/verify-2FA`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tempToken, code }),
    });
    const data = await response.json();

    if (response.ok) {
  
      return { success: true };
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
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data.rol);


    if (!response.ok) {
      return { success: false, error: data.error || data.message, rol: data.rol };
    }

  

    if (data.message === "2FA required") {
      return {
        success: true,
        isTwoFactor: true,
        tempToken: data.tempToken,
      };
    }
    
    return {
      success: true,
      isTwoFactor: false,
      rol: data.rol,
    };

  } catch (error) {
    console.error("Error in loginUser:", error);
    return { success: false, error: "Network or server error" };
  }
}

export  async function sendInvite(email) {

  try {
    const response = await fetch(`http://localhost:5135/sendInvite`, {
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
  

  // const url = inviteToken ? `/api/register/${inviteToken}` : 'User/Register';

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
        const response = await fetch(`http://localhost:5135/getGroupId?adminToken=${encodeURIComponent(token)}`);
        const groupId = await response.json();
        console.log('Group ID:', groupId);
        return groupId;
    } catch (error) {
        console.error('Error fetching group ID:', error);
    }
}
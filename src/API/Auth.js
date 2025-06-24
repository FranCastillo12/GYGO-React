export  async function verify2FACode(tempToken, code) {
  try {
    const response = await fetch('http://localhost:5135/api/Auth/verify-2FA', {
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

export async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:5135/api/Auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || data.message };
    }

    console.log(data);

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
  
  const url = inviteToken ? `http://localhost:5135/api/Auth/register/${inviteToken}` : 'http://localhost:5135/api/Auth/register';

  try {
    const response = await fetch(url, {
      method: 'POST',
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
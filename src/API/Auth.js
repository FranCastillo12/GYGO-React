export  async function verify2FACode(tempToken, code) {
  try {
    const response = await fetch('/api/auth/verify-2fa', {
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
    const response = await fetch('http://localhost:5135/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error };
    }

    if (data.isTwoFactor) {
      return {
        success: true,
        isTwoFactor: true,
        tempToken: data.tempToken,
      };
    }

    return { success: true, isTwoFactor: false };
  } catch (err) {
    return { success: false, error: 'Login request failed.' };
  }
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export  async function sendInvite(email) {
  const adminToken = getCookie('Token');

  if (!adminToken) {
    return { success: false, error: 'Token de administrador no encontrado.' };
  }

  try {
    const response = await fetch(`/send-invite/${adminToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
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
  
  const url = inviteToken ? `/api/register/${inviteToken}` : '/api/register';

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
import { appsettings } from "../settings/appsettings";

export async function PostAddGroup(newGroup, correogrupo, selectedService) {
  try {
    const response = await fetch(`${appsettings.apiUrl}Group/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //autorizacion bearer / token
      },
      body: JSON.stringify({
        nombre: newGroup,
        correo: correogrupo,
        idService: selectedService,
      }),
    });

  if (response.ok) {
        return { success: true };
    }
      const data = await response.json();
       
       return { success: false, error: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

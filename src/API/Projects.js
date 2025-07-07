import { appsettings } from "../settings/appsettings";

//API para llamar los proyectos por grupo
export async function AddProject(projectData) {
  try {
    console.log(projectData);
    const response = await fetch(`${appsettings.apiUrl}Projects/AddProject`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error al agregar proyecto: ${response.status} - ${errorText}`
      );
      return false;
    }

    return true;

   
  } catch (error) {
    console.error("AddProject error:", error);
    throw error;
  }
}

export async function UpdateProject(projectData) {
  try {
    console.log(projectData);
    const response = await fetch(
      `${appsettings.apiUrl}Projects/UpdateProject`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error al agregar proyecto: ${response.status} - ${errorText}`
      );
      return false;
    }

    const data = await response.json();
    console.log(data);
    return true;
  } catch (error) {
    console.error("AddProject error:", error);
    throw error;
  }
}
// API para eliminar proyectos
export async function DProject(projectID) {
  try {
    const response = await fetch(
      `${appsettings.apiUrl}Projects/DeleteProject?projectID=${projectID}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      return true;
    } else {
      console.error("Error al eliminar el proyecto:", response.status);
      return false;
    }
  } catch (error) {
    console.error("DProject error:", error);
    throw error;
  }
}

//API para llamar los proyectos por grupo
export async function getProjects() {
  const response = await fetch(`${appsettings.apiUrl}Projects/AllProjects`, {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

//API para los projectos pendientes
export async function getProjectsbyStatus(status) {
  const response = await fetch(
    `${appsettings.apiUrl}Projects/status/${status}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

//API para obtener los proyectos por fechas
export async function getProjectsByDates(startDate, endDate) {
  const response = await fetch(
    `${appsettings.apiUrl}Projects/dates?Start_date=${startDate}&End_date=${endDate}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

//API para obtener los proyectos y tareas para el pdf
export async function getProjectsPDF() {
  const response = await fetch(`${appsettings.apiUrl}Projects/CreatePdf`, {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}
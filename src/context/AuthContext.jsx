import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [hasPaidGroupAdminAccess, setHasPaidGroupAdminAccess] = useState(false);

  const login = (newRole, id) => {
    console.log("Guardando rol en contexto:", newRole);
    setRole(newRole);
    setUserId(id);
    localStorage.setItem("userRole", newRole);
    localStorage.setItem("userId", id);
    
  const [userId, setUserId] = useState(() => {
      return localStorage.getItem("userId") || null;
    });

  const [userGroup, setUserGroup] = useState(() => {
    return localStorage.getItem("userGroup") || null;
  });
  

  const login = (newRole,id,group) => {
    console.log("Guardando rol en contexto:", newRole); // <-- Debug
    setRole(newRole);
    setUserId(id);
    setUserGroup(group);

    localStorage.setItem("userRole", newRole); // Guarda rol
    localStorage.setItem("userId", id); // Guarda userId
    localStorage.setItem("userGroup", group); // Guarda userGroup
  };

  const logoutRol = () => {
    setRole(null);
    setUserId(null);
    setUserGroup(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userGroup");
  };

  const refreshUserData = async () => {
    const data = await refreshLogin();
    if (data?.user?.role && data?.user?.id) {
      setRole(data.user.role);
      setUserId(data.user.id);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id);
    } else {
      console.error("No se pudo refrescar el usuario:", data);
    }
  };

  const markUserAsPaid = () => {
    setHasPaidGroupAdminAccess(true);
  };

  // Nueva función para actualizar el rol directamente
  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        userId,
        hasPaidGroupAdminAccess,
        login,
        logoutRol,
        refreshUserData,
        markUserAsPaid,
        updateRole, // agregamos la función acá
      }}
    >
    <AuthContext.Provider value={{ role, userId, userGroup,login, logoutRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

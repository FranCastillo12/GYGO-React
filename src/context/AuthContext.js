import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  

  const login = (newRole) => {
    console.log("Guardando rol en contexto:", newRole); // <-- Debug
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
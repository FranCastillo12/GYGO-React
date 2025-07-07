import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import ProjectPage from "./Pages/ProjectsPage";
import { HomePage } from "./Pages/HomePage";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Icon from "@mui/material/Icon";

const ProtectedElement = ({ children, allowedRoles }) => {
  const { role } = useAuth();
  console.log("Role desde useAuth:", role);
  if (!role) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <ProtectedElement>
        <Dashboard />
      </ProtectedElement>
    ),
    roles: ["admin", "user", "GA","DEV"],
  },
    {
    type: "collapse",
    name: "Projects",
    key: "projects",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/projects",
    component: (
      <ProtectedElement>
        <ProjectPage />
      </ProtectedElement>
    ),
    roles: ["GA","DEV"],
  },
  //Ruta para el login
  {
    route: "/login",
    component: <Login />,
  },
  //Ruta para HomePage
  {
    route: "/",
    component: <HomePage />,
  },
];

export const getRoutes = (role) => {
  return routes.filter((route) => {
    if (!route.roles) return true;
    if (!role) return false;
    return route.roles.includes(role);
  });
};

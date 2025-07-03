import React, { useState } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./AuthContext";
import { Sidebar } from "./components/PrivateHeader";
import { PublicHeader } from "./components/PublicHeader";

import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
  useLocation
} from "react-router-dom";
import { DashboardGroupPage } from "./Pages/DashboardGroupPage";
import { ProjectsPage } from "./Pages/ProjectsPage";
import { ProjectPage1 } from "./Pages/ProjectPage1";
import { ConsumptionPage } from "./Pages/ConsumptionPage";
import { MonthlyConsumptionPage } from "./Pages/MonthlyConsumPage";
import { AddConsumptionPage } from "./Pages/AddConsumptionPage";
import { MonthlyHistoryPage } from "./Pages/MonthlyHistoryPage";
import { AddMonthlyConsumPage } from "./Pages/AddMonthlyConsmPage";
import { UpdateMonthlyConsumPage } from "./Pages/UpdateMonthlyConsumPage";
import { UpdateConsumptionPage } from "./Pages/UpdateConsumptionPage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import { ReportCompanies } from "./Pages/ReportCompaniesPage";
import { Register } from "./Pages/Register";
import { DashboardConsumo } from "./Pages/ConsumoPage";
import { SendInvite } from "./Pages/SendInvite";
import { Verify2FA } from "./pages/Verify2FA";
import { ChatWindow } from "./Pages/ChatWindow";
import AdminEmisionFactor from "./Pages/AdminEmisionFactor";
import AdminUserDashboard from "./Pages/AdminUserDashboard";
import {HomePage} from "./Pages/HomePage";
import "../src/App.css";

import Login from "./Pages/Login";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "./assets/theme"; // tu nuevo archivo de tema
function App() {
  return (
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function Layout() {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const hideNavbar = ["/Login", "/Verify2FA"].includes(location.pathname);
  console.log("Auth:", isAuthenticated);
  console.log("Path:", location.pathname);
  console.log("Rol actual:", role);

  return (
    <>
    


       <div style={{ display: "flex" }}>
     
      <main style={{ flexGrow: 1, padding: "1rem" }}>
          {/* Mostrar PrivateHeader solo si el usuario está autenticado y no está en las rutas ocultas */}
      {isAuthenticated && !hideNavbar && <Sidebar />}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SendInvite" element={<SendInvite />} />
        <Route path="/Verify2FA" element={<Verify2FA />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
          <Route path="/ProjectsPage" element={<ProjectsPage />} />
          <Route path="/ProjectPage1" element={<ProjectPage1 />} />

          <Route path="/AddGroup" element={<AddGroupSAPage />} />
          <Route path="/ChangePassword" element={<ChangePasswordPage />} />
          <Route path="/Chat" element={<ChatWindow />} />
          <Route path="/ReportCompanies" element={<ReportCompanies />} />
          <Route path="/AdminUserDashboard" element={<AdminUserDashboard />} />
          <Route path="/Admin/users" element={<AdminUserDashboard />} />
          <Route path="/Admin/factors" element={<AdminEmisionFactor />} />
          <Route path="/consumption" element={<ConsumptionPage />} />
          <Route path="/consumption/add" element={<AddConsumptionPage />} />
          <Route
            path="/consumption/edit/:id"
            element={<UpdateConsumptionPage />}
          />
          <Route
            path="/consumption/monthly/:id"
            element={<MonthlyConsumptionPage />}
          />
          <Route
            path="/consumption/monthly/add/:consumptionId"
            element={<AddMonthlyConsumPage />}
          />
          <Route
            path="/consumption/monthly/edit/:consumptionId/:monthlyId"
            element={<UpdateMonthlyConsumPage />}
          />
          <Route
            path="/consumption/monthly/history/:id"
            element={<MonthlyHistoryPage />}
          />
        </Route>
      </Routes>
      </main>
    </div>




    </>
  );
}

export default App;

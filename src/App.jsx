import { useState } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./AuthContext";
import { PrivateHeader } from "./components/PrivateHeader";
import { PublicHeader } from "./components/PublicHeader";

import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import { DashboardGroupPage } from "./Pages/DashboardGroupPage";
import { ProjectsPage } from "./Pages/ProjectsPage";
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
import { SendInvite } from "./Pages/SendInvite";
import { Verify2FA } from "./Pages/Verify2Fa";
import { DashboardConsumo } from "./Pages/ConsumoPage";
import { ChatWindow } from "./Pages/ChatWindow";
import AdminUserDashboard from "./Pages/AdminUserDashboard";
import {HomePage} from "./Pages/HomePage";
import "../src/App.css";

import Login from "./Pages/Login";
import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const { isAuthenticated , role} = useAuth();
  const location = useLocation();

  const hideNavbar = ["/Login", "/Verify2FA"].includes(location.pathname);
  console.log("Auth:", isAuthenticated);
  console.log("Path:", location.pathname);
  console.log('Rol actual:', role);
  return (
    <>
      {/* Mostrar PrivateHeader solo si el usuario está autenticado y no está en las rutas ocultas */}
      {isAuthenticated && !hideNavbar && <PrivateHeader />}

      <Routes>
        //Ruta predeterminada del sistema
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SendInvite" element={<SendInvite />} />
        <Route path="/Verify2FA" element={<Verify2FA />} />

        {/*Rutas protegidas*/}
        <Route element={<PrivateRoute />}>
          <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
          <Route path="/ProjectsPage" element={<ProjectsPage />} />
          <Route path="/AddGroup" element={<AddGroupSAPage />} />
          <Route path="/ChangePassword" element={<ChangePasswordPage />} />
          <Route path="/ConsumoPage" element={<DashboardConsumo />} />
          <Route path="/Chat" element={<ChatWindow />} />
          <Route path="/ReportCompanies" element={<ReportCompanies />} />
          <Route path="/AdminUserDashboard" element={<AdminUserDashboard />} />
          <Route path="/consumption" element={<ConsumptionPage/>} />
          <Route path="/consumption/monthly/:id" element={<MonthlyConsumptionPage/>} />
          <Route path="/consumption/edit/:id" element={<UpdateConsumptionPage/>} />
          <Route path="/consumption/monthly/history/:id" element={<MonthlyHistoryPage/>} />
          <Route path="/consumption/add" element={<AddConsumptionPage/>} />
          <Route path="/consumption/monthly/edit/:consumptionId/:monthlyId" element={<UpdateMonthlyConsumPage/>} />
          <Route path="/consumption/monthly/add/:consumptionId" element={<AddMonthlyConsumPage/>} />
          </Route>
      </Routes>
    </>
  );
}

export default App;

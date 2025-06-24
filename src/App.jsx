import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink,Navigate,useLocation  } from "react-router-dom";
import { DashboardGroupPage } from './Pages/DashboardGroupPage'
import { ProjectsPage } from "./Pages/ProjectsPage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import {ReportCompanies} from "./Pages/ReportCompaniesPage"
import {Register} from "./Pages/Register"
import {SendInvite} from "./Pages/SendInvite"
import { Verify2FA } from './pages/Verify2FA';
import { ChatWindow } from "./Pages/ChatWindow";
import AdminEmisionFactor from "./Pages/AdminEmisionFactor"
import AdminUserDashboard from "./Pages/AdminUserDashboard";
import HomePage from "./Pages/HomePage";
import "../src/App.css";
import Login from "./Pages/Login";
import "./App.css";
import { NavBar } from "./components/NavBar";


function App() {
  return (
    <BrowserRouter>
      <Layout />
      <HomePage />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavbar = ["/Login", "/Verify2FA"].includes(location.pathname);


  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Navigate to="/Login" replace />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/SendInvite" element={<SendInvite />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
        <Route path="/Admin/users" element={<AdminUserDashboard />} />
        <Route path="/ProjectsPage" element={<ProjectsPage />} />
        <Route path="/AddGroup" element={<AddGroupSAPage />} />
        <Route path="/ChangePassword" element={<ChangePasswordPage />} />
        <Route path="/Chat" element={<ChatWindow/>} />
        <Route path="/Admin/factors" element={<AdminEmisionFactor/>}/>
          {/*Rutas de los reportes*/}
        <Route path="/ReportCompanies" element={<ReportCompanies />} />
      </Routes>
    </>
  );
}


export default App;
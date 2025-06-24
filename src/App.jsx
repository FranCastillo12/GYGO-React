import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink,Navigate,useLocation  } from "react-router-dom";
import { DashboardGroupPage } from './Pages/DashboardGroupPage'
import { ProjectsPage } from "./Pages/ProjectsPage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import {ReportCompanies} from "./Pages/ReportCompaniesPage"
import {Register} from "./Pages/Register"
import {SendInvite} from "./Pages/SendInvite"
import {Verify2FA} from "./Pages/Verify2Fa"
import Header  from "./components/Header";
import { ChatWindow } from "./Pages/ChatWindow";
import HomePage from "./Pages/HomePage";
import Contactenos from "./Pages/Contactenos";
import "../src/App.css";
import {DashboardConsumo} from "./Pages/ConsumoPage"





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
  const location = useLocation();


  const hideNavbar = ["/Login", "/Verify2FA"].includes(location.pathname);


  return (
    <>
    
      {!hideNavbar && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SendInvite" element={<SendInvite />} />
        <Route path="/Verify2FA" element={<Verify2FA />} />
        <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
        <Route path="/ProjectsPage" element={<ProjectsPage />} />
        <Route path="/AddGroup" element={<AddGroupSAPage />} />
        <Route path="/ChangePassword" element={<ChangePasswordPage />} />
        <Route path="/Chat" element={<ChatWindow/>} />
        <Route path="/Contactenos" element={<Contactenos />} />
        
          {/*Rutas de los dashboards*/}
          <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
          <Route path="/ProjectsPage" element={<ProjectsPage />} />
          <Route path="/AddGroup" element={<AddGroupSAPage />} />
          <Route path="/ChangePassword" element={<ChangePasswordPage />} />
        <Route path="/ConsumoPage" element={<DashboardConsumo />} />

          {/*Rutas de los reportes*/}
        <Route path="/ReportCompanies" element={<ReportCompanies />} />
      </Routes>
    </>
  );
}


export default App;
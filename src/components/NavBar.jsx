import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import { DashboardGroupPage } from "../Pages/DashboardGroupPage";
import { ProjectsPage } from "../Pages/ProjectsPage";
import { ChangePasswordPage } from "../Pages/ChangePasswordPage";
import { AddGroupSAPage } from "../Pages/AddGroupSAPage";
import Login from "../Pages/Login";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export const NavBar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg px-3"
        style={{ height: "70px", width: "100%" }}
      >
        <div className="container-fluid d-flex align-items-center">
          {/* Logo */}

          <a href="/DashboardGroupPage" className="me-4">
            <img
              src="/src/assets/LogoBlanco.png"
              alt="Logo"
              style={{
                height: "100%",
                maxHeight: "150px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </a>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link " to="/ProjectsPage">
                  Proyectos
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
};

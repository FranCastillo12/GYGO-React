import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Dashboard,
  Folder,
  Assessment,
  ElectricBolt,
  ContactMail,
} from "@mui/icons-material";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/DashboardGroupPage" },
  { text: "Proyectos", icon: <Folder />, path: "/ProjectsPage" },
  { text: "Reportes", icon: <Assessment />, path: "/ReportCompanies" },
  { text: "Consumos", icon: <ElectricBolt />, path: "/ConsumoPage" },
  { text: "Contactos", icon: <ContactMail />, path: "#" },
];

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "#fff",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center", padding: "1rem" }}>
        <img
          src="/src/assets/Logo.png"
          alt="Green On"
          style={{ height: "40px", marginRight: "0.5rem" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Green On</span>
      </Toolbar>

      <List>
  {menuItems.map((item, index) => (
    <ListItemButton
      key={index}
      component={NavLink}
      to={item.path}
      sx={{
        color: "inherit",
        "&.active": {
          backgroundColor: "#35355a",
        },
      }}
    >
      <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItemButton>
  ))}
</List>
    </Drawer>
  );
};


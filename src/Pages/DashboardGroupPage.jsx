import React, { useEffect, useState } from 'react';
import "../styles/DashboardGPage.css";
import { ModernDashboardCards } from '../components/DashboardsCards';
import { Typography, Box } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { appsettings } from '../settings/appsettings';


export const DashboardGroupPage = () => {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${appsettings.apiUrl}User/UserProfile`, {
        method: "GET",
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setUsername(data.username)
      }
    }
    fetchData()
  }, [])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#688d7d",
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header con bienvenida moderna */}
        <Box sx={{ mb: 4, textAlign: "center", color: "#ffffff" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ¡Hola, {username ? username : "Usuario"}! 👋
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
            Bienvenido de nuevo a tu dashboard
          </Typography>
        </Box>

        <ModernDashboardCards />
      </Box>
    </Box>
  )
}

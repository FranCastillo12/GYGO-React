import React, { useEffect, useState } from 'react';
import "../styles/DashboardGPage.css";
import { DashboardsCards } from '../components/DashboardsCards';
import { Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { appsettings } from '../settings/appsettings';


export const DashboardGroupPage = () => {

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${appsettings.apiUrl}User/UserProfile`, {
                method: "GET",
                credentials: "include",
            }
            );
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className='container mt-5'>
                <Typography variant='h4' sx={{ fontWeight: 'medium', color: 'primary.main', mb: 2 }}>
                    🌿 ¡Hola, {username ? username : 'Usuario'} Bienvenido de nuevo.
                </Typography>
                <DashboardsCards />
            </div>
        </>
    )
}

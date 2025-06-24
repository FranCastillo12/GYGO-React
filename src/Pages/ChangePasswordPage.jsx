import React, { useEffect, useState } from 'react'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import { jwtDecode } from 'jwt-decode';
import { Box, Typography } from '@mui/material';


export const ChangePasswordPage = () => {

  const [username, setUsername] = useState("");

  useEffect(()=>{
      const fetchUsername = async( ) => {
        try {
          const response = await fetch("http://localhost:7217/api/User/UserProfile",
            {
              method: "GET",
              credentials: "include"
            }
          );
          if(!response.ok){
            throw new Error("Error al traer la información del usuario.")
          }

          const data = await response.json();
          setUsername(data.username);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      fetchUsername();
  }, [])

  
  return (
    <div className='justify-content-center align-items-center my-4'>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' >Cambiar contraseña | {username || "Usuario"}  </Typography>
      </Box>
      <hr />
      <ChangePasswordForm></ChangePasswordForm>
    </div>
  )
}

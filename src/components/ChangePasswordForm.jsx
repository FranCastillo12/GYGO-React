import React, { useState } from 'react'
import {
  Box, OutlinedInput, IconButton, InputAdornment, TextField,
  Typography, CircularProgress, Button, FormControl, InputLabel
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Swal from 'sweetalert2';
import { PostChangePassword } from '../API/ChangePassword';

export const ChangePasswordForm = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const UserDTO = {
      UserId: 'getuserid',
      CurrentPassword: currentPassword,
      NewPassword: newPassword
    }
    try {
      const result = await PostChangePassword(UserDTO);
      setLoading(false);

      await Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: result,
        confirmButtonText: 'Ok'
      });

      navigate('/DashboardGroupPage');

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, mt: 5, display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 600, mx: 'auto' }}>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña Actual</InputLabel>
          <OutlinedInput
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'Ocultar la contraseña' : 'Mostrar la contraseña'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña actual"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password2">Nueva Contraseña</InputLabel>
          <OutlinedInput
            onChange={(e) => setNewPassword(e.target.value)}
            required
            id="outlined-adornment-password2"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'Ocultar la contraseña' : 'Mostrar la contraseña'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Nueva Contraseña"
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained" color="primary" disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Actualizar Contraseña'}
        </Button>
      </Box>
    </>
  )
}

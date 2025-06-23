import React from 'react';
import { Button } from '@mui/material';
import Login from "../Pages/Login";
import { useNavigate } from 'react-router-dom';


function SignInButton() {

  const navigate = useNavigate();
  const handleClick = () => {
    console.log('Sign In button clicked');
    navigate("/Login");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        sx={{
          borderRadius: '12px',
          padding: '8px 20px',
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#44af69'
          }
        }}
        onClick={handleClick}
      >
        Iniciar Sesión
      </Button>
    </div>
  );
}

export default SignInButton;
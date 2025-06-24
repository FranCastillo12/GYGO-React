import React, { useState, useEffect } from 'react'
import { getDashboardGroup } from '../API/DashboardGroup';
import { Box, Card, Grid, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



export const DashboardsCards = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardGroup();
      console.log("DASHBOARD DATA:", result);
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) {
    return <CircularProgress></CircularProgress>
  }

  const { groupName, projects, consumptions, hasProjects, hasConsumption } = data;

  return (
    <Box>
      <Grid container spacing={4} sx={{ p: 4, width: "100%", mt: 4 }}>
        {/* info general grupo */}
        <Grid width="100%">
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent className='card-content-dg'>
              <Typography variant="h5" gutterBottom>Grupo: {groupName}</Typography>
              <hr />
              <Grid container spacing={2}>
                <Grid size={4}>
                  <Button variant="contained" sx={{
                    mt: 2,
                    backgroundColor: '#388e3c',
                    '&:hover': { backgroundColor: '#2e7d32' },
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}  >
                    Ver Consumo
                  </Button>
                </Grid>
                <Grid size={4}>
                  <Button variant="contained" sx={{
                    mt: 2,
                    backgroundColor: '#388e3c',
                    '&:hover': { backgroundColor: '#2e7d32' },
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}  >
                    Ver información general
                  </Button>
                </Grid>
                <Grid size={4}>
                  <Button variant="contained" sx={{
                    mt: 2,
                    backgroundColor: '#388e3c',
                    '&:hover': { backgroundColor: '#2e7d32' },
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}  >
                    Ver Proyectos
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* consumo & reportes */}
        <Grid size={6}>
          <Grid container spacing={4} >

            <Grid size={12}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent className='card-content-dg'> {/*Consumo */}
                  <Typography variant="h6" gutterBottom>Resumen de consumo</Typography>
                  {hasConsumption ? (
                    <Box component="ul" sx={{ pl: 3 }}>
                      {consumptions.map((c) => (
                        <li key={c.ID}>
                          <Typography variant="body2">
                            <strong>Factor: </strong>{c.Factor} | <strong>Unidad: </strong>{c.Unidad}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No hay consumos registrados...
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={12}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent className='card-content-dg'>
                  <Typography variant="h6" gutterBottom>Reportes</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Accede a los reportes de la empresa
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Ver reportes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* proyectos */}
        <Grid size={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent className='card-content-dg' sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Proyectos del grupo</Typography>
              {hasProjects ? (
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                  <Carousel
                    indicators={true}
                    nextIcon={<span aria-hidden="true" className='carousel-control-next-icon' />}
                    prevIcon={<span aria-hidden="true" className='carousel-control-prev-icon'></span>}
                    className='custom-carousel'
                  >
                    {projects.map((project) => (
                      <Carousel.Item key={project.id}>
                        <Box sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="subtitle1">{project.name}</Typography>
                          <Typography variant="body2">{project.description}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(project.fechaInicio).toLocaleDateString()} - {new Date(project.fechaFinal).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Box>
              ) : (
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay proyectos en curso.
                  </Typography>
                </Box>)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )

}

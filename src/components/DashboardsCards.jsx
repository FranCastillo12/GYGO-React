import React, { useState, useEffect } from 'react'
import { getDashboardGroup } from '../API/DashboardGroup';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
} from "@mui/material"
import {
  TrendingUp,
  Assessment,
  Folder,
  CalendarToday,
  Timeline,
  Speed,
  Group,
  ArrowForward,
  PlayArrow,
  CheckCircle,
  Schedule,
  MoreVert,
} from "@mui/icons-material"
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



export const ModernDashboardCards = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardGroup()
      console.log("DASHBOARD DATA:", result)
      setData(result)
    }
    fetchData()
  }, [])

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Box textAlign="center" color="#ffffff">
          <CircularProgress size={60} thickness={4} sx={{ color: "#ffffff", mb: 2 }} />
          <Typography>Cargando dashboard...</Typography>
        </Box>
      </Box>
    )
  }

  const { groupName, projects, consumptions, hasProjects, hasConsumption } = data

  // Función para obtener el estado del proyecto
  const getProjectStatus = (fechaInicio, fechaFinal) => {
    const now = new Date()
    const inicio = new Date(fechaInicio)
    const final = new Date(fechaFinal)

    if (now < inicio) {
      return {
        status: "Próximo",
        color: "#b3261e",
        bgColor: "#f7f7f2",
        icon: <Schedule />,
        textColor: "#b3261e",
      }
    }
    if (now > final) {
      return {
        status: "Completado",
        color: "#376d4f",
        bgColor: "#f7f7f2",
        icon: <CheckCircle />,
        textColor: "#376d4f",
      }
    }
    return {
      status: "En Progreso",
      color: "#7d4f50",
      bgColor: "#f7f7f2",
      icon: <PlayArrow />,
      textColor: "#7d4f50",
    }
  }

  // Función para calcular progreso del proyecto
  const getProjectProgress = (fechaInicio, fechaFinal) => {
    const now = new Date()
    const inicio = new Date(fechaInicio)
    const final = new Date(fechaFinal)
    const total = final - inicio
    const elapsed = now - inicio
    return Math.max(0, Math.min(100, (elapsed / total) * 100))
  }

  return (
    <Grid container spacing={3}>
      {/* Card Principal del Grupo - Ancho Completo */}
      <Grid item xs={12}>
        <Card
          sx={{
            background: "rgba(247, 247, 242, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 8px 40px rgba(12,12,12,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                sx={{
                  bgcolor: "#7d4f50",
                  mr: 3,
                  width: 64,
                  height: 64,
                  boxShadow: "0 4px 20px rgba(125,79,80,0.15)",
                }}
              >
                <Group fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" color="#0c0c0c">
                  {groupName}
                </Typography>
                <Typography variant="subtitle1" color="#b1b2b5">
                  Panel de control del grupo
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<TrendingUp />}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    background: "linear-gradient(45deg, #376d4f 30%, #7d4f50 90%)",
                    boxShadow: "0 4px 20px rgba(55, 109, 79, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 25px rgba(55, 109, 79, 0.4)",
                    },
                  }}
                >
                  Ver Consumo
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Assessment />}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    background: "linear-gradient(45deg, #7d4f50 30%, #b1b2b5 90%)",
                    boxShadow: "0 4px 20px rgba(125, 79, 80, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 25px rgba(125, 79, 80, 0.4)",
                    },
                  }}
                >
                  Información General
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Folder />}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    background: "linear-gradient(45deg, #b3261e 30%, #7d4f50 90%)",
                    boxShadow: "0 4px 20px rgba(179, 38, 30, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 25px rgba(179, 38, 30, 0.4)",
                    },
                  }}
                >
                  Ver Proyectos
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Sección de Consumo - Tamaño medio */}
      <Grid item xs={12} lg={5}>
        <Card
          sx={{
            height: "100%",
            background: "rgba(247, 247, 242, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 8px 40px rgba(12,12,12,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 50px rgba(12,12,12,0.15)",
            },
          }}
        >
          <CardContent sx={{ p: 3, height: "100%" }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ bgcolor: "#376d4f", mr: 2, boxShadow: "0 4px 15px rgba(55, 109, 79, 0.3)" }}>
                <Speed />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="#0c0c0c">
                Resumen de Consumo
              </Typography>
            </Box>

            {hasConsumption ? (
              <Box>
                {consumptions.slice(0, 4).map((c, index) => (
                  <Box key={c.ID} sx={{ mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1" fontWeight="medium" color="#0c0c0c">
                        {c.Factor}
                      </Typography>
                      <Chip
                        label={c.Unidad}
                        size="small"
                        sx={{
                          bgcolor: "#e8e9ea",
                          color: "#7d4f50",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.random() * 100} // Simula datos reales
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#e8e9ea",
                        "& .MuiLinearProgress-bar": {
                          background: `linear-gradient(45deg, #376d4f 30%, #7d4f50 90%)`,
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={0.5}>
                      <Typography variant="caption" color="#b1b2b5">
                        Consumo actual
                      </Typography>
                      <Typography variant="caption" fontWeight="bold" color="#7d4f50">
                        {Math.floor(Math.random() * 100)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {consumptions.length > 4 && (
                  <Button variant="text" size="small" endIcon={<ArrowForward />} sx={{ mt: 1, color: "#7d4f50" }}>
                    Ver más consumos (+{consumptions.length - 4})
                  </Button>
                )}
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
                <Avatar sx={{ bgcolor: "#e8e9ea", mb: 2, width: 64, height: 64 }}>
                  <Speed sx={{ color: "#b1b2b5", fontSize: 32 }} />
                </Avatar>
                <Typography variant="body1" color="#b1b2b5" textAlign="center">
                  No hay consumos registrados
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Sección de Proyectos - Tamaño grande */}
      <Grid item xs={12} lg={7}>
        <Card
          sx={{
            height: "100%",
            background: "rgba(247, 247, 242, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 8px 40px rgba(12,12,12,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 50px rgba(12,12,12,0.15)",
            },
          }}
        >
          <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: "#7d4f50", mr: 2, boxShadow: "0 4px 15px rgba(125, 79, 80, 0.3)" }}>
                  <Folder />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" color="#0c0c0c">
                  Proyectos del Grupo
                </Typography>
              </Box>
              {hasProjects && (
                <Chip
                  label={`${projects.length} proyectos`}
                  sx={{ bgcolor: "#e8e9ea", color: "#7d4f50" }}
                  variant="outlined"
                />
              )}
            </Box>

            {hasProjects ? (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {projects.slice(0, 4).map((project) => {
                    const projectStatus = getProjectStatus(project.fechaInicio, project.fechaFinal)
                    const progress = getProjectProgress(project.fechaInicio, project.fechaFinal)

                    return (
                      <Grid item xs={12} sm={6} key={project.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            height: "100%",
                            borderRadius: 3,
                            border: `2px solid ${projectStatus.color}20`,
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: `0 8px 25px ${projectStatus.color}30`,
                              borderColor: projectStatus.color,
                            },
                          }}
                        >
                          <CardContent sx={{ p: 2.5 }}>
                            <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                              <Box flex={1}>
                                <Typography variant="h6" fontWeight="bold" noWrap color="#0c0c0c">
                                  {project.name}
                                </Typography>
                                <Typography variant="body2" color="#b1b2b5" sx={{ mt: 0.5 }}>
                                  {project.description}
                                </Typography>
                              </Box>
                              <IconButton size="small" sx={{ ml: 1, color: "#b1b2b5" }}>
                                <MoreVert />
                              </IconButton>
                            </Box>

                            <Box
                              sx={{
                                bgcolor: projectStatus.bgColor,
                                p: 1.5,
                                borderRadius: 2,
                                mb: 2,
                              }}
                            >
                              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                <Box display="flex" alignItems="center">
                                  <Box sx={{ color: projectStatus.textColor, mr: 1 }}>{projectStatus.icon}</Box>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: projectStatus.textColor }}>
                                    {projectStatus.status}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" fontWeight="bold" sx={{ color: projectStatus.textColor }}>
                                  {Math.round(progress)}%
                                </Typography>
                              </Box>

                              <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: "rgba(255,255,255,0.5)",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: projectStatus.color,
                                    borderRadius: 3,
                                  },
                                }}
                              />
                            </Box>

                            <Box display="flex" alignItems="center" justifyContent="between">
                              <CalendarToday sx={{ fontSize: 16, color: "#b1b2b5", mr: 1 }} />
                              <Typography variant="caption" color="#b1b2b5">
                                {new Date(project.fechaInicio).toLocaleDateString()} -{" "}
                                {new Date(project.fechaFinal).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>

                {projects.length > 4 && (
                  <Box textAlign="center" mt={3}>
                    <Button
                      variant="outlined"
                      endIcon={<ArrowForward />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: "bold",
                        borderColor: "#7d4f50",
                        color: "#7d4f50",
                        "&:hover": {
                          borderColor: "#376d4f",
                          color: "#376d4f",
                        },
                      }}
                    >
                      Ver todos los proyectos ({projects.length})
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 6,
                }}
              >
                <Avatar sx={{ bgcolor: "#e8e9ea", mb: 3, width: 80, height: 80 }}>
                  <Folder sx={{ color: "#b1b2b5", fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" color="#b1b2b5" mb={1}>
                  No hay proyectos en curso
                </Typography>
                <Typography variant="body2" color="#b1b2b5" textAlign="center">
                  Cuando tengas proyectos activos, aparecerán aquí
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Card de Reportes - Tamaño completo pero más compacto */}
      <Grid item xs={12}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #b3261e 0%, #7d4f50 100%)",
            color: "#ffffff",
            borderRadius: 4,
            boxShadow: "0 8px 40px rgba(179, 38, 30, 0.3)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 50px rgba(179, 38, 30, 0.4)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={8}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2, width: 56, height: 56 }}>
                    <Timeline fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      Centro de Reportes
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Accede a informes detallados y analíticas de tu grupo
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} textAlign={{ xs: "left", md: "right" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "#ffffff",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1.5,
                    px: 3,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.3)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  Ver Reportes
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

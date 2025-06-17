import React, { useState, useEffect } from "react";
import ProjectTable from "../components/ProjectTable";
import { CreatePDF } from "../utils/CreatePDF";
import { jsPDF } from "jspdf";
import {
  getProjects,
  getProjectsbyStatus,
  getProjectsByDates,
  getProjectsPDF,
  AddProject,
  UpdateProject,
  DProject,
} from "../API/Projects";

import {
  getTasks,
  UpdateStatusTask,
  AddTask,
  UpdateTaskt,
  DeleteTask,
} from "../API/Tasks";
import { getReductionUnit } from "../API/ReductionUnit";
import {
  Grid,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Modal,
  Switch,
  TextField,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "../styles/ProjectsPage.css";
import { Try } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Swal from "sweetalert2";

export function ProjectsPage() {
  //Hook para manejar el JSON de proyectos
  const [projects, setProjects] = useState([]);
  //Hook para manejar el JSON de proyectos filtro
  const [filter, setFilter] = useState("todos");
  //Hook para manejar el JSON de proyectos por fechas
  const [startDate, setStartDate] = useState(null);
  //Hook para manejar el JSON de proyectos por fechas
  const [endDate, setEndDate] = useState(null);
  //Hook para manejar el JSON de las tareas por proyectos
  const [tasks, setTasks] = useState(null);
  //Hook para cuando abrir el modal
  const [openModal, setOpenModal] = useState(false);
  const [openModalProjects, setOpenModalProjects] = useState(false);

  //Hook para cuando un loading
  const [loading, setLoading] = useState(false);

  const [taskStatus, setTaskStatus] = useState({});

  const [data, setData] = useState({});

  //Use State para el modal de agregar o editar proyectos
  const [modoEdicion, setModoEdicion] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [reductionUnit, setReductionUnit] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [projectData, setProjecttData] = useState({
    proyectId: "",
    nombre: "",
    descripcion: "",
    unidadreduccion: "",
    cantidadReduccion: "",
    fechaInicio: "",
    fechaFinal: "",
  });

  const [taskData, setTasktData] = useState({
    TaskId: "",
    proyectID: "",
    titulo: "",
    nombre: "",
    descripcion: "",
  });

  //Constante para encontrar proyectos
  const grupo = 1;
  const fetchProjects = async () => {
    try {
      let data = [];
      if (startDate && endDate) {
        const formattedStart = encodeURIComponent(
          dayjs(startDate).format("MM/DD/YYYY")
        );
        const formattedEnd = encodeURIComponent(
          dayjs(endDate).format("MM/DD/YYYY")
        );
        data = await getProjectsByDates(formattedStart, formattedEnd);
        setData(data);
      } else if (filter === "todos") {
        data = await getProjects();
      } else {
        const status = filter === "true" ? true : false;
        data = await getProjectsbyStatus(status);
      }
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      fetchProjects();
    }
  }, [filter]);

  const SearchByDate = () => {
    if (startDate && endDate) {
      fetchProjects();
    }
  };

  const CleanDates = () => {
    setFilter("todos");
    fetchProjects();
    setEndDate(null);
    setStartDate(null);
    setData(0);
  };

  // Abrir modal y cargar detalles
  const VerMas = async (projectID) => {
    setOpenModal(true);
    setLoading(true);
    try {
      setTasktData({
        proyectID: projectID,
      });
      const tasks = await getTasks(projectID);
      console.log(tasks);
      const initialStatus = {};
      tasks.forEach((task) => {
        initialStatus[task.taskId] = task.status;
      });
      setTaskStatus(initialStatus);
      setTasks(tasks);
    } catch (error) {
      setTasks(null);
      console.log("El siguiente proyecto no tiene Tareas");
    } finally {
      setLoading(false);
    }
  };

  const CloseModal = () => {
    setOpenModal(false);
    setTasks(null);
     fetchProjects();
  };

  const UpdateStatusTasks = (taskId) => (event) => {
    const newStatus = event.target.checked;
    setTaskStatus((prev) => ({
      ...prev,
      [taskId]: newStatus,
    }));

    UpdateStatusTask(taskId, newStatus)
      .then(() => {
        console.log("Estado actualizado");
      })
      .catch((err) => {
        console.error("Error al actualizar estado", err);
      });
  };

  const CreatePDFAPI = async () => {
    try {
      const projectsPDF = await getProjectsPDF();
      console.log(projectsPDF);
      CreatePDF(projectsPDF);
    } catch (error) {
      console.log("Error a crear el pdf");
    } finally {
    }
  };

  // Abrir modal y cargar detalles
  const openModalAddProject = async () => {
    setModoEdicion(false);
    setProjectId(null);
    setProjecttData({
      nombre: "",
      descripcion: "",
      unidadreduccion: "",
      cantidadReduccion: "",
      fechaInicio: "",
      fechaFinal: "",
    });
    const ReductionUnitData = await getReductionUnit();
    setReductionUnit(ReductionUnitData);
    setOpenModalProjects(true);
  };

  const openModalUpdateProject = async (project) => {
    setModoEdicion(true);
    setProjectId(project.projectID);
    setProjecttData({
      proyectoId: project.proyectoId,
      nombre: project.nombre,
      descripcion: project.descripcion,
      unidadreduccion: project.unidadreduccion,
      cantidadReduccion: project.cantidadReduccion,
      fechaInicio: project.fechaInicio,
      fechaFinal: project.fechaFinal,
    });
    const ReductionUnitData = await getReductionUnit();
    setReductionUnit(ReductionUnitData);
    console.log(project);

    console.log(projectData);
    setOpenModalProjects(true);
  };
  const close = () => {
    setOpenModalProjects(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjecttData((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitModalEdicion = async () => {
    try {
      let result;
      setOpenModalProjects(false);
      const camposenBlanco = Object.values(projectData).some(
        (value) => value === "" || value === null || value === undefined
      );

      if (camposenBlanco) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          text: "Por favor, completá todos los campos antes de continuar.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      if (modoEdicion) {
        console.log(projectData);
        result = await UpdateProject(projectData);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "¡Proyecto actualizaxo!",
            text: "El proyecto se ha actualizado correctamente.",
            confirmButtonColor: "#44af69",
          })
           fetchProjects();
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar el proyecto",
            text: "Por favor, revisá los datos e intentá nuevamente.",
            confirmButtonColor: "#d33",
          });
           fetchProjects();
        }
      } else {
        result = await AddProject(projectData);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "¡Proyecto guardado!",
            text: "El proyecto se ha guardado correctamente.",
            confirmButtonColor: "#44af69",
          });
           fetchProjects();
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo agregar el proyecto",
            text: "Por favor, revisá los datos e intentá nuevamente.",
            confirmButtonColor: "#d33",
          });
           fetchProjects();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ocurrió un error inesperado. Intentalo más tarde.",
        confirmButtonColor: "#d33",
      });
       fetchProjects();
    }
  };

  const DeleteProject = async (projectID) => {
    let project = await DProject(projectID);
    setOpenModalProjects(false);
    if (project) {
      Swal.fire({
        icon: "success",
        title: "¡Proyecto Eliminado!",
        text: "El proyecto se ha eliminado correctamente.",
        confirmButtonColor: "#44af69",
      });
       fetchProjects();
    } else {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar el proyecto",
        text: "Por favor, revisá los datos e intentá nuevamente.",
        confirmButtonColor: "#d33",
      });
       fetchProjects();
    }
  };

  const SubmitModalTask = async () => {
    try {
      setOpenModal(false);
      if (!taskData?.titulo || !taskData?.descripcion) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completá el título y la descripción.",
          confirmButtonColor: "#f0ad4e",
        });
        return;
      }
      const result = await AddTask(taskData);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "¡Tarea agregada!",
          text: "La tarea se agregó correctamente.",
          confirmButtonColor: "#44af69",
        });
         fetchProjects();
      } else {
        Swal.fire({
          icon: "error",
          title: "No se pudo agregar la tarea",
          text: "Por favor, revisá los datos e intentá nuevamente.",
          confirmButtonColor: "#d33",
        });
         fetchProjects();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ocurrió un error inesperado. Intentalo más tarde.",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const UpTask = async () => {
    try {
      setOpenModal(false);
      if (!taskData?.titulo || !taskData?.descripcion) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completá el título y la descripción.",
          confirmButtonColor: "#f0ad4e",
        }).then(() => {
          window.location.reload();
        });
        return;
      }
      const result = await UpdateTaskt(taskData);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "¡Tarea actaulizada!",
          text: "La tarea se agregó correctamente.",
          confirmButtonColor: "#44af69",
        });
         fetchProjects();
      } else {
        Swal.fire({
          icon: "error",
          title: "No se pudo actualizar la tarea",
          text: "Por favor, revisá los datos e intentá nuevamente.",
          confirmButtonColor: "#d33",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ocurrió un error inesperado. Intentalo más tarde.",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const DTask = async (taskID) => {
    let task = await DeleteTask(taskID);
    setOpenModal(false);
    if (task) {
      Swal.fire({
        icon: "success",
        title: "Tarea Eliminado!",
        text: "El proyecto se ha eliminado correctamente.",
        confirmButtonColor: "#44af69",
      });
       fetchProjects();
    } else {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar la tarea",
        text: "Por favor, revisá los datos e intentá nuevamente.",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div id="container">
      <main style={{ padding: "24px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <Stack
              spacing={3}
              sx={{
                mb: 2,
                border: "1px solid #ccc",
                borderRadius: 2, // bordes redondeados (usa unidades MUI)
                padding: 2,
              }}
            >
              <div>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Box display="flex" flexDirection="column">
                      <Box display="flex" alignItems="center" gap={1}>
                        <FilterAltOutlinedIcon fontSize="medium" />
                        <Typography variant="h6">Filtros y Acciones</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Filtra los proyectos por status y fechas
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#44af69", fontWeight: "bold" }}
                      onClick={openModalAddProject}
                    >
                      Nuevo Proyecto
                    </Button>
                  </Grid>
                </Grid>

                <div style={{ paddingTop: "3%" }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    {/* BLOQUE IZQUIERDO: Filtros */}
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Box>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="left"
                            >
                              Status
                            </Typography>
                            <FormControl size="small" sx={{ width: 180 }}>
                              <Select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                              >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="true">Realizados</MenuItem>
                                <MenuItem value="false">Pendientes</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>

                        <Grid item>
                          <Box>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="left"
                            >
                              Fecha Inicio
                            </Typography>
                            <DatePicker
                              value={startDate}
                              onChange={(newValue) => setStartDate(newValue)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: { width: 180 },
                                },
                              }}
                            />
                          </Box>
                        </Grid>

                        <Grid item>
                          <Box>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="left"
                            >
                              Fecha Fin
                            </Typography>
                            <DatePicker
                              value={endDate}
                              onChange={(newValue) => setEndDate(newValue)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: { width: 180 },
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          onClick={SearchByDate}
                          style={{
                            backgroundColor: "#44af69",
                            fontWeight: "bold",
                          }}
                        >
                          Buscar por fecha
                        </Button>
                        <Button
                          variant="contained"
                          onClick={CleanDates}
                          style={{
                            backgroundColor: "#44af69",
                            fontWeight: "bold",
                          }}
                        >
                          Limpiar Fechas
                        </Button>
                        {data.length > 0 && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => CreatePDFAPI(1)}
                          >
                            Descargar pdf
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Stack>

            <ProjectTable
              projects={projects}
              onViewMore={VerMas}
              updateProject={openModalUpdateProject}
              deleteProject={DeleteProject}
            />
          </Box>
        </LocalizationProvider>
      </main>

      <Modal
        open={openModal}
        onClose={CloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "90vh", // alto máximo en pantalla
            overflowY: "auto", // activa scroll vertical
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Cargando detalles...</Typography>
            </Box>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                Detalles del Proyecto: {tasks[0].proyect}
              </Typography>

              {tasks.map((task) => (
                <Box
                  key={task.taskId}
                  sx={{
                    mb: 2,
                    p: 1,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  {editTaskId === task.taskId ? (
                    <>
                      <TextField
                        label="Título"
                        fullWidth
                        value={taskData.titulo}
                        onChange={(e) =>
                          setTasktData({ ...taskData, titulo: e.target.value })
                        }
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={2}
                        value={taskData.descripcion}
                        onChange={(e) =>
                          setTasktData({
                            ...taskData,
                            descripcion: e.target.value,
                          })
                        }
                        sx={{ mb: 1 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <Button onClick={() => setEditTaskId(null)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => UpTask()} variant="contained">
                          Guardar
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Tarea: {task.titulo}
                      </Typography>
                      <Typography>Descripción: {task.descripcion}</Typography>
                      <Typography>
                        Estado:{" "}
                      
                        {taskStatus[task.taskId] ? "Completada" : "Pendiente"}
                      </Typography>
                      <Switch
                        checked={!!taskStatus[task.taskId]}
                        onChange={UpdateStatusTasks(task.taskId)}
                        color="primary"
                        inputProps={{ "aria-label": "cambiar estado tarea" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setEditTaskId(task.taskId);
                            setTasktData({
                              TaskId: task.taskId,
                              proyectID: task.proyectID,
                              titulo: task.titulo,
                              descripcion: task.descripcion,
                            });
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => {
                            DTask(task.taskId);
                          }}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              ))}
              {/* Parte para agregar una tarea */}

            
            </>

          ) : (
            <Typography>No hay tareas para mostrar</Typography>
          )}
           <Box
                sx={{
                  mt: 3,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="subtitle1">Agregar nueva tarea</Typography>
                <TextField
                  label="Título"
                  fullWidth
                  sx={{ mt: 1 }}
                  onChange={(e) =>
                    setTasktData({ ...taskData, titulo: e.target.value })
                  }
                />
                <TextField
                  label="Descripción"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mt: 1 }}
                  onChange={(e) =>
                    setTasktData({ ...taskData, descripcion: e.target.value })
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button onClick={CloseModal} variant="contained">
                  Cerrar
                </Button>
                <Button variant="contained" onClick={SubmitModalTask}>
                  Agregar
                </Button>
              </Box>
        </Box>
      </Modal>

      {/* Modal para agregar un nuevo proyecto */}
      <Modal
        open={openModalProjects}
        onClose={CloseModal}
        aria-labelledby="add-product-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 750,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">
            {modoEdicion ? "Editar Proyecto" : "Nuevo Proyecto"}
          </Typography>

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            margin="normal"
            value={projectData.nombre}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            margin="normal"
            value={projectData.descripcion}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="unidad-label">Unidad de Reducción</InputLabel>
                <Select
                  labelId="unidad-label"
                  value={projectData.unidadreduccion}
                  onChange={(e) =>
                    setProjecttData({
                      ...projectData,
                      unidadreduccion: e.target.value,
                    })
                  }
                >
                  {Array.isArray(reductionUnit) &&
                    reductionUnit.map((unidad) => (
                      <MenuItem key={unidad.unidadId} value={unidad.unidadId}>
                        {unidad.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Cantidad"
                name="cantidadReduccion"
                value={projectData.cantidadReduccion}
                onChange={handleChange}
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Box>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Inicio"
                value={
                  projectData.fechaInicio
                    ? dayjs(projectData.fechaInicio, "DD-MM-YYYY")
                    : null
                }
                onChange={(newValue) => {
                  setProjecttData((prev) => ({
                    ...prev,
                    fechaInicio: newValue ? newValue.format("DD-MM-YYYY") : "",
                  }));
                }}
                inputFormat="DD-MM-YYYY"
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha Final"
                value={
                  projectData.fechaFinal
                    ? dayjs(projectData.fechaFinal, "DD-MM-YYYY")
                    : null
                }
                onChange={(newValue) => {
                  setProjecttData((prev) => ({
                    ...prev,
                    fechaFinal: newValue ? newValue.format("DD-MM-YYYY") : "",
                  }));
                }}
                inputFormat="DD-MM-YYYY"
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button onClick={close} sx={{ mr: 1 }}>
              Cancelar
            </Button>
            <Button onClick={SubmitModalEdicion} variant="contained">
              {modoEdicion ? "Editar" : "Agregar"}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Fin del Modal para agregar un nuevo proyecto */}
    </div>
  );
}

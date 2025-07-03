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

import MDBox from "../components/MDBox";

export function ProjectPage1() {
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
          });
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

  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
         
    </MDBox>
  );

  return {
    columns: [
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project name="Asana" />,
        budget: (
          <Typography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            $2,500
          </Typography>
        ),
        status: (
          <Typography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            working
          </Typography>
        ),

      },
    ],
  };
}

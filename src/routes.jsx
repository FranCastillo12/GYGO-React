/// Manejo de los roles
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
///Iconos
import Icon from "@mui/material/Icon";
import {EnergySavingsLeaf} from "@mui/icons-material"

//Ruta del login
import Login from "./Pages/Public/Login";
//Ruta del inicio de sesion
import { Register } from "./Pages/Public/Register";
import { ReportCompanies } from "./Pages/Private/ReportCompaniesPage";
import { ReportServices } from "./Pages/Private/ReportServices";


import AdminUserDashboard from "./Pages/AdminUserDashboard";
import AdminEmisionFactor from "./Pages/Admin/AdminEmisionFactor";

import ProjectPage from "./Pages/Private/ProjectsPage";
import { HomePage } from "./Pages/Public/HomePage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { ConsumptionPage } from "./Pages/ConsumptionPage";
import { MonthlyConsumptionPage } from "./Pages/MonthlyConsumPage";
import { AddConsumptionPage } from "./Pages/AddConsumptionPage";
import { MonthlyHistoryPage } from "./Pages/MonthlyHistoryPage";
import { AddMonthlyConsumPage } from "./Pages/AddMonthlyConsmPage";
import { UpdateMonthlyConsumPage } from "./Pages/UpdateMonthlyConsumPage";
import { UpdateConsumptionPage } from "./Pages/UpdateConsumptionPage";
import IncidentsHistoryPage from "./Pages/IncidentHistoryPage";
import { ConfirmIncidentPage } from "./Pages/ConfirmIncidentPage/ConfirmIncidentPage";
import { ReportsEmissionsPage } from "./Pages/ReportsEmissionsPage";
import { DashboardGroupPage } from "./Pages/DashboardGroupPage";
import { UserProfilePage } from "./Pages/UserProfilePage";
import { GrupoProfilePage } from "./Pages/GroupProfilePage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import SectorsIndexPage from "./Pages/SectorsPage";
import { UnitsIndexPage } from "./Pages/UnitsIndexPage";
import { SourcesIndexPage } from "./Pages/SourcesIndexPage";
import { Messages} from "./Pages/Messages";
import { DashboardConsumo } from "./Pages/ConsumoPage";
import  ManagmentUsers  from "./Pages/ManagmentUsers";
import ServicesPage from "./Pages/ServicesPage";
import Certificaciones from "./Pages/Public/Certifications";
import SubscriptionSwitch from "./Pages/SubscriptionsPages/Subscription"
import { Verify2FA } from "./Pages/Verify2Fa";
import { ServicesHomePage } from "./Pages/Public/ServicesPage";
import { AboutUs } from "./Pages/Public/AboutUs";   
import {ContactUs} from "./Pages/Public/ContactUs";



const ProtectedElement = ({ children, allowedRoles, requiresPayment = false }) => {
  const { role, hasPaidGroupAdminAccess } = useAuth();

  if (!role) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  if (requiresPayment && role === "GA" && !hasPaidGroupAdminAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const routes = [
  {
    key: "HomePage",
    route: "/HomePage",
    component: <HomePage />,
  },
  {
    key: "certifications",
    route: "/certificaciones",
    component: <Certificaciones />,
  },
{
    key: "services",
    route: "/servicios",
    component: <ServicesHomePage />,
  },
  {
    key: "nosotros",
    route: "/nosotros",
    component:<AboutUs />,
  },
  {
    key: "contactos",
    route: "/contactos",
    component:<ContactUs />,

  },

  //Ruta de dashboard no visible
  {
    type: "collapse",
    name: "Dashboard",
    key: "Dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <ProtectedElement>
        <DashboardGroupPage />
      </ProtectedElement>
    ),
    roles: ["DEV", "GA", "GU", "DEF"],
    hideInSidebar: true,
  },

  //Ruta de login no visible
  {
    type: "collapse",
    name: "log",
    key: "log",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Login",
    key: "log",
    component: <Login />,
    hideInSidebar: true,
  },
  //Ruta de registro no visible
  {
    type: "collapse",
    name: "Registro",
    key: "Registro",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Registro/:inviteToken",
    component: <Register />,
    hideInSidebar: true,
  },
   {
    type: "collapse",
    name: "Mensajes",
    key: "Mensajes",
    icon: <Icon fontSize="small">email</Icon>,
    route: "/Messages",
       component: (
      <ProtectedElement>
        <Messages />
      </ProtectedElement>
    ),
    hideInSidebar: true,
  },


  //Ruta de proyectos
  {
    type: "collapse",
    name: "Proyectos",
    key: "Proyectos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ProjectPage",

    component: (
      <ProtectedElement>
        <ProjectPage />
      </ProtectedElement>
    ),
    roles: ["GA", "GU", "DEV"],
  },

  //Ruta de proyectos
  {
    type: "collapse",
    name: "DashboardConsumo",
    key: "DashboardConsumo",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/DashboardConsumo",

    component: (
      <ProtectedElement>
        <DashboardConsumo />
      </ProtectedElement>
    ),
    roles: ["GA", "GU", "DEV"],
  },

  //Ruta de consumo
  {
    type: "collapse",
    name: "Consumo",
    key: "consumption",
    icon: <EnergySavingsLeaf fontSize="small"></EnergySavingsLeaf>,
    route: "/consumption",
    component: (
      <ProtectedElement>
        <ConsumptionPage />
      </ProtectedElement>
    ),
    roles: ["DEV", "GA", "GU"],
  },
  {
    type: "collapse",
    name: "Consumo mensual",
    key: "monthly-consumption",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/consumption/monthly/:id",

    component: (
      <ProtectedElement>
        <MonthlyConsumptionPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
  },

  {
    type: "collapse",
    name: "Editar consumo mensual",
    key: "edit-monthly-consumption",
    icon: <Icon fontSize="small">edit_calendar</Icon>,
    route: "/consumption/monthly/edit/:consumptionId/:monthlyId",

    component: (
      <ProtectedElement>
        <UpdateMonthlyConsumPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
  },

  //Ruta para agregar grupo
  {
    type: "collapse",
    name: "Agregar grupo",
    key: "add-group",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/addGroup",
    component: (
      <ProtectedElement>
        <AddGroupSAPage />
      </ProtectedElement>
    ),
    roles: ["DEV", "SA", "GA"],
  },

  //Ruta de Monthly History
  {
    type: "collapse",
    name: "Historial mensual",
    key: "monthly-history",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/consumption/monthly/history/:id",

    component: (
      <ProtectedElement>
        <MonthlyHistoryPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["GA", "DEV"],
  },

  //Ruta de reportes
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">bar_chart</Icon>,

    collapse: [
      {
        name: "Emisiones",
        key: "emissions-reports",
        icon: <Icon fontSize="small">insert_chart</Icon>,
        route: "/reportsEmissions",

        component: (
          <ProtectedElement>
            <ReportsEmissionsPage />
          </ProtectedElement>
        ),
        roles: ["GA", "DEV"],
      },
      {
        name: "Empresas",
        key: "companies-reports",
        icon: <Icon fontSize="small">insert_chart</Icon>,
        route: "/ReportCompanies",

        component: (
          <ProtectedElement>
            <ReportCompanies />
          </ProtectedElement>
        ),
        roles: ["SA", "DEV"],
      },

  {
        name: "Servicios",
        key: "Services-reports",
        icon: <Icon fontSize="small">insert_chart</Icon>,
        route: "/ReportServices",

        component: (
          <ProtectedElement>
            <ReportServices />
          </ProtectedElement>
        ),
        roles: ["SA", "DEV","GA"],
      },




      
    ],
    roles: ["DEV", "GA", "GU"],
  },

  {
    type: "collapse",
    name: "Confirm Emission Incident",
    key: "confirm-incident",
    icon: <Icon fontSize="small">check_circle</Icon>,
    route: "/emissions/confirm",
    component: <ConfirmIncidentPage />,

    component: (
      <ProtectedElement>
        <ConfirmIncidentPage />
      </ProtectedElement>
    ),
    roles: ["GA", "GU", "DEV"],
    hideInSidebar: true,
  },
  //Ruta de incidents history
  {
    type: "collapse",
    name: "Historial de incidentes",
    key: "incidents-history",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/emissions/incidents",

    component: (
      <ProtectedElement>
        <IncidentsHistoryPage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV"],
  },

  //Perfiles
  {
    type: "collapse",
    name: "Perfil del Usuario",
    key: "user-profile",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/userProfile",

    component: (
      <ProtectedElement>
        <UserProfilePage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "GU", "SA", "DEF"],
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Perfil del grupo",
    key: "grup-profile",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/groupProfile",

    component: (
      <ProtectedElement>
        <GrupoProfilePage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "GU", "SA"],
    hideInSidebar: true,
  },
  //Ruta de cambio de contra
  {
    type: "collapse",
    name: "ChangePassword",
    key: "ChangePassword",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ChangePasswordPage",
    component: (
      <ProtectedElement>
        <ChangePasswordPage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "GU", "SA", "DEF"],
    hideInSidebar: true,
  },



  //Gestiones para el Super Administrador
  {
    type: "collapse",
    name: "Gestiones",
    key: "gestiones",
    icon: <Icon fontSize="small">assignment</Icon>,

    collapse: [
      {
        //Ruta para sectores
        type: "collapse",
        name: "Sectores",
        key: "Sectors",
        icon: <Icon fontSize="small">place</Icon>,
        route: "/sectores",

        component: (
          <ProtectedElement>
            <SectorsIndexPage />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],
      },

      {
        //Ruta para unidades de reduccion
        name: "Unidades de reducción",
        key: "Units",
        icon: <Icon fontSize="small">straighten</Icon>,
        route: "/unidades",

        component: (
          <ProtectedElement>
            <UnitsIndexPage />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],
      },
      //Ruta para fuentes de emisiones
      {
        name: "Fuentes de Emisión",
        key: "sources",
        icon: <Icon fontSize="small">eco</Icon>,
        route: "/sources",

        component: (
          <ProtectedElement>
            <SourcesIndexPage />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],
      }, 
      ///gESTIONES DEL ADMIN DE GRUPO
      
        {
   
    name: "Servicios",
    key: "Services",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Services",
    component: (
      <ProtectedElement>
        <ServicesPage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV"],
  },

  {
   
    name: "Factor Emision",
    key: "AdminFactorEmision",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/AdminEmisionFactor",

    component: (
      <ProtectedElement>
        <AdminEmisionFactor />
      </ProtectedElement>
    ),
    roles: ["DEV", "GA","SA"],
  },

  //Ruta Tabla de usuarios
  {
    type: "collapse",
    name: "AdminUserDashboard",
    key: "AdminUserDashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/AdminUserDashboard",
    component: (
      <ProtectedElement>
        <AdminUserDashboard />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV"],
  },


    ],
    roles: ["DEV", "SA","GA"],
  },





  {
     type: "collapse",
    name: "Manejo de usuarios",
    key: "ManagmentUsers",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ManagmentUsers",

    component: (
      <ProtectedElement>
        <ManagmentUsers />
      </ProtectedElement>
    ),
    
  },

   //subscripciones
  {
    type: "collapse",
    name: "Subscription",
    key: "subscription",
    icon: <Icon fontSize="small">suscripción</Icon>,
    route: "/subscription",
    component: <SubscriptionSwitch />,
    roles: ["DEV", "SA", "DEF", "GA"],
  },


    {
      type: "collapse",
      name: "Agregar consumo",
      key: "add-consumption",
      icon: <Icon fontSize="small">add</Icon>,
      route: "/consumption/add",
      component: (
        <ProtectedElement>
          <AddConsumptionPage />
        </ProtectedElement>
      ),
      hideInSidebar: true,
      roles: ["DEV", "GA", "GU"]
    },
    {
      type: "collapse",
      name: "Actualizar consumo",
      key: "add-consumption",
      icon: <Icon fontSize="small">add</Icon>,
      route: "/consumption/edit/:id",
      component: (
        <ProtectedElement>
          <UpdateConsumptionPage />
        </ProtectedElement>
      ),
      hideInSidebar: true,
      roles: ["DEV", "GA", "GU"]
    },
    {
      type: "collapse",
      name: "Editar consumo mensual",
      key: "edit-monthly-consumption",
      icon: <Icon fontSize="small">edit_calendar</Icon>,
      route: "/consumption/monthly/edit/:consumptionId/:monthlyId",
      component: (
        <ProtectedElement>
          <UpdateMonthlyConsumPage />
        </ProtectedElement>
      ),
      hideInSidebar: true,
      roles: ["DEV", "GA", "GU"]
    },
    {
      type: "collapse",
      name: "Agregar consumo mensual",
      key: "add-monthly-consumption",
      icon: <Icon fontSize="small">add_circle</Icon>,
      route: "/consumption/monthly/add/:consumptionId",
      component: (
        <ProtectedElement>
          <AddMonthlyConsumPage />
        </ProtectedElement>
      ), 
      hideInSidebar: true,
      roles: ["DEV", "GA", "GU"]
    },

  {
      type: "collapse",
      name: "Segundo Factor",
      key: "Segundo-Factor",
      icon: <Icon fontSize="small">add_circle</Icon>,
      route: "/verify-2fa",
      component: (
       
          <Verify2FA />
   
      ), 
      hideInSidebar: true,
      
    },







    

  //Ruta del home

  {
    type: "collapse",
    name: "Consumo mensual",
    key: "monthly-consumption",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/consumption/monthly/:id",
    component: <MonthlyConsumptionPage />,
    hideInSidebar: true,
  },
];

export const getRoutes = (role) => {
  const filterByRole = (routesList) => {
    return routesList
      .map((route) => {
        // Verificamos si este ítem tiene permiso
        const hasAccess = !route.roles || (role && route.roles.includes(role));

        // Si tiene colapsables (dropdown), los procesamos también
        if (route.collapse) {
          const filteredCollapse = filterByRole(route.collapse);
          if (filteredCollapse.length === 0 && !hasAccess) return null;

          return {
            ...route,
            collapse: filteredCollapse,
          };
        }

        return hasAccess ? route : null;
      })
      .filter(Boolean); // Remueve los nulls
  };

  return filterByRole(routes);
};

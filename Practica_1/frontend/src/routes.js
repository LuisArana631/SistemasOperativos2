import Monitor from "views/Monitor.js";
import Admin_Procesos from "views/Admin_Procesos.js";

var dashRoutes = [
  {
    path: "/monitor",
    name: "Monitor de Memoria",
    icon: "design_app",
    component: Monitor,
    layout: "/admin",
  },
  {
    path: "/admin-procesos",
    name: "Administrador de Procesos",
    icon: "files_paper",
    component: Admin_Procesos,
    layout: "/admin",
  }
];
export default dashRoutes;

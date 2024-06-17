import DashBoard from "./pages/dashboard/DashBoard";
import Department from "./pages/departments/Department";
import Tasks from "./pages/tasks/Tasks";
import Users from "./pages/users/Users";

const sidebarAdminRoutes = [
  {
    path: "/app/dashboard",
    element: DashBoard,
    name: "Home",
    exact: true,
  },
  {
    path: "/app/users",
    element: Users,
    name: "Users",
    exact: true,
  },
  {
    path: "/app/departments",
    element: Department,
    name: "Departments",
    exact: true,
  },
  {
    path: "/app/tasks",
    element: Tasks,
    name: "Tasks",
    exact: true,
  },
];

export { sidebarAdminRoutes };

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashBoard from "../pages/dashboard/DashBoard";
import Department from "../pages/departments/Department";
import Tasks from "../pages/tasks/Tasks";
import ViewTask from "../pages/tasks/ViewTask";
import Users from "../pages/users/Users";
import ViewUser from "../pages/users/ViewUser";

const guestRoutes = [
  {
    path: "/",
    element: Home,
    exact: true,
  },
  {
    path: "*",
    element: NotFound,
    exact: true,
  },
];

const authRoutes = [
  {
    path: "/login",
    element: Login,
    exact: true,
  },
  {
    path: "/register",
    element: Register,
    exact: true,
  },
  {
    path: "*",
    element: NotFound,
    exact: true,
  },
];

const appRoutes = [
  {
    path: "/dashboard",
    element: DashBoard,
    exact: true,
  },
  {
    path: "/users",
    element: Users,
    exact: true,
  },
  {
    path: "/tasks",
    element: Tasks,
    exact: true,
  },
  {
    path: "/departments",
    element: Department,
    exact: true,
  },
  {
    path: "/view/user/:id",
    element: ViewUser,
    exact: true,
  },
  {
    path: "/view/department/:id",
    element: ViewUser,
    exact: true,
  },
  {
    path: "/view/task/:id",
    element: ViewTask,
    exact: true,
  },
  {
    path: "*",
    element: NotFound,
    exact: true,
  },
];

export { guestRoutes, authRoutes, appRoutes };

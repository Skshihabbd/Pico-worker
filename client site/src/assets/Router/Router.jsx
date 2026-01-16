import ErrorPage from "../../page/ErrorPage";
import Home from "../../page/Home";
import Login from "../../page/Login";
import Main from "../../page/Main";
import { createBrowserRouter } from "react-router-dom";
import Registration from "../../page/Registration";
import DashboardLayout from "../../Dashboard/DashboardLayout";
import AdminHome from "../../Dashboard/AdminHome";
import ManageUsers from "../../Dashboard/ManageUsers";
import Managetask from "../../Dashboard/Managetask";
import TaskCreatorHome from "../../Dashboard/TaskCreatorHome";
import AddNewtask from "../../Dashboard/AddNewtask";
import Mytasks from "../../Dashboard/Mytasks";
import PurchaseCoin from "../../Dashboard/PurchaseCoin";
import PaymentHistory from "../../Dashboard/PaymentHistory";
import WorkerHome from "../../Dashboard/WorkerHome";
import TaskList from "../../Dashboard/TaskList";

import MySubmission from "../../Dashboard/MySubmission";
import WithDrawals from "../../Dashboard/WithDrawals";
import PrivetRoute from "./PrivetRoute";
import TaskDetails from "../../Dashboard/TaskDetails";
import UserprofilePage from "../../page/UserprofilePage";
import AdminRouter from "./AdminRouter";
import PaymentRoute from "../../Dashboard/PaymentRoute";
import TaskcreatorUpdate from "../../Dashboard/TaskcreatorUpdate";
import TaskcreatorRoute from "./TaskcreatorRoute";
import WorkerRoute from "./WorkerRoute";
import DashboardRedirect from "../../Dashboard/DashboardRedirect";
import About_Us from "../../page/About_Us";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // path: "/" er bodole index: true better
      { path: "profile", element: <UserprofilePage /> },
      { path: "about-us", element: <About_Us /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Registration /> },
  {
    path: "dashboard",
    element: (
      <PrivetRoute> 
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      { index: true, element: <DashboardRedirect /> },

      // Admin Routes
      {
        path: "adminhome",
        element: <AdminRouter><AdminHome /></AdminRouter>
      },
      {
        path: "manageuser",
        element: <AdminRouter><ManageUsers /></AdminRouter>
      },
      {
        path: "managetask",
        element: <AdminRouter><Managetask /></AdminRouter>
      },

      // Task Creator Routes
      {
        path: "creatorhome",
        element: <TaskcreatorRoute><TaskCreatorHome /></TaskcreatorRoute>
      },
      {
        path: "addnewtask",
        element: <TaskcreatorRoute><AddNewtask /></TaskcreatorRoute>
      },
      {
        path: "mytask",
        element: <TaskcreatorRoute><Mytasks /></TaskcreatorRoute>
      },
      {
        path: "taskupdate/:id",
        element: <TaskcreatorRoute><TaskcreatorUpdate /></TaskcreatorRoute>,
        loader: ({ params }) => fetch(`https://server-side-nu-sooty.vercel.app/taskcreatorsall/${params.id}`)
      },
      {
        path: "purchasecoin",
        element: <TaskcreatorRoute><PurchaseCoin /></TaskcreatorRoute>
      },
      {
        path: "paymenthistory",
        element: <TaskcreatorRoute><PaymentHistory /></TaskcreatorRoute>
      },

      // Worker Routes
      {
        path: "workerhome",
        element: <WorkerRoute><WorkerHome /></WorkerRoute>
      },
      {
        path: "tasklist",
        element: <WorkerRoute><TaskList /></WorkerRoute>
      },
      {
        path: "taskdetails/:id",
        element: <WorkerRoute><TaskDetails /></WorkerRoute>,
        loader: ({ params }) => fetch(`https://server-side-nu-sooty.vercel.app/taskcreatorsall/${params.id}`)
      },
      {
        path: "mysubmission",
        element: <WorkerRoute><MySubmission /></WorkerRoute>
      },
      {
        path: "withdraw",
        element: <WorkerRoute><WithDrawals /></WorkerRoute>
      },

      // Common Private Routes
      {
        path: "paymentroute/:coin/:price",
        element: <PaymentRoute />
      },
    ],
  },
]);
export default router;

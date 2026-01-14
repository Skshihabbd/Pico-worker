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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "profile",
        element: <UserprofilePage></UserprofilePage>,
      },
    ],
  },
  { path: "login", element: <Login/> },
  {
    path: "register",
    element: <Registration></Registration>,
  },
  {
    path: "dashboard",
    
    element: <DashboardLayout></DashboardLayout>,
    children: [

       {
      index: true,
      element: <DashboardRedirect />, 
    },
      {
        path: "adminhome",
        element: (
          <AdminRouter>
            <AdminHome></AdminHome>
          </AdminRouter>
        ),
      },
      {
        path: "manageuser",
        element: (
          <PrivetRoute>
            <AdminRouter>
              <ManageUsers></ManageUsers>
            </AdminRouter>
          </PrivetRoute>
        ),
      },

      {
        path: "managetask",
        element: (
          <PrivetRoute>
            <AdminRouter>
              <Managetask></Managetask>
            </AdminRouter>
          </PrivetRoute>
        ),
      },
      {
        path: "creatorhome",
        element: (
          <TaskcreatorRoute>
            <TaskCreatorHome></TaskCreatorHome>
          </TaskcreatorRoute>
        ),
      },
      {
        path: "addnewtask",
        element: (
          <PrivetRoute>
            <TaskcreatorRoute>
              <AddNewtask></AddNewtask>
            </TaskcreatorRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "mytask",
        element: (
          <PrivetRoute>
            <TaskcreatorRoute>
              <Mytasks></Mytasks>
            </TaskcreatorRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "purchasecoin",
        element: (
          <TaskcreatorRoute>
            <PurchaseCoin></PurchaseCoin>
          </TaskcreatorRoute>
        ),
      },
      {
        path: "paymenthistory",
        element: (
          <TaskcreatorRoute>
            <PaymentHistory></PaymentHistory>
          </TaskcreatorRoute>
        ),
      },
      {
        path: "workerhome",
        element: (
          <WorkerRoute>
            <WorkerHome></WorkerHome>
          </WorkerRoute>
        ),
      },
      {
        path: "tasklist",
        element: (
          <WorkerRoute>
            <TaskList></TaskList>
          </WorkerRoute>
        ),
      },
      {
        path: "taskdetails/:id",
        element: (
          <WorkerRoute>
            <TaskDetails></TaskDetails>
          </WorkerRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://server-side-nu-sooty.vercel.app/taskcreatorsall/${params.id}`
          ),
      },
      {
        path: "mysubmission",
        element: (
          <WorkerRoute>
            <MySubmission></MySubmission>
          </WorkerRoute>
        ),
      },
      {
        path: "withdraw",
        element: (
          <WorkerRoute>
            <WithDrawals></WithDrawals>
          </WorkerRoute>
        ),
      },
      {
        path: "paymentroute/:coin/:price",
        element: <PaymentRoute></PaymentRoute>,
      },
      {
        path: "taskupdate/:id",
        element: (
          <TaskcreatorRoute>
            <TaskcreatorUpdate></TaskcreatorUpdate>
          </TaskcreatorRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://server-side-nu-sooty.vercel.app/taskcreatorsall/${params.id}`
          ),
      },
    ],
  },
]);
export default router;

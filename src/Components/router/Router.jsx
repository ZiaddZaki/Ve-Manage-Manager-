import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import Drivers from "../Drivers/Drivers";
import Dashboard from "../dashboard/Dashboard";
import Login from "../Login/Login";
import ResetPassword from "../Forget-reset-password/ResetPassword";
import ForgetPassword from "../Forget-reset-password/ForgetPassword";
import Mechans from "../Mechanics/Mechanics";
import NotFound from "../NotFound/NotFound";
import Vehicles from "../Vehicles/Vehicles";
import Model from "../Vehicles/Model";
import Category from "../Vehicles/Category";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import VehiclesProfile from "../Vehicles/VehiclesProfile";
import DriverProfile from "../Drivers/DriverProfile";
import MechanicsProfile from "../Mechanics/MechanicsProfile";
// import DriverForm from "../Forms/DriverForm";
// import Manager from "../../components/Manager/Manager";
// import ManagerAdd from "../Forms/MangerAdd";
// import MecghanicAdd from "../Forms/MechanicAdd";
// import VehiclesAdd from "../Vehicles/VehiclesAdd";
// import Model from "../Vehicles/Model";
// import Category from "../Vehicles/Category";
// import Profile from "../Profile/Profile";
import Trips from "../Trips/trips";
import Maintience from "../Maintience/Maintience";
import DriversReports from "../DriversReports/DriversReports";
import MechanicsReports from "../MechanicsReports/MechanicsReports";
import TripDetails from "../Trips/TripDetails";
import AssignTrip from "../Trips/AssignTrip";
import MaintenanceCard, { StatusBadge } from "../MaintenanceCard";
// import ManagersProfile from "../Manager/ManagersProfile";
// import VehiclesProfile from "../Vehicles/VehiclesProfile";
// import DriverProfile from "../Drivers/DriverProfile";
// import MechanicsProfile from "../Mechanics/MechanicsProfile";
// import CategoryAdd from "../Forms/CategoryAdd";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/Overview", element: <Dashboard /> },
          { path: "/users/drivers", element: <Drivers /> },
          { path: "/users/mechanics", element: <Mechans /> },
          { path: "/vehicles", element: <Vehicles /> },
          { path: "/vehicles/model", element: <Model /> },
          { path: "/vehicles/categories", element: <Category /> },
          { path: "/VehiclesProfile/:id", element: <VehiclesProfile /> },
          { path: "/driverProfile/:id", element: <DriverProfile /> },
          { path: "/mechanicProfile/:id", element: <MechanicsProfile /> },
          // { path: "/users/drivers/add", element: <DriverForm /> },
          // { path: "/users/mechanics/add", element: <MecghanicAdd /> },
          // { path: "/users/managers", element: <Manager /> },
          // { path: "/users/managers/add", element: <ManagerAdd /> },
          { path: "/trips", element: <Trips /> },
          { path: "/trips/:id", element: <TripDetails /> },
          { path: "/trip/add", element: <AssignTrip /> },

          { path: "/maintience", element: <MaintenanceCard /> },
          { path: "/reports/drivers", element: <DriversReports /> },
          { path: "/reports/mechanics", element: <MechanicsReports /> },

          // { path: "/vehicles/add", element: <VehiclesAdd /> },
          // { path: "/vehicles/model", element: <Model /> },
          // { path: "/vehicles/categories", element: <Category /> },
          // { path: "/ManagerProfile/:id", element: <ManagersProfile /> },
          // { path: "/VehiclesProfile/:id", element: <VehiclesProfile /> },
          // { path: "/driverProfile/:id", element: <DriverProfile /> },
          // { path: "/mechanicProfile/:id", element: <MechanicsProfile /> },
          // { path: "/category/add", element: <CategoryAdd /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "ResetPassword", element: <ResetPassword /> },
  { path: "ForgetPassword", element: <ForgetPassword /> },
  { path: "*", element: <NotFound /> },
]);

export default Router;

import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Layout from "../Layout/Layout";
import AuthLayout from "../AuthLayout/AuthLayout";
import LoginPage from "../Authentication/LoginPage";
import RegisterPage from "../Authentication/RegisterPage";

import CoveragePage from "../pages/Coverage/CoveragePage";
import AddParcel from "../pages/AddParcel/AddParcel";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MyParcel from "../pages/MyParcel/MyParcel";
import Payment from "../pages/Dashboard/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import BeRider from "../pages/BeRider";
import PrivateRoutes from "../private/PrivateRoutes";
import PendingRidersList from "../pages/Dashboard/PendingRidersList";
import ActiveRidersList from "../pages/Dashboard/ActiveRidersList";
import MakeAdmin from "../pages/Dashboard/MakeAdmin";
import AdminRoute from "../private/AdminRoute";
import ForbiddenPage from "../pages/Forbidden/ForbiddenPage";
import AssignRider from "../pages/Dashboard/AssignRider";
import PendingDelivery from "../pages/Dashboard/PendingDelivery";
import CompletedDelivery from "../pages/Dashboard/CompletedDelivery";
import MyEarnings from "../pages/Dashboard/MyEarnings";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import AboutSection from "./About/AboutSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/coverage",
        element: <CoveragePage />,
      },
      {
        path: "/add-parcel",
        element: (
          <PrivateRoutes>
            <AddParcel />
          </PrivateRoutes>
        ),
      },
      {
        path: "/be-a-rider",
        element: <BeRider />,
      },
      {
        path: "/forbidden",
        element: <ForbiddenPage />,
      },
      {
        path: "/about",
        element: <AboutSection />,
      }
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-parcel",
        element: <MyParcel />,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "pending-riders",
        element: (
          <AdminRoute>
            <PendingRidersList />
          </AdminRoute>
        ),
      },
      {
        path: "active-riders",
        element: (
          <AdminRoute>
            <ActiveRidersList />
          </AdminRoute>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "pending-deliveries",
        element: <PendingDelivery />,
      },
      {
        path: "completed-deliveries",
        element: <CompletedDelivery />,
      },
      {
        path: "my-earnings",
        element: <MyEarnings />,
      },
    ],
  },
]);

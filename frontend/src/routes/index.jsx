import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/home/Login";
import Home from "../screens/home/Home";
import CreateAccount from "../screens/Account/CreateAccount";
import KYC from "../screens/Account/KYC";
import Dashboard from "../screens/Dashboard/Dashboard";
import Transact from "../screens/Dashboard/Transact";
import Loan from "../screens/Dashboard/Loan";
import LoanApply from "../screens/Dashboard/LoanApply";
import LoanRepay from "../screens/Dashboard/LoanRepay";
import Trade from "../screens/Dashboard/Trade";
import Acount from "../screens/Admin/Acount";
import Loan from "../screens/Admin/Loan";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/create",
    element: <CreateAccount />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/kyc",
    element: <KYC />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/transact",
    element: <Transact />,
  },
  {
    path: "/dashboard/loan",
    element: <Loan />,
  },
  {
    path: "/dashboard/loan/apply",
    element: <LoanApply />,
  },
  {
    path: "/dashboard/loan/repay",
    element: <LoanRepay />,
  },
  {
    path: "/dashboard/trade",
    element: <Trade />,
  },
  {
    path: "/admin/approve-acount",
    element: <Acount />,
  },
  {
    path: "/admin/approve-acount",
    element: <Loan />,
  },
]);
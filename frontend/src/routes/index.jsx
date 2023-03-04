import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/home/Login";
import Home from "../screens/home/Home";
import CreateAccount from "../screens/account/CreateAccount";
import Update from "../screens/account/Update";
import KYC from "../screens/account/KYC";
import Dashboard from "../screens/dashboard/Dashboard";
import Transact from "../screens/dashboard/Transact";
import Transfer from "../screens/dashboard/Transfer";
import Loan from "../screens/dashboard/Loan";
import LoanApply from "../screens/dashboard/LoanApply";
import LoanRepay from "../screens/dashboard/LoanRepay";
import Trade from "../screens/dashboard/Trade";
import ApproveLoan from "../screens/admin/Loan";
import Account from "../screens/admin/Account";

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
    path: "/update",
    element: <Update />,
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
    path: "/dashboard/transfer",
    element: <Transfer />,
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
    path: "/admin/approve-account",
    element: <Account />,
  },
  {
    path: "/admin/approve-loan",
    element: <ApproveLoan />,
  },
]);
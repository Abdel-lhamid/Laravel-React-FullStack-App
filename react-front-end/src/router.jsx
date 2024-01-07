import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Users from "./views/Users";
import Signup from "./views/Signup";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./views/NotFound";
import Login from "./views/Login";

const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        {
          path: '/',
          element: <Navigate to="/users"/>
        },
        {
          path: '/dashboard',
          element: <Dashboard/>
        },
        {
          path: '/users',
          element: <Users/>
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/signup',
          element: <Signup/>
        }
      ]
    },
    {
      path: "*",
      element: <NotFound/>
    }
  ])

export default router;
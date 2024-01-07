import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Users from "./views/Users";
import Signup from "./views/Signup";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import UserForm from "./views/UserForm.jsx";

const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard"/>
        },
        {
          path: '/dashboard',
          element: <Dashboard/>
        },
        {
          path: '/users',
          element: <Users/>
        },
        {
          path: '/users/new',
          element: <UserForm key="userCreate" />
        },
        {
          path: '/users/:id',
          element: <UserForm key="userUpdate" />
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
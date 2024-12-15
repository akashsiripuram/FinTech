import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomePage from "./pages/HomePage/Homepage";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/dashboard";
import Expenses from "./pages/Expenses/Expenses";
import Income from "./pages/income/income";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {path:"dashboard",element: <Dashboard />},
        {path:"expenses",element: <Expenses />},
        {path:"income",element:<Income/>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

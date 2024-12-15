import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomePage from "./pages/HomePage/Homepage";
import Layout from "./components/layout/Layout";
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginLayout from "./components/Layout/LoginLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses";
import Income from "./pages/income/income";
import { refreshToken } from "./services/authService";
import StackedBarChart from "./components/Charts/StackedBarChart";
import ProtectedRoute from "./components/ProtectedRoute";
import Savings from "./components/Savings/Savings";

const dummySavingsData = [
  {
      _id: "1",
      goalName: "Vacation Fund",
      targetAmount: 5000,
      currentAmount: 1500,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
  },
  {
      _id: "2",
      goalName: "Emergency Savings",
      targetAmount: 10000,
      currentAmount: 10000,
      startDate: "2023-06-01",
      endDate: "2025-06-01",
  },
  {
      _id: "3",
      goalName: "Car Purchase",
      targetAmount: 20000,
      currentAmount: 8000,
      startDate: "2023-01-01",
      endDate: "2025-12-31",
  },
  {
      _id: "4",
      goalName: "Wedding Fund",
      targetAmount: 15000,
      currentAmount: 15000,
      startDate: "2023-02-01",
      endDate: "2024-12-31",
  },
];





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await refreshToken();
        console.log("Token refreshed:", result.token);
        localStorage.setItem("token", result.token); // Update token in localStorage
        setIsAuthenticated(!!result.token); // Update authentication state
      } catch (error) {
        console.error("Error refreshing token:", error);
        setIsAuthenticated(false); // Logout if token refresh fails
        localStorage.removeItem("token");
      }
    }, 5 * 60 * 1000); // Refresh token every 5 minutes

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/auth/login",
      element: <LoginLayout />,
      children: [
        { path: "", element: <Login /> },
      ],
    },
    {
      path: "/auth/register",
      element: <LoginLayout />,
      children: [
        { path: "", element: <Register /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        { path: "expenses", element: <Expenses /> },
        { path: "income", element: <Income /> },
        { path: "reports", element: <StackedBarChart /> },
        {path:"savings",element: <Savings savingsData={dummySavingsData} />}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

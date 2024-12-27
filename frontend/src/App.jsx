import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CheckAuth from "./components/common/CheckAuth";
import { checkAuth } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Toaster } from "react-hot-toast";
import UserLayout from "./components/layouts/UserLayout";
import Dashboard from "./pages/Dashboard/DashBoard";
import NotFound from "./pages/error/NotFound";
import Loading from "./components/loading/Loading";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
      <Loading type={'spokes'} color={"#702DFF"}/>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <UserLayout user={user} />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Dashboard />} />
          <Route path="income" element={<Dashboard />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="savings" element={<Dashboard />} />
          <Route path="budgets" element={<Dashboard />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="notifications" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
          <Route path="help" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;

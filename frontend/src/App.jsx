import "./App.css";
import Login from "./pages/login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      children: [{ path: "/login", element: <Login /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

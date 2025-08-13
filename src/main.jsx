import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";
import ErrorPage from "./error-page";
import "./main.css";
import Create from "./pages/create";
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Signup from "./pages/signup";
import AlertRoot from "./roots/alert_root";
import HomeRoot from "./roots/home_root";
import MainRoot from "./roots/main_root";

const router = createBrowserRouter([
  {
    element: <AlertRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <HomeRoot />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <Profile /> },
          { path: "/messages", element: <Messages /> },
          { path: "/logout", element: <Logout /> },
        ],
      },
      {
        element: <MainRoot />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
          { path: "/create", element: <Create /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorSchemeProvider>
      <AuthProvider>
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      </AuthProvider>
    </ColorSchemeProvider>
  </StrictMode>
);

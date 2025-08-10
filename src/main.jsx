import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";
import ErrorPage from "./error-page";
import "./main.css";
import Home from "./pages/home";
import Logout from "./pages/logout";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import HomeRoot from "./pages/home_root";
import MainRoot from "./pages/main_root";
import Login from "./pages/login";
import Signup from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/messages", element: <Messages /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
  {
    element: <MainRoot />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorSchemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ColorSchemeProvider>
  </StrictMode>
);

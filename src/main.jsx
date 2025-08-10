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
import Root from "./pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/messages", element: <Messages /> },
      { path: "/logout", element: <Logout /> },
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

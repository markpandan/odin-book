import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./main.css";
import Home from "./pages/home";
import Root from "./pages/root";
import Logout from "./pages/logout";
import { ColorSchemeProvider } from "./contexts/ColorSchemeContext";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
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

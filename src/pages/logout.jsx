import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setToken();
    navigate("/login", { replace: true });
  }, [setToken, navigate]);
};

export default Logout;

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setToken();
    navigate("/login", { replace: true });
  }, [setToken, navigate]);
};

export default Logout;

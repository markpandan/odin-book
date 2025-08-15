import { Outlet } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import AlertPopup from "../components/AlertPopup";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const AlertRoot = () => {
  const { alert, setAlert } = useAlert();
  const { user } = useAuth();

  return (
    <>
      {alert.status && (
        <AlertPopup
          status={alert.status || undefined}
          value={alert.message}
          onClose={() => setAlert({})}
        />
      )}
      <Navbar user={user} />
      <Outlet />
    </>
  );
};

export default AlertRoot;

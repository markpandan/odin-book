import { Outlet } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import AlertPopup from "../components/AlertPopup";

const AlertRoot = () => {
  const { alert, setAlert } = useAlert();

  return (
    <>
      {alert && <AlertPopup onClose={() => setAlert("")} />}
      <Outlet />
    </>
  );
};

export default AlertRoot;

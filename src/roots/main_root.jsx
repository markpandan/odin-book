import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainRoot = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl p-4 text-start">
        <Outlet />
      </div>
    </>
  );
};

export default MainRoot;

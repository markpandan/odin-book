import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ctl from "@netlify/classnames-template-literals";
import AsideNavigation from "../components/AsideNavigation";

const Root = () => {
  return (
    <>
      <Navbar />
      <div
        className={ctl(`
          container mx-auto flex max-w-7xl grow
          *:py-8 *:not-nth-[2]:px-4
        `)}
      >
        <AsideNavigation className={"w-1/7 shrink-0"} />
        <Outlet />
      </div>
    </>
  );
};

export default Root;

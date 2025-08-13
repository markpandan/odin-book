import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ctl from "@netlify/classnames-template-literals";
import AsideNavigation from "../components/AsideNavigation";
import { useState } from "react";
import CommentModal from "../components/CommentModal";

const HomeRoot = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="relative">
        {isCommentModalOpen && (
          <CommentModal onClose={() => setIsCommentModalOpen(false)} />
        )}
        <div
          className={ctl(`
            container mx-auto flex max-w-7xl
            *:py-8 *:not-nth-[2]:px-4
          `)}
        >
          <AsideNavigation className={"w-1/7 shrink-0"} />
          <Outlet context={{ setIsCommentModalOpen }} />
        </div>
      </div>
    </>
  );
};

export default HomeRoot;

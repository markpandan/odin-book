import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AsideNavigation from "../components/AsideNavigation";
import CommentModal from "../components/CommentModal";
import Navbar from "../components/Navbar";

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

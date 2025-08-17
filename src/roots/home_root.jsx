import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AsideNavigation from "../components/AsideNavigation";
import CommentModal from "../components/CommentModal";
import LeaderboardContainer from "../components/LeaderboardColumn";
import useAuth from "../hooks/useAuth";

const HomeRoot = () => {
  const [commentModal, setCommentModal] = useState({ open: false, post: "" });
  const { user } = useAuth();

  return (
    <>
      <div className="relative h-full">
        {commentModal.open && (
          <CommentModal
            post={commentModal.post}
            onClose={() => setCommentModal({ open: false, post: "" })}
          />
        )}
        <div
          className={ctl(`
            container mx-auto flex h-[inherit] max-w-7xl
            *:py-8 *:not-nth-[2]:px-4
          `)}
        >
          <AsideNavigation user={user} className={"h-min w-1/7 shrink-0"} />
          <Outlet context={{ user, setCommentModal }} className="" />
          <div className="w-2/7">
            <LeaderboardContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRoot;

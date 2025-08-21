import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AsideNavigation from "../components/AsideNavigation";
import CommentModal from "../components/CommentModal";
import CreateNewChatModal from "../components/CreateNewChatModal";
import LeaderboardContainer from "../components/LeaderboardColumn";
import useAuth from "../hooks/useAuth";

const HomeRoot = () => {
  const [commentModal, setCommentModal] = useState({ open: false, post: "" });
  const [isCreateNewChatOpen, setIsCreateNewChatOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {isCreateNewChatOpen && (
        <CreateNewChatModal onClose={() => setIsCreateNewChatOpen(false)} />
      )}
      {commentModal.open && (
        <CommentModal
          post={commentModal.post}
          onClose={() => setCommentModal({ open: false, post: "" })}
        />
      )}
      <div className="h-full">
        <div
          className={ctl(`
            relative container mx-auto flex h-[inherit] max-w-7xl
            *:pt-7 *:not-nth-[2]:px-2 *:sm:not-nth-[2]:px-4
          `)}
        >
          <AsideNavigation
            user={user}
            className={ctl(`
              sticky top-[4.05rem] left-0 hidden h-min shrink-0
              sm:block sm:w-1/4
              lg:w-1/7
            `)}
          />
          <Outlet context={{ user, setCommentModal, setIsCreateNewChatOpen }} />
          <div
            className={ctl(`
              sticky top-[4.05rem] right-0 hidden h-min
              lg:block lg:w-2/7
            `)}
          >
            <LeaderboardContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRoot;

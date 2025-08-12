import ctl from "@netlify/classnames-template-literals";
import CommentModal from "../components/CommentModal";
import FollowedColumn from "../components/FollowedColumn";
import PostContainer from "../components/PostContainer";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { setIsCommentModalOpen } = useOutletContext();

  return (
    <>
      <div
        className={ctl(`
          flex w-4/7 flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)] px-4
        `)}
      >
        {Array(3)
          .fill()
          .map((_, index) => (
            <PostContainer
              key={index}
              onComment={() => setIsCommentModalOpen(true)}
            />
          ))}
      </div>
      <FollowedColumn width={"w-2/7"} />
    </>
  );
};

export default Home;

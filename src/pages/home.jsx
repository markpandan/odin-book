import ctl from "@netlify/classnames-template-literals";
import { useOutletContext } from "react-router-dom";
import FollowedColumn from "../components/FollowedColumn";
import LoadingText from "../components/LoadingText";
import PostContainer from "../components/PostContainer";
import useGetData from "../hooks/useGetData";

const Home = () => {
  const { setCommentModal } = useOutletContext();

  const { data: postData, loading } = useGetData("posts");

  return (
    <>
      <div
        className={ctl(`
          flex w-4/7 flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)] px-4
        `)}
      >
        {loading && <LoadingText />}

        {postData.map((post) => (
          <PostContainer
            key={post.id}
            user={`${post.user.firstname} ${post.user.lastname}`}
            username={post.user.username}
            content={post.content}
            likesCount={post._count.likes}
            commentsCount={post._count.comments}
            onComment={() => setCommentModal({ open: true, post })}
          />
        ))}
      </div>
      <FollowedColumn width={"w-2/7"} />
    </>
  );
};

export default Home;

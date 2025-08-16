import ctl from "@netlify/classnames-template-literals";
import { useOutletContext } from "react-router-dom";
import FollowedColumn from "../components/FollowedColumn";
import LoadingText from "../components/LoadingText";
import PostContainer from "../components/PostContainer";
import useGetData from "../hooks/useGetData";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { setCommentModal } = useOutletContext();
  const { user } = useAuth();

  const { data: postData, loading } = useGetData(`posts?relationTo=${user.id}`);

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
            postId={post.id}
            user={`${post.user.firstname} ${post.user.lastname}`}
            username={post.user.username}
            profile={post.user.profile_url}
            content={post.content}
            likesCount={post._count.likes}
            isLiked={post.liked}
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

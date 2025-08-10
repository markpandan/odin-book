import ctl from "@netlify/classnames-template-literals";
import FollowedColumn from "../components/FollowedColumn";
import PostContainer from "../components/PostContainer";

const Home = () => {
  return (
    <>
      <div
        className={ctl(`
          flex w-4/7 flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)] px-4
        `)}
      >
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>
      <FollowedColumn width={"w-2/7"} />
    </>
  );
};

export default Home;

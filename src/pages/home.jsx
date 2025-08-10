import ctl from "@netlify/classnames-template-literals";
import AsideNavigation from "../components/AsideNavigation";
import FollowedColumn from "../components/FollowedColumn";
import PostContainer from "../components/PostContainer";

const Home = () => {
  return (
    <div
      className={ctl(`
        container mx-auto flex max-w-7xl grow
        *:px-4 *:py-8
      `)}
    >
      <AsideNavigation className={"w-1/7"} />
      <div
        className={ctl(`
          flex w-4/7 flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)]
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
    </div>
  );
};

export default Home;

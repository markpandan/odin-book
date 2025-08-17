import ctl from "@netlify/classnames-template-literals";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <>
      <div
        className={ctl(`
          flex w-4/7 flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)] px-4
        `)}
      >
        <PostList />
      </div>
    </>
  );
};

export default Home;

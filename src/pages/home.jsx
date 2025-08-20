import ctl from "@netlify/classnames-template-literals";
import PostList from "../components/PostList";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <div
        className={ctl(`
          flex grow flex-col gap-4 overflow-y-auto border-x-1 border-[var(--highlight-color)] px-4
          sm:w-3/4
          lg:w-4/7
        `)}
      >
        <PostList relationTo={user.id} />
      </div>
    </>
  );
};

export default Home;

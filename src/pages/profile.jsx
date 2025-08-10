import ctl from "@netlify/classnames-template-literals";
import FollowedColumn from "../components/FollowedColumn";
import { PersonCircle } from "react-bootstrap-icons";
import PostContainer from "../components/PostContainer";

const Profile = () => {
  return (
    <>
      <div className="w-4/7 border-x-1 border-[var(--highlight-color)] px-0">
        <div className="relative mb-20 h-40 border-b-1 border-[var(--highlight-color)]">
          <div
            className={ctl(`
              absolute bottom-[-40%] left-8 flex size-30 items-center justify-center rounded-full
              bg-[var(--secondary-color)]
            `)}
          >
            <PersonCircle className="size-25" />
          </div>
          <button
            className={ctl(`
              absolute right-5 bottom-[-30%] cursor-pointer rounded-2xl bg-[var(--accent-color)]
              px-4 py-1
            `)}
          >
            Edit Profile
          </button>
        </div>
        <div className="border-b-1 border-[var(--highlight-color)] px-8">
          <div className="mb-8">
            <h2 className="text-2xl">John Smith</h2>
            <div className="*:inline">
              <p className="mr-4">
                32 <span className="opacity-60">Following</span>
              </p>
              <p>
                523 <span className="opacity-60">Followers</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 pt-8">
          <div className="text-2xl">Posts</div>
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
        </div>
      </div>
      <FollowedColumn width={"w-2/7"} />
    </>
  );
};

export default Profile;

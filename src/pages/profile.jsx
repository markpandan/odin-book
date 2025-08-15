import ctl from "@netlify/classnames-template-literals";
import { useEffect } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { useOutletContext, useParams } from "react-router-dom";
import FollowedColumn from "../components/FollowedColumn";
import LoadingText from "../components/LoadingText";
import PostContainer from "../components/PostContainer";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useGetData from "../hooks/useGetData";

const Profile = () => {
  const { setAlert } = useAlert();
  const { setCommentModal } = useOutletContext();
  const { username } = useParams();
  const { user: currentUser } = useAuth();

  const {
    data: userData,
    loading,
    error,
  } = useGetData(`users/${username.slice(1)}/posts`);

  useEffect(() => {
    if (!error) return;

    setAlert({ status: "error", message: error });
  }, [setAlert, error]);

  const parentClassValues = ctl(
    "w-4/7 border-x-1 border-[var(--highlight-color)] px-0"
  );

  if (loading) {
    return (
      <>
        <div className={parentClassValues}>
          <LoadingText />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={parentClassValues}>
        <div className="relative mb-20 h-40 border-b-1 border-[var(--highlight-color)]">
          <div
            className={ctl(`
              absolute bottom-[-40%] left-8 flex size-30 items-center justify-center rounded-full
              bg-[var(--secondary-color)]
            `)}
          >
            <PersonCircle className="size-25" />
          </div>
          {userData.id == currentUser.id ? (
            <button
              className={ctl(`
                absolute right-5 bottom-[-30%] cursor-pointer rounded-2xl bg-[var(--accent-color)]
                px-4 py-1
              `)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className={ctl(`
                absolute right-5 bottom-[-30%] cursor-pointer rounded-2xl bg-[var(--accent-color)]
                px-4 py-1
              `)}
            >
              Follow
            </button>
          )}
        </div>
        <div className="border-b-1 border-[var(--highlight-color)] px-8">
          <div className="mb-8">
            <h2 className="text-2xl">{`${userData.firstname} ${userData.lastname}`}</h2>
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
          {userData.posts && userData.posts.length == 0 && (
            <div
              className={ctl(`
                flex h-20 items-center justify-center rounded-2xl bg-[var(--secondary-color)]
              `)}
            >
              <p className="italic">This person hasn't made any posts yet</p>
            </div>
          )}
          {userData.posts &&
            userData.posts.map((post) => (
              <PostContainer
                key={post.id}
                user={`${userData.firstname} ${userData.lastname}`}
                username={userData.username}
                content={post.content}
                likesCount={post._count.likes}
                commentsCount={post._count.comments}
                onComment={() =>
                  setCommentModal({
                    open: true,
                    post: {
                      ...post,
                      user: {
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                      },
                    },
                  })
                }
              />
            ))}
        </div>
      </div>
      <FollowedColumn width={"w-2/7"} />
    </>
  );
};

export default Profile;

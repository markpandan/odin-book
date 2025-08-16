import ctl from "@netlify/classnames-template-literals";
import { useEffect, useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { useOutletContext, useParams } from "react-router-dom";
import FollowedColumn from "../components/FollowedColumn";
import LoadingText from "../components/LoadingText";
import PostContainer from "../components/PostContainer";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useGetData from "../hooks/useGetData";
import { fetchDelete, fetchPost } from "../utils/fetchUtils";

const Profile = () => {
  const { setAlert } = useAlert();
  const { setCommentModal } = useOutletContext();
  const { username } = useParams();
  const { user: currentUser, token } = useAuth();

  const [followLoading, setFollowLoading] = useState(false);

  const {
    data: userData,
    loading: userLoading,
    setLoading: setUserLoading,
    error,
  } = useGetData(
    `users/${username.slice(1)}/posts?relationTo=${currentUser.id}`
  );

  useEffect(() => {
    if (!error) return;

    setAlert({ status: "error", message: error });
  }, [setAlert, error]);

  const parentClassValues = ctl(
    "w-4/7 border-x-1 border-[var(--highlight-color)] px-0"
  );

  if (userLoading) {
    return (
      <>
        <div className={parentClassValues}>
          <LoadingText />
        </div>
      </>
    );
  }

  const handleFollow = async (action) => {
    if (!token) {
      setAlert({
        status: "error",
        message: "You must have an accounut to follow a user",
      });
    }

    setFollowLoading(true);

    let response;
    if (action == "add") {
      response = await fetchPost(
        `users/${userData.id}/follow`,
        undefined,
        token
      );
    } else if (action == "delete") {
      response = await fetchDelete(
        `users/${userData.id}/follow/remove`,
        undefined,
        token
      );
    }

    const data = await response.json();
    setFollowLoading(false);

    if (!response.ok) setAlert({ status: "error", message: data.message });
    else {
      setAlert({ status: "success", message: data.message });
      setUserLoading(true);
    }
  };

  return (
    <>
      <div className={parentClassValues}>
        <div className="relative mb-20 h-40 border-b-1 border-[var(--highlight-color)]">
          <div
            className={ctl(`
              absolute bottom-[-40%] left-8 flex items-center justify-center rounded-full
              bg-[var(--tertiary-color)]
            `)}
          >
            {userData.profile_url ? (
              <img
                src={userData.profile_url}
                alt="profile"
                className="size-25 object-fill"
              />
            ) : (
              <PersonCircle className="size-25" />
            )}
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
          ) : userData.followed ? (
            <button
              disabled={followLoading}
              onClick={() => handleFollow("delete")}
              className={ctl(`
                absolute right-5 bottom-[-30%] cursor-pointer rounded-2xl bg-[var(--accent-color)]
                px-4 py-1
                disabled:opacity-50
              `)}
            >
              Followed
            </button>
          ) : (
            <button
              disabled={followLoading}
              onClick={() => handleFollow("add")}
              className={ctl(`
                absolute right-5 bottom-[-30%] cursor-pointer rounded-2xl px-4 py-1 ring-2
                ring-[var(--accent-color)]
                disabled:opacity-50
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
                {userData._count && userData._count.following}{" "}
                <span className="opacity-60">Following</span>
              </p>
              <p>
                {userData._count && userData._count.followers}{" "}
                <span className="opacity-60">Followers</span>
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
                postId={post.id}
                user={`${userData.firstname} ${userData.lastname}`}
                username={userData.username}
                profile={userData.profile_url}
                content={post.content}
                likesCount={post._count.likes}
                isLiked={post.liked}
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

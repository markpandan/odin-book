import ctl from "@netlify/classnames-template-literals";
import { useEffect, useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import LoadingText from "../components/LoadingText";
import PostList from "../components/PostList";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useGetData from "../hooks/useGetData";
import { fetchDelete, fetchPost } from "../utils/fetchUtils";

const Profile = () => {
  const { setAlert } = useAlert();
  const { username } = useParams();
  const { user: currentUser, token } = useAuth();

  const [followLoading, setFollowLoading] = useState(false);

  const {
    data: userProfile,
    loading: userLoading,
    setRefresh,
    error,
  } = useGetData(`users/${username.slice(1)}?relationTo=${currentUser.id}`);

  useEffect(() => {
    if (!error) return;

    setAlert({ status: "error", message: error });
  }, [setAlert, error]);

  const parentClassValues = ctl(
    "w-4/7 border-x-1 border-[var(--highlight-color)] px-0"
  );

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
        `users/${userProfile.id}/follow`,
        undefined,
        token
      );
    } else if (action == "delete") {
      response = await fetchDelete(
        `users/${userProfile.id}/follow/remove`,
        undefined,
        token
      );
    }

    const data = await response.json();
    setFollowLoading(false);

    if (!response.ok) setAlert({ status: "error", message: data.message });
    else {
      setAlert({ status: "success", message: data.message });
      setRefresh(true);
    }
  };

  if (userLoading) {
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
              absolute bottom-[-40%] left-8 flex items-center justify-center rounded-full
              bg-[var(--tertiary-color)]
            `)}
          >
            {userProfile.profile_url ? (
              <img
                src={userProfile.profile_url}
                alt="profile"
                className="size-25 object-fill"
              />
            ) : (
              <PersonCircle className="size-25" />
            )}
          </div>
          {userProfile.id == currentUser.id ? (
            <button
              className={ctl(`
                absolute right-5 bottom-[-30%] cursor-pointer rounded-2xl bg-[var(--accent-color)]
                px-4 py-1
              `)}
            >
              Edit Profile
            </button>
          ) : userProfile.followed ? (
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
            <h2 className="text-2xl">{`${userProfile.firstname} ${userProfile.lastname}`}</h2>
            <div className="*:inline">
              <p className="mr-4">
                {userProfile._count && userProfile._count.following}{" "}
                <span className="opacity-60">Following</span>
              </p>
              <p>
                {userProfile._count && userProfile._count.followers}{" "}
                <span className="opacity-60">Followers</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 pt-8">
          <div className="text-2xl">Posts</div>
          {userProfile.posts && userProfile.posts.length == 0 && (
            <div
              className={ctl(`
                flex h-20 items-center justify-center rounded-2xl bg-[var(--secondary-color)]
              `)}
            >
              <p className="italic">This person hasn't made any posts yet</p>
            </div>
          )}
          {userProfile.id && userProfile._count.posts ? (
            <PostList userId={userProfile.id} relationTo={currentUser.id} />
          ) : (
            <div
              className={ctl(`
                flex h-20 items-center justify-center rounded-2xl bg-[var(--secondary-color)]
              `)}
            >
              <p className="italic">This person hasn't made any posts yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

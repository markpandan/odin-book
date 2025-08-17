import ctl from "@netlify/classnames-template-literals";
import { PersonCircle } from "react-bootstrap-icons";
import useGetData from "../hooks/useGetData";
import LoadingText from "./LoadingText";
import { useEffect } from "react";
import useAlert from "../hooks/useAlert";
import { Link } from "react-router-dom";

const LeaderboardContainer = () => {
  const { data, loading, error } = useGetData("users/leaderboards");
  const { setAlert } = useAlert();

  useEffect(() => {
    if (!error) return;

    setAlert(error);
  }, [error, setAlert]);

  return (
    <div
      className={ctl(`
        w-full rounded-xl bg-[var(--secondary-color)] p-4 pb-8 text-xl
        not-dark:shadow-md
      `)}
    >
      <h2 className="mb-4 text-2xl">Top Users</h2>
      {loading && <LoadingText />}
      <div className="flex flex-col gap-4">
        {data.map((user) => (
          <div key={user.id}>
            {user.profile_url ? (
              <img src={user.profile_url} alt="Profile" />
            ) : (
              <PersonCircle className="mr-4 inline size-10" />
            )}
            <div className="inline-block align-middle">
              <Link
                to={`profile/@${user.username}`}
                className={ctl(`
                  line-clamp-1 text-lg font-bold underline-offset-2
                  hover:underline
                `)}
              >{`${user.firstname} ${user.lastname}`}</Link>
              <p className="line-clamp-1 text-sm italic">
                {user._count.followers} Followers
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardContainer;

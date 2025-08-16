import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import {
  PersonCircle,
  HandThumbsUp,
  HandThumbsUpFill,
  ChatLeft,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { fetchDelete, fetchPost } from "../utils/fetchUtils";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

const PostContainer = ({
  postId,
  user,
  username,
  content,
  likesCount,
  isLiked,
  commentsCount,
  // onLike,
  onComment,
  className = ctl(`
    flex flex-col gap-6 rounded-xl bg-[var(--secondary-color)] p-4
    not-dark:shadow-md
  `),
}) => {
  const { setAlert } = useAlert();
  const { token } = useAuth();
  const [like, setLike] = useState(isLiked);
  const [loading, setLoading] = useState(false);
  const [countLikes, setCountLikes] = useState(likesCount);

  const handleLike = async () => {
    if (!token) {
      setAlert({
        status: "error",
        message: "You must have an account to like a post",
      });
      return;
    }

    setLoading(true);
    let response, action;
    if (like) {
      response = await fetchDelete(
        `posts/${postId}/like/remove`,
        undefined,
        token
      );
      action = "delete";
    } else {
      response = await fetchPost(`posts/${postId}/like`, undefined, token);
      action = "add";
    }

    const data = await response.json();
    setLoading(false);

    if (!response.ok) setAlert({ status: "error", message: data.message });
    else {
      setAlert({});
      setLike(!like);

      if (action == "delete") setCountLikes(countLikes - 1);
      else if (action == "add") setCountLikes(countLikes + 1);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <PersonCircle className="mr-2 inline size-10 shrink-0" />
        <div>
          <Link
            to={`/profile/@${username}`}
            className={ctl(`
              underline-offset-2
              hover:underline
            `)}
          >
            {user}
          </Link>
          <p className="text-xs opacity-75">2h ago</p>
        </div>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div>
        <div
          className={ctl(`
            flex justify-between
            *:text-sm *:italic
          `)}
        >
          <p className="h-5">{countLikes ? `${countLikes} like(s)` : ""}</p>
          <p className="h-5">
            {commentsCount ? `${commentsCount} comment(s)` : ""}
          </p>
        </div>
        <hr className="my-2 border-[var(--highlight-color)]" />
        <div
          className={ctl(`
            flex justify-around
            *:cursor-pointer *:rounded-xl *:px-4 *:py-2
            *:not-disabled:hover:bg-[var(--accent-color)] *:disabled:opacity-50
          `)}
        >
          <button
            disabled={loading}
            onClick={handleLike}
            className={
              like
                ? ctl(`
                  text-[var(--highlight-color)]
                  hover:text-white
                `)
                : ""
            }
          >
            {like ? (
              <>
                <HandThumbsUpFill className="mr-3 inline size-4" />
                <p className="inline-block align-middle">Liked</p>
              </>
            ) : (
              <>
                <HandThumbsUp className="mr-3 inline size-4" />
                <p className="inline-block align-middle">Like</p>
              </>
            )}
          </button>
          <button onClick={onComment}>
            <ChatLeft className="mr-3 inline size-4" />
            <p className="inline-block align-middle">Comment</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;

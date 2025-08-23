import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { PersonCircle, XLg } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import useGetData from "../hooks/useGetData";
import useScrollLock from "../hooks/useScrollLock";
import { fetchPost } from "../utils/fetchUtils";
import ButtonWithLoader from "./ButtonWithLoader";
import CommentItem from "./CommentItem";
import LoadingText from "./LoadingText";
import PostItem from "./PostItem";

const CommentModal = ({ post, onClose }) => {
  const { token, user } = useAuth();
  const { setAlert } = useAlert();
  const {
    data: commentData,
    loading: dataLoading,
    setRefresh,
  } = useGetData(`posts/${post.id}/comments`);
  const { inputs, setInputs, handleChange } = useForm({});

  const [submitLoading, setSubmitLoading] = useState(false);

  useScrollLock();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    const response = await fetchPost(
      `posts/${post.id}/comment`,
      { content: inputs.comment },
      token
    );

    const data = await response.json();
    setSubmitLoading(false);

    if (!response.ok) {
      setAlert({ status: "error", message: data.message });
    } else {
      setAlert({
        status: "success",
        message: "Comment successfully submitted",
      });
      setRefresh(true);
      setInputs({ comment: "" });
    }
  };

  return (
    <div
      className={ctl(`
        fixed top-15 z-5 h-full max-h-full w-full overflow-y-auto px-4 pt-8 pb-24
        not-dark:bg-white/75
        dark:bg-black/75
      `)}
    >
      <div
        className={ctl(`
          m-auto w-full max-w-4xl rounded-2xl bg-[var(--secondary-color)]
          *:not-nth-[2]:p-4
          not-dark:shadow-2xl
        `)}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Post</h1>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              onClose();
            }}
          >
            <span className="sr-only">Close</span>
            <XLg role="img" className="size-6" />
          </button>
        </div>
        <hr className="border-[var(--highlight-color)]" />
        <PostItem
          className={ctl(`
            flex flex-col gap-6 bg-[var(--secondary-color)] p-4
            not-dark:shadow-md
            dark:border-b-1 dark:border-[var(--primary-color)]
          `)}
          user={`${post.user.firstname} ${post.user.lastname}`}
          profile={post.user.profile_url}
          username={post.user.username}
          date={post.createdAt}
          postId={post.id}
          content={post.content}
          image={post.images[0]}
          likesCount={post._count.likes}
          isLiked={post.liked}
          commentsCount={post._count.comments}
        />

        <div className="flex flex-col gap-4">
          {dataLoading && (
            <div className="flex h-50 items-center justify-center">
              <LoadingText />
            </div>
          )}
          {!dataLoading && commentData.length == 0 && (
            <div className="flex h-20 items-center justify-center">
              <p
                className={ctl(`
                  rounded-2xl bg-[var(--primary-color)] px-4 py-2 italic
                  not-dark:shadow-md
                `)}
              >
                No comments sent
              </p>
            </div>
          )}
          {commentData.map((comment, index) => (
            <CommentItem
              key={index}
              user={`${comment.user.firstname} ${comment.user.lastname}`}
              profile={comment.user.profile_url}
            >
              {comment.content}
            </CommentItem>
          ))}
        </div>
        {Object.keys(user).length == 0 ? (
          <div className="border-t-1 border-[var(--primary-color)] text-center">
            <h2 className="mb-4 italic">
              You need an accout to make a comment
            </h2>
            <div className="mx-auto flex justify-center gap-4">
              <Link
                to="/login"
                className="rounded-2xl bg-[var(--accent-color)] px-4 py-1"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-2xl bg-[var(--accent-color)] px-4 py-1"
              >
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border-t-1 border-[var(--primary-color)]"
          >
            <div className="mb-2 flex gap-4">
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              {user.profile_url ? (
                <img
                  src={user.profile_url}
                  alt="profile"
                  className="inline size-12 shrink-0 object-fill"
                />
              ) : (
                <PersonCircle className="size-12 shrink-0" />
              )}

              <textarea
                name="comment"
                id="comment"
                onChange={handleChange}
                value={inputs.comment}
                className={ctl(`
                  w-full resize-none rounded-2xl border-1 border-[var(--accent-color)]
                  bg-[var(--tertiary-color)] p-4
                `)}
                placeholder="Write a comment"
              ></textarea>
            </div>
            <ButtonWithLoader
              type="submit"
              isLoading={submitLoading}
              className={ctl(`
                ml-auto flex w-max cursor-pointer items-center gap-4 rounded-2xl
                bg-[var(--accent-color)] px-4 py-2
              `)}
            >
              {submitLoading ? "Commenting..." : "Comment"}
            </ButtonWithLoader>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentModal;

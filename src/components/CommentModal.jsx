import ctl from "@netlify/classnames-template-literals";
import { PersonCircle, XLg } from "react-bootstrap-icons";
import PostContainer from "./PostContainer";
import CommentItem from "./CommentItem";

const CommentModal = ({ onClose }) => {
  return (
    <div
      className={ctl(`
        absolute z-5 h-full w-full pt-8
        not-dark:bg-white/75
        dark:bg-black/75
      `)}
    >
      <div
        className={ctl(`
          m-auto w-max max-w-4xl rounded-2xl bg-[var(--secondary-color)]
          *:not-nth-[2]:p-4
          not-dark:shadow-2xl
        `)}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Post</h1>
          <button type="button" className="cursor-pointer" onClick={onClose}>
            <span className="sr-only">Close</span>
            <XLg role="img" className="size-6" />
          </button>
        </div>
        <hr className="border-[var(--highlight-color)]" />
        <PostContainer
          className={ctl(`
            flex flex-col gap-6 bg-[var(--secondary-color)] p-4
            not-dark:shadow-md
            dark:border-b-1 dark:border-[var(--primary-color)]
          `)}
        />

        <div className="flex flex-col gap-4">
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </div>
        <form action="" className="border-t-1 border-[var(--primary-color)]">
          <div className="mb-2 flex gap-4">
            <label htmlFor="comment" className="sr-only">
              Comment
            </label>
            <PersonCircle className="size-12 shrink-0" />
            <textarea
              name="comment"
              id="comment"
              className={ctl(`
                w-full resize-none rounded-2xl border-1 border-[var(--accent-color)]
                bg-[var(--tertiary-color)] p-4
              `)}
              placeholder="Write a comment"
            ></textarea>
          </div>
          <button className="ml-auto block rounded-2xl bg-[var(--accent-color)] px-4 py-2">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;

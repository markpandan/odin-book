import ctl from "@netlify/classnames-template-literals";
import { XLg } from "react-bootstrap-icons";

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
          m-auto h-100 w-max min-w-xl rounded-2xl bg-[var(--secondary-color)]
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
      </div>
    </div>
  );
};

export default CommentModal;

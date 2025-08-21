import ctl from "@netlify/classnames-template-literals";
import { XLg } from "react-bootstrap-icons";
import useScrollLock from "../hooks/useScrollLock";

const CreateNewChatModal = ({ onClose }) => {
  useScrollLock();

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
          <h1 className="text-2xl">Create New Chat</h1>
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
        <div>
          <h2 className="mb-4 text-lg">Available Users</h2>
          <div className="h-100 overflow-y-auto rounded-lg bg-[var(--tertiary-color)]"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewChatModal;

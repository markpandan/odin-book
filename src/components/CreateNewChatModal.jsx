import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useFormSubmit from "../hooks/useFormSubmit";
import useInteractiveFetch from "../hooks/useInteractiveFetch";
import useScrollLock from "../hooks/useScrollLock";
import LoadingText from "./LoadingText";

const CreateNewChatModal = ({ onNew, onClose }) => {
  const { token } = useAuth();
  const { setAlert } = useAlert();
  const [selectedUser, setSelectedUser] = useState("");

  useScrollLock();

  const { loading: addLoading, handleSubmit } = useFormSubmit(
    "chats/add",
    { ids: [selectedUser] },
    token
  )
    .success(() => {
      setAlert({});
      onNew();
      onClose();
    })
    .fail((message) => {
      setAlert({ status: "error", message });
    });

  const {
    data: userData,
    loading: userLoading,
    scrollRef,
    endFetch,
  } = useInteractiveFetch("chats/outside", { token });

  return (
    <div
      className={ctl(`
        fixed top-15 left-0 z-5 h-full max-h-full w-full overflow-y-auto px-4 pt-8 pb-24
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
        <div className="flex flex-col gap-4">
          <h2 className="text-start text-lg">Select A User</h2>
          <div className="relative flex h-100 flex-col gap-4 overflow-y-auto pr-5">
            {addLoading && (
              <div
                className={ctl(`
                  absolute flex h-full w-full items-center justify-center rounded-lg bg-black/50
                `)}
              >
                <LoadingText text="Adding New User" />
              </div>
            )}

            {userData.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={ctl(
                  `
                    cursor-pointer rounded-lg
                    ${
                      selectedUser == user.id
                        ? `bg-[var(--accent-color)]`
                        : `bg-[var(--tertiary-color)]`
                    }
                    p-4 text-start
                    not-dark:shadow-md
                  `
                )}
              >
                {`${user.firstname} ${user.lastname}`}
              </button>
            ))}
            <div
              ref={scrollRef}
              className="flex items-center justify-center bg-[var(--tertiary-color)]/50 py-10"
            >
              {userLoading && <LoadingText />}
              {endFetch && <p>No more users</p>}
            </div>
          </div>
          <button
            disabled={!selectedUser}
            onClick={handleSubmit}
            className={ctl(`
              w-max self-center rounded-lg bg-[var(--accent-color)] px-4 py-2
              not-disabled:cursor-pointer
              disabled:opacity-50
            `)}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewChatModal;

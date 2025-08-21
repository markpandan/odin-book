import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { Navigate, useOutletContext } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import useAuth from "../hooks/useAuth";
import CreateNewChatModal from "../components/CreateNewChatModal";

const Messages = () => {
  const { setIsCreateNewChatOpen } = useOutletContext();
  const { token } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState("No Selected User");

  const users = [
    "John Doe Michael",
    "Michael Jordan",
    "James Smith",
    "Alice McCoy",
  ];

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className={ctl(
        `
          flex max-h-full w-screen flex-col
          sm:w-3/4 sm:border-x-1 sm:border-[var(--highlight-color)]
          lg:w-4/7
        `
      )}
    >
      <div
        className={ctl(`
          border-b-1 border-[var(--highlight-color)]
          *:px-4
        `)}
      >
        <div className="mb-4 flex justify-between">
          <h1 className="text-3xl font-semibold">Messages</h1>
          <button
            onClick={() => setIsCreateNewChatOpen(true)}
            className="cursor-pointer rounded-lg bg-[var(--accent-color)] px-4 py-1"
          >
            + Create New
          </button>
        </div>
        <div className="flex flex-nowrap gap-2 overflow-x-auto py-4">
          {users.map((user, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setSelectedUser(user);
              }}
              className={ctl(`
                h-30 w-22 shrink-0 cursor-pointer rounded-2xl
                ${selectedIndex == index ? "bg-[var(--accent-color)]" : ""}
                p-2 text-center
              `)}
            >
              <PersonCircle className="mb-4 inline size-12" />
              <p className="line-clamp-2">{user}</p>
            </button>
          ))}
        </div>
      </div>
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default Messages;

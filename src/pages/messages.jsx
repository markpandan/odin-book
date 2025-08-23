import ctl from "@netlify/classnames-template-literals";
import { useCallback, useEffect, useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { Navigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import CreateNewChatModal from "../components/CreateNewChatModal";
import LoadingText from "../components/LoadingText";
import useAuth from "../hooks/useAuth";
import useGetData from "../hooks/useGetData";
import { socket } from "../socket";

const Messages = () => {
  const { token } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});

  const [isCreateNewChatOpen, setIsCreateNewChatOpen] = useState(false);

  const { data, loading, setRefresh } = useGetData("chats/list", token);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRoomChange = useCallback((from, to) => {
    socket.emit("switch room", from, to);
  }, []);

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
      {isCreateNewChatOpen && (
        <CreateNewChatModal
          onNew={() => {
            setRefresh(true);
          }}
          onClose={() => setIsCreateNewChatOpen(false)}
        />
      )}
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
        <div className="relative flex flex-nowrap gap-2 overflow-x-auto py-4">
          {loading && <LoadingText />}
          {data.map((chat) => {
            const currentChatUser = chat.users[0];
            const fullname = `${currentChatUser.firstname} ${currentChatUser.lastname}`;

            return (
              <button
                key={currentChatUser.id}
                onClick={() => {
                  handleRoomChange(selectedUser.chatId, chat.id);
                  setSelectedIndex(currentChatUser.id);
                  setSelectedUser({ fullname, chatId: chat.id });
                }}
                className={ctl(`
                  h-30 w-22 shrink-0 cursor-pointer rounded-2xl
                  ${
                    selectedIndex == currentChatUser.id
                      ? "bg-[var(--accent-color)]"
                      : ""
                  }
                  p-2 text-center
                `)}
              >
                <PersonCircle className="mb-4 inline size-12" />
                <p className="line-clamp-2">{fullname}</p>
              </button>
            );
          })}
        </div>
      </div>
      {Object.keys(selectedUser).length !== 0 ? (
        <ChatWindow selectedUser={selectedUser} />
      ) : (
        <div className="flex grow items-center justify-center">
          <p className="text-2xl">Select A User To Continue</p>
        </div>
      )}
    </div>
  );
};

export default Messages;

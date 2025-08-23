import ctl from "@netlify/classnames-template-literals";
import { useEffect, useState } from "react";
import { InfoCircle, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import useFormSubmit from "../hooks/useFormSubmit";
import useInteractiveFetch from "../hooks/useInteractiveFetch";
import { socket } from "../socket";
import LoadingText from "./LoadingText";

const ChatWindow = ({ selectedUser }) => {
  const { token, user } = useAuth();
  const { setAlert } = useAlert();
  const [messages, setMessages] = useState([]);
  const { inputs, setInputs, handleChange } = useForm({
    message: "",
  });

  const [offset, setOffset] = useState(0);

  const chatBalloonStyle = {
    user: ctl(
      "max-w-8/10 self-end rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-lg"
    ),
    other: ctl(
      "max-w-8/10 self-start rounded-2xl bg-[var(--tertiary-color)] px-4 py-2 text-lg"
    ),
  };

  useEffect(() => {
    const onChatMessage = (msg, senderId, callback) => {
      setMessages((messages) => [{ senderId, content: msg }, ...messages]);
      setOffset((offset) => offset + 1);

      callback();
    };

    socket.on("chat message", onChatMessage);
    return () => {
      socket.off("chat message", onChatMessage);
    };
  }, [selectedUser.chatId]);

  const {
    data: chatData,
    loading: chatLoading,
    scrollRef,
    endFetch,
  } = useInteractiveFetch(`chats/${selectedUser.chatId}`, {
    length: 10,
    offset,
    token,
  });

  useEffect(() => {
    setMessages([
      ...chatData.map((chat) => ({
        senderId: chat.senderId,
        content: chat.content,
      })),
    ]);
  }, [chatData]);

  const { handleSubmit } = useFormSubmit(
    `chats/${selectedUser.chatId}`,
    { message: inputs.message },
    token
  )
    .success(() => {
      setInputs({ message: "" });
    })
    .fail((message) => {
      setAlert({ status: "error", message });
    });

  return (
    <>
      <div
        className={ctl(`
          flex justify-between bg-[var(--secondary-color)] p-4
          not-dark:shadow-md
        `)}
      >
        <div>
          {selectedUser.profile_url ? (
            <img
              src={selectedUser.profile_url}
              alt="profile"
              className="mr-4 inline size-8 object-fill"
            />
          ) : (
            <PersonCircle className="mr-4 inline size-8" />
          )}

          <h1 className="inline-block align-middle text-xl">
            {selectedUser.fullname}
          </h1>
        </div>
        <Link to={`/profile/@${selectedUser.username}`}>
          <InfoCircle className="size-6" />
        </Link>
      </div>
      <div
        className={ctl(
          `relative flex grow basis-0 flex-col-reverse gap-4 overflow-y-auto p-4`
        )}
      >
        {messages.map((message, index) => (
          <p
            key={index}
            className={
              message.senderId == user.id
                ? chatBalloonStyle["user"]
                : chatBalloonStyle["other"]
            }
          >
            {message.content}
          </p>
        ))}
        <div ref={scrollRef} className="mb-2 self-stretch text-center">
          {chatLoading && <LoadingText />}
          {endFetch && <p>Start of conversation</p>}
          <hr className="mt-5 border-[var(--accent-color)]" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-20 gap-2 border-t-1 border-[var(--highlight-color)] p-4"
      >
        <input
          type="text"
          name="message"
          onChange={handleChange}
          value={inputs.message}
          className="block w-full rounded-2xl bg-[var(--tertiary-color)] px-4"
        />
        <button
          type="submit"
          className={ctl(`
            cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 text-lg font-semibold
            hover:bg-[var(--highlight-color)]
          `)}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default ChatWindow;

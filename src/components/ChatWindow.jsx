import ctl from "@netlify/classnames-template-literals";
import { useEffect, useState } from "react";
import { InfoCircle, PersonCircle } from "react-bootstrap-icons";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import useFormSubmit from "../hooks/useFormSubmit";
import useInteractiveFetch from "../hooks/useInteractiveFetch";
import { socket } from "../socket";
import LoadingText from "./LoadingText";

const ChatWindow = ({ selectedUser }) => {
  const { token } = useAuth();
  const { setAlert } = useAlert();
  const [messages, setMessages] = useState([]);
  const { inputs, setInputs, handleChange } = useForm({
    message: "",
  });

  // To realign the specific start of data needs to be fetch in line with the messages added from the socket
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onChatMessage = (msg) => {
      setMessages((messages) => [msg, ...messages]);
      setOffset((offset) => offset + 1);
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
  } = useInteractiveFetch(`chats/${selectedUser.chatId}`, 10, {
    offset,
    token,
  });

  useEffect(() => {
    setMessages([...chatData.map((chat) => chat.content)]);
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
          <PersonCircle className="mr-4 inline size-8" />
          <h1 className="inline-block align-middle text-xl">
            {selectedUser.fullname}
          </h1>
        </div>
        <button className="cursor-pointer">
          <InfoCircle className="size-6" />
        </button>
      </div>
      <div
        className={ctl(
          `relative flex grow basis-0 flex-col-reverse gap-4 overflow-y-auto p-4`
        )}
      >
        {messages.map((message, index) => (
          <p
            key={index}
            className="max-w-8/10 self-end rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-lg"
          >
            {message}
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

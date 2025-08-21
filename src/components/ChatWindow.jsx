import ctl from "@netlify/classnames-template-literals";
import useForm from "../hooks/useForm";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { PersonCircle, InfoCircle } from "react-bootstrap-icons";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const { inputs, setInputs, handleChange } = useForm({
    message: "",
  });

  useEffect(() => {
    const onChatMessage = (msg) => {
      setMessages((messages) => [msg, ...messages]);
    };

    socket.on("chat message", onChatMessage);

    return () => {
      socket.off("chat message", onChatMessage);
    };
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (inputs.message) {
      socket.emit("chat message", inputs.message);
      setInputs({ message: "" });
    }
  };

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
          <h1 className="inline-block align-middle text-xl">{selectedUser}</h1>
        </div>
        <button className="cursor-pointer">
          <InfoCircle className="size-6" />
        </button>
      </div>
      <div
        className={ctl(`
          flex grow basis-0 flex-col-reverse gap-4 overflow-y-auto p-4
          *:max-w-8/10
        `)}
      >
        {messages.map((message) => (
          <p className="self-end rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-lg">
            {message}
          </p>
        ))}
      </div>
      <form
        onSubmit={handleMessageSubmit}
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

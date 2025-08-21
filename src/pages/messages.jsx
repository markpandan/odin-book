import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { InfoCircle, PersonCircle } from "react-bootstrap-icons";

const Messages = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState("No Selected User");

  const users = [
    "John Doe Michael",
    "Michael Jordan",
    "James Smith",
    "Alice McCoy",
  ];

  return (
    <div
      className={ctl(
        `
          flex flex-col
          sm:w-4/7 sm:border-x-1 sm:border-[var(--highlight-color)]
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
          <button className="cursor-pointer rounded-lg bg-[var(--accent-color)] px-4 py-1">
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
                h-30 w-25 shrink-0 cursor-pointer rounded-2xl
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
          flex grow flex-col-reverse gap-4 p-4
          *:w-8/10
        `)}
      >
        <p className="self-end rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sint,
          sequi quas laboriosam ipsa ipsam delectus ratione aliquid eveniet amet
          quidem doloremque cumque, corporis vel. Inventore quae consectetur et
          dolorem.
        </p>
        <p className="self-start rounded-2xl bg-[var(--secondary-color)] px-4 py-2 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem omnis odio debitis possimus sunt doloribus quo,
          deserunt, sit perferendis vero placeat repellendus, quia excepturi
          assumenda saepe laborum ut corporis temporibus.
        </p>
        <p className="self-start rounded-2xl bg-[var(--secondary-color)] px-4 py-2 text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugit
          reiciendis dicta porro officia rerum nihil voluptatum exercitationem
          vero minima perferendis delectus numquam maxime, necessitatibus fuga
          sint reprehenderit! Consequuntur, molestiae.
        </p>
        <p className="self-end rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
          unde distinctio. Non incidunt debitis fugiat harum fuga veritatis
          vero, nisi alias similique odit ipsa? Aperiam ipsam voluptates qui sit
          repellat!
        </p>
      </div>
      <form className="flex h-20 gap-4 border-t-1 border-[var(--highlight-color)] p-4">
        <input
          type="text"
          className="grow rounded-2xl bg-[var(--tertiary-color)] px-4"
        />
        <button
          className={ctl(`
            cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 text-lg font-semibold
            hover:bg-[var(--highlight-color)]
          `)}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;

import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { HouseDoor, People, ChatDots, Gear } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const AsideNavigation = ({ user, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedStyle = {
    true: ctl("bg-[var(--accent-color)]"),
    false: ctl("hover:bg-[var(--secondary-color)]"),
  };

  const navigations = [
    {
      index: 0,
      name: "Home",
      route: "/",
      icon: <HouseDoor className="size-6 shrink-0" />,
      protected: false,
    },
    {
      index: 1,
      name: "My Profile",
      route: `/profile/@${user.username}`,
      icon: <People className="size-6 shrink-0" />,
      protected: true,
    },
    {
      index: 2,
      name: "Messages",
      route: "/messages",
      icon: <ChatDots className="size-6 shrink-0" />,
      protected: true,
    },
    {
      index: 3,
      name: "Settings",
      route: "/settings",
      icon: <Gear className="size-6 shrink-0" />,
      protected: true,
    },
  ];

  return (
    <div className={className}>
      <ul
        className={ctl(`
          flex flex-col gap-4
          *:w-full *:cursor-pointer *:rounded-2xl *:text-base
          md:*:text-xl
        `)}
      >
        {navigations.map((value) => {
          if (
            !value.protected ||
            (value.protected && Object.keys(user).length != 0)
          ) {
            return (
              <li
                key={value.index}
                className={
                  selectedIndex == value.index
                    ? selectedStyle[true]
                    : selectedStyle[false]
                }
                onClick={() => setSelectedIndex(value.index)}
              >
                <Link
                  to={value.route}
                  className="flex items-center gap-4 px-2 py-2"
                >
                  {value.icon} {value.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default AsideNavigation;

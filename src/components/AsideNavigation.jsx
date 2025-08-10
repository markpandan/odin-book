import ctl from "@netlify/classnames-template-literals";
import { HouseDoor, People, Person } from "react-bootstrap-icons";

const AsideNavigation = ({ className }) => {
  return (
    <div className={className}>
      <ul
        className={ctl(`
          flex flex-col gap-4
          *:w-full *:cursor-pointer *:rounded-2xl *:px-4 *:py-2 *:text-xl
        `)}
      >
        <li className="bg-[var(--accent-color)]">
          <a href="" className="flex items-center gap-4">
            <HouseDoor className="inline size-6 shrink-0" /> Home
          </a>
        </li>
        <li>
          <a href="" className="flex items-center gap-4">
            <Person className="inline size-6 shrink-0" /> Profile
          </a>
        </li>
        <li>
          <a href="" className="flex items-center gap-4">
            <People className="inline size-6 shrink-0" /> Messages
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AsideNavigation;

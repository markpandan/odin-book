import ctl from "@netlify/classnames-template-literals";
import { Moon, PersonCircle, Person, Sun } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useColorScheme from "../hooks/useColorScheme";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSection,
  MenuHeading,
} from "@headlessui/react";

const Navbar = ({ user = {} }) => {
  const { darkMode, setDarkMode } = useColorScheme();

  return (
    <div
      className={ctl(`
        sticky top-0 z-10 flex items-center justify-between bg-[var(--secondary-color)] p-4
        transition-colors duration-300
        *:cursor-pointer
        not-dark:shadow-md
        dark:border-b-1 dark:border-[var(--highlight-color)]
      `)}
    >
      <Link to={"/"} className="text-xl">
        Postly
      </Link>
      <div className="flex items-center gap-4">
        {Object.keys(user).length == 0 ? (
          <>
            <Link
              to="/login"
              className="mr-6 cursor-pointer rounded-md bg-[var(--accent-color)] px-4 py-1"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/create"
              className="rounded-md bg-[var(--accent-color)] px-4 py-1"
            >
              + Create Post
            </Link>
            {/* <Link to="/settings" className="shrink-0">
              <span className="sr-only">{user.username}</span>
              <PersonCircle className="mr-6 size-7" />
            </Link> */}
            <Menu as="div" className={ctl(`relative mr-6 flex items-center`)}>
              <MenuButton as="button" className={"cursor-pointer"}>
                <span className="sr-only">{user.username}</span>
                {user.profile_url ? (
                  <img
                    src={user.profile_url}
                    alt="profile"
                    className="size-8 object-fill"
                  />
                ) : (
                  <PersonCircle className="size-8" />
                )}
              </MenuButton>
              <MenuItems
                modal={false}
                className={ctl(`
                  absolute top-full right-0 mt-2 rounded-lg border-1 border-[var(--highlight-color)]
                  bg-[var(--secondary-color)] p-4 text-end
                `)}
              >
                <MenuSection
                  className={ctl(`
                    *:pr-2 *:pl-4 *:not-first:rounded-lg *:not-first:py-1
                    *:data-focus:bg-[var(--tertiary-color)]
                  `)}
                >
                  <MenuHeading
                    className={
                      "mb-2 w-max border-b-1 border-[var(--primary-color)] py-1"
                    }
                  >
                    <span className="inline-block align-middle">
                      {user.username}
                    </span>
                    <Person className="ml-1 inline-block size-6" />
                  </MenuHeading>
                  <MenuItem>
                    <Link to="/settings" className={ctl(`block`)}>
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/logout" className={ctl(`block`)}>
                      Logout
                    </Link>
                  </MenuItem>
                </MenuSection>
              </MenuItems>
            </Menu>
          </>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={ctl(`
            shrink-0 cursor-pointer
            *:size-6
          `)}
        >
          <span className="sr-only">Dark Mode Toggler</span>
          {darkMode ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

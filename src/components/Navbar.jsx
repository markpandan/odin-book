import ctl from "@netlify/classnames-template-literals";
import {
  Moon,
  PersonCircle,
  Person,
  Sun,
  List,
  XLg,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useColorScheme from "../hooks/useColorScheme";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSection,
  MenuHeading,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import AsideNavigation from "./AsideNavigation";

const Navbar = ({ user = {} }) => {
  const { darkMode, setDarkMode } = useColorScheme();

  return (
    <Disclosure
      as={"nav"}
      className={ctl(`
        sticky top-0 z-10 bg-[var(--secondary-color)] transition-colors duration-300
        *:cursor-pointer
        not-dark:shadow-md
        dark:border-b-1 dark:border-[var(--highlight-color)]
      `)}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4">
          <DisclosureButton
            className={ctl(`
              group block
              sm:hidden
            `)}
          >
            <List
              className={ctl(`
                block size-6 cursor-pointer
                group-data-open:hidden
              `)}
            />
            <XLg
              className={ctl(
                `
                  hidden size-6 cursor-pointer
                  group-data-open:block
                `
              )}
            />
          </DisclosureButton>
          <Link to={"/"} className="text-xl">
            Postly
          </Link>
        </div>
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
              <Menu
                as="div"
                className={ctl(`
                  relative mr-6 hidden items-center
                  sm:flex
                `)}
              >
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
                    absolute top-full right-0 mt-2 rounded-lg border-1
                    border-[var(--highlight-color)] bg-[var(--secondary-color)] p-4 text-end
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
      <DisclosurePanel
        unmount={false}
        transition
        className={ctl(
          `
            fixed h-full w-1/2 origin-left translate-x-0 border-t-1 border-[var(--highlight-color)]
            bg-[var(--tertiary-color)] px-2 py-4 transition duration-200 ease-out
            data-closed:-translate-x-6 data-closed:opacity-0
          `
        )}
      >
        <AsideNavigation user={user} />
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;

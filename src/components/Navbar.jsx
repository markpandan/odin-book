import ctl from "@netlify/classnames-template-literals";
import { Moon, PersonCircle, Sun } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import useColorScheme from "../hooks/useColorScheme";

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
            <Link to="/settings" className="shrink-0">
              <span className="sr-only">{user.username}</span>
              <PersonCircle className="mr-6 size-7" />
            </Link>
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

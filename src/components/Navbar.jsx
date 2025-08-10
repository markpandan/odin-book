import ctl from "@netlify/classnames-template-literals";
import { Moon, Sun } from "react-bootstrap-icons";
import useColorScheme from "../hooks/useColorScheme";

const Navbar = () => {
  const { darkMode, setDarkMode } = useColorScheme();

  return (
    <div
      className={ctl(`
        flex justify-between bg-[var(--secondary-color)] p-4 text-zinc-200 transition-colors
        duration-300
        *:cursor-pointer
      `)}
    >
      <h1>Navbar</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={ctl(`*:size-4`)}
      >
        {darkMode ? <Moon /> : <Sun />}
      </button>
    </div>
  );
};

export default Navbar;

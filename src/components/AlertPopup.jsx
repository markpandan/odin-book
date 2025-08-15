import ctl from "@netlify/classnames-template-literals";
import { XLg } from "react-bootstrap-icons";

const AlertPopup = ({ value, onClose }) => {
  return (
    <div
      className={ctl(`
        fixed top-0 right-[50%] z-15 translate-x-[50%] animate-appear-up rounded-2xl px-4 py-2
        not-dark:bg-red-300 not-dark:shadow-md
        dark:bg-red-500
      `)}
    >
      <div className="flex items-center gap-4">
        <p>{value}</p>
        <button onClick={onClose} className="cursor-pointer">
          <span className="sr-only">Close Button</span>
          <XLg className="size-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;

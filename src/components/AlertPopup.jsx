import ctl from "@netlify/classnames-template-literals";
import { useEffect } from "react";
import { XLg } from "react-bootstrap-icons";

const AlertPopup = ({ status = "error", value, onClose }) => {
  const colorVariant = {
    error: { dark: "dark:bg-red-500", light: "not-dark:bg-red-300" },
    success: { dark: "dark:bg-green-700", light: "not-dark:bg-green-500" },
  };

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, [onClose]);

  return (
    <div
      className={ctl(`
        fixed top-0 right-[50%] z-15 translate-x-[50%] animate-appear-up rounded-2xl px-4 py-2
        ${colorVariant[status].light}
        not-dark:shadow-md
        ${colorVariant[status].dark}
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

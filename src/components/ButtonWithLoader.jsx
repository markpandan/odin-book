import ctl from "@netlify/classnames-template-literals";
import Spinner from "./Spinner";

const ButtonWithLoader = ({
  type = "button",
  isLoading,
  className = ctl("flex items-center gap-4 bg-[var(--accent-color)]"),
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={className}
    >
      {isLoading && (
        <Spinner
          className={ctl(`size-6 animate-spin fill-[var(--primary-color)]`)}
        />
      )}
      <p>{children}</p>
    </button>
  );
};

export default ButtonWithLoader;

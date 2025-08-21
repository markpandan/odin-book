import ctl from "@netlify/classnames-template-literals";

const Messages = () => {
  return (
    <div
      className={ctl(`
        flex w-full items-center justify-center
        sm:w-4/7 sm:border-x-1 sm:border-[var(--highlight-color)]
      `)}
    >
      <div className="text-4xl">
        Feature{" "}
        <span className="font-bold text-[var(--highlight-color)]">
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default Messages;

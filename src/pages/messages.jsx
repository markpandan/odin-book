import ctl from "@netlify/classnames-template-literals";

const Messages = () => {
  return (
    <div
      className={ctl(`
        flex w-full items-center justify-center border-x-1 border-[var(--highlight-color)]
        sm:w-4/7
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

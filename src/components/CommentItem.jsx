import { PersonCircle } from "react-bootstrap-icons";

const CommentItem = ({ user = "Unknown", children }) => {
  return (
    <div className="flex w-full">
      <PersonCircle className="mr-4 size-12 shrink-0" />
      <div className="rounded-2xl bg-[var(--tertiary-color)] px-4 py-2">
        <h2 className="mb-2 font-semibold">{user}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default CommentItem;

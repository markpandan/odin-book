import ctl from "@netlify/classnames-template-literals";
import { ArrowLeft, PersonCircle } from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Create = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Link to={"/"} className="mb-4 block text-[var(--highlight-color)]">
        <ArrowLeft className="inline-block align-middle" />{" "}
        <p className="inline-block align-middle">Return to Home</p>
      </Link>

      <h1 className="mb-4 text-3xl font-semibold">Create A New Post</h1>

      <div
        className={ctl(`
          rounded-2xl bg-[var(--secondary-color)] p-4 text-end
          not-dark:shadow-md
        `)}
      >
        <div className="mb-6 flex items-start gap-4">
          <PersonCircle className="size-12 shrink-0" />
          <label htmlFor="post" className="sr-only">
            Post
          </label>
          <textarea
            name="post"
            id="post"
            placeholder="What's on your mind, John Smith?"
            rows={5}
            className={ctl(`
              grow resize-none rounded-xl border-1 border-[var(--highlight-color)]
              bg-[var(--tertiary-color)] p-4
            `)}
          />
        </div>
        <button className="cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 py-2">
          Post
        </button>
      </div>
    </>
  );
};

export default Create;

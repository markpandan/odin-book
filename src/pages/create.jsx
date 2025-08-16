import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { ArrowLeft, PersonCircle } from "react-bootstrap-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import { fetchPost } from "../utils/fetchUtils";

const Create = () => {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetchPost("posts/create", { content }, token);

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setAlert({ status: "error", message: data.message });
    } else {
      setAlert({ status: "success", message: "Post successfully created" });
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <Link to={"/"} className="mb-4 block text-[var(--highlight-color)]">
        <ArrowLeft className="inline-block align-middle" />{" "}
        <p className="inline-block align-middle">Return to Home</p>
      </Link>

      <h1 className="mb-4 text-3xl font-semibold">Create A New Post</h1>

      <form
        onSubmit={handleSubmit}
        className={ctl(`
          rounded-2xl bg-[var(--secondary-color)] p-4 text-end
          not-dark:shadow-md
        `)}
      >
        <div className="mb-6 flex items-start gap-4">
          <PersonCircle className="size-12 shrink-0" />
          <label htmlFor="content" className="sr-only">
            Post
          </label>
          <textarea
            name="content"
            id="content"
            placeholder={`What's on your mind, ${user.firstname} ${user.lastname}?`}
            rows={5}
            onChange={handleContentChange}
            value={content}
            className={ctl(`
              grow resize-none rounded-xl border-1 border-[var(--highlight-color)]
              bg-[var(--tertiary-color)] p-4
            `)}
          />
        </div>
        <ButtonWithLoader
          type="submit"
          isLoading={loading}
          className="cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 py-2"
        >
          {loading ? "Posting..." : "Post"}
        </ButtonWithLoader>
      </form>
    </>
  );
};

export default Create;

import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { ArrowLeft, PersonCircle } from "react-bootstrap-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import { fetchPostFormData } from "../utils/fetchUtils";
import { imageMimeType } from "../utils/typeUtils";

const Create = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const [imageFile, setImageFile] = useState(null);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      setAlert({ status: "error", message: "Image mime type is not valid" });
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", imageFile);

    const response = await fetchPostFormData("posts/create", formData, token);
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
          flex gap-4 rounded-2xl bg-[var(--secondary-color)] p-4
          not-dark:shadow-md
        `)}
      >
        {user.profile_url ? (
          <img
            src={user.profile_url}
            alt="profile"
            className="size-12 shrink-0"
          />
        ) : (
          <PersonCircle className="size-12 shrink-0" />
        )}

        <div className="grow">
          <div className="mb-6 flex items-start gap-4">
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
                grow resize-none rounded-lg border-1 border-[var(--highlight-color)]
                bg-[var(--tertiary-color)] p-4
              `)}
            />
          </div>
          <div className="mb-6 text-start">
            <label htmlFor="image" className="mb-1 block">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              id="image"
              onChange={handleImageChange}
              className={ctl(`
                block w-full rounded-lg border-1 border-[var(--accent-color)]
                bg-[var(--tertiary-color)]
                file:mr-4 file:cursor-pointer file:bg-[var(--accent-color)] file:px-4 file:py-2
                focus:outline-none
                hover:dark:file:bg-[var(--highlight-color)]
              `)}
            />
          </div>
          <ButtonWithLoader
            type="submit"
            isLoading={loading}
            className={ctl(`
              ml-auto flex cursor-pointer items-center gap-4 rounded-2xl bg-[var(--accent-color)]
              px-4 py-2
            `)}
          >
            {loading ? "Posting..." : "Post"}
          </ButtonWithLoader>
        </div>
      </form>
    </>
  );
};

export default Create;

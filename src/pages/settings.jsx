import ctl from "@netlify/classnames-template-literals";
import { ArrowLeft, Pencil, PersonCircle } from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";
import { fetchPutFormData } from "../utils/fetchUtils";
import useAlert from "../hooks/useAlert";
import ButtonWithLoader from "../components/ButtonWithLoader";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Settings = () => {
  const { setAlert } = useAlert();
  const { user, token, setToken } = useAuth();
  const { inputs, handleChange } = useForm({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileDataURL, setImageFileDataURL] = useState(user.profile_url);

  useEffect(() => {
    let fileReader,
      isCancel = false;

    if (imageFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(imageFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [imageFile]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("username", inputs.username);
    formData.append("firstname", inputs.firstname);
    formData.append("lastname", inputs.lastname);
    formData.append("email", inputs.email);
    formData.append("profile", imageFile);

    const response = await fetchPutFormData("users/update", formData, token);
    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      setAlert({ status: "error", message: data.message });
    } else {
      setToken(data.output.token);
      setAlert({ status: "success", message: "Account Updated" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      setAlert({ status: "error", message: "Image mime type is not valid" });
      return;
    }

    setImageFile(file);
  };

  return (
    <>
      <Link to={"/"} className="mb-4 block text-[var(--highlight-color)]">
        <ArrowLeft className="inline-block align-middle" />{" "}
        <p className="inline-block align-middle">Return to Home</p>
      </Link>
      <h1 className="mb-4 text-3xl font-semibold">Settings</h1>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute right-0 w-40">
          {imageFileDataURL ? (
            <img
              src={imageFileDataURL}
              alt="preview"
              className="mx-auto mb-4 size-16 rounded-full bg-black object-cover"
            />
          ) : (
            <PersonCircle className="mx-auto mb-4 size-16" />
          )}
          <label htmlFor="profile" className="text-center">
            <p className="mb-4 line-clamp-1 text-xl italic">Default Profile</p>
            <p
              className={ctl(`
                mx-auto w-max cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 py-1
                text-center
              `)}
            >
              Choose File
            </p>
            <input
              type="file"
              name="profile"
              accept=".jpg, .jpeg, .png"
              id="profile"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="mb-4 flex w-1/2 flex-col gap-4">
          <InputField
            name={"username"}
            label={"Username:"}
            onChange={handleChange}
            value={inputs.username}
          />
          <div className="flex justify-between gap-4">
            <InputField
              name={"firstname"}
              label={"First Name:"}
              onChange={handleChange}
              value={inputs.firstname}
              className={"grow"}
            />
            <InputField
              name={"lastname"}
              label={"Last Name:"}
              onChange={handleChange}
              value={inputs.lastname}
              className={"grow"}
            />
          </div>
          <InputField
            name={"email"}
            label={"Email:"}
            type="email"
            onChange={handleChange}
            value={inputs.email}
          />
        </div>
        <ButtonWithLoader
          type="submit"
          isLoading={loading}
          className={ctl(
            `
              flex w-max cursor-pointer items-center gap-4 rounded-xl bg-[var(--accent-color)] px-4
              py-1
            `
          )}
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </ButtonWithLoader>
      </form>
    </>
  );
};

export default Settings;

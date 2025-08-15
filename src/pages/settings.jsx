import ctl from "@netlify/classnames-template-literals";
import { ArrowLeft, Pencil, PersonCircle } from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { useState } from "react";
import { fetchPut } from "../utils/fetchUtils";
import useAlert from "../hooks/useAlert";
import ButtonWithLoader from "../components/ButtonWithLoader";

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

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetchPut("users/update", { ...inputs }, token);

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setAlert(data.message);
    } else {
      setToken(data.output.token);
      setAlert("");
    }
  };

  return (
    <>
      <Link to={"/"} className="mb-4 block text-[var(--highlight-color)]">
        <ArrowLeft className="inline-block align-middle" />{" "}
        <p className="inline-block align-middle">Return to Home</p>
      </Link>
      <h1 className="mb-4 text-3xl font-semibold">Settings</h1>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute right-0">
          <PersonCircle className="mx-auto size-16" />
          <button
            className={ctl(`
              cursor-pointer px-4 py-2 text-[var(--highlight-color)] underline underline-offset-6
            `)}
          >
            <Pencil className="mr-2 inline" />
            <span>Change Profile</span>
          </button>
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

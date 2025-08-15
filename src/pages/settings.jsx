import ctl from "@netlify/classnames-template-literals";
import { ArrowLeft, Pencil, PersonCircle } from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";

const Settings = () => {
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
      <h1 className="mb-4 text-3xl font-semibold">Settings</h1>
      <form action="" className="relative">
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
        <div className="flex w-1/2 flex-col gap-4">
          <InputField name={"username"} label={"Username:"} />
          <div className="flex justify-between gap-4">
            <InputField
              name={"firstname"}
              label={"First Name:"}
              className={"grow"}
            />
            <InputField
              name={"lastname"}
              label={"Last Name:"}
              className={"grow"}
            />
          </div>
          <InputField name={"email"} label={"Email:"} type="email" />
          <InputField name={"password"} label={"Password:"} type="password" />
        </div>
        <button
          type="submit"
          className="mt-4 w-max rounded-2xl bg-[var(--accent-color)] px-4 py-2"
        >
          Save Changes
        </button>
      </form>
    </>
  );
};

export default Settings;

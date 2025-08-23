import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ButtonWithLoader from "../components/ButtonWithLoader";
import InputField from "../components/InputField";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { fetchPost } from "../utils/fetchUtils";

const Signup = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setAlert } = useAlert();
  const { inputs, handleChange } = useForm();

  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetchPost("users/signup", { ...inputs });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setAlert({ status: "error", message: data.message });
    } else {
      setAlert({});
      navigate("/login", { replace: true });
    }
  };

  return (
    <div
      className={ctl(
        `
          m-auto mt-8 rounded-2xl bg-[var(--secondary-color)] px-4 py-12 text-center
          sm:w-1/2
          lg:w-1/3
        `
      )}
    >
      <h2 className={ctl(`text-3xl font-bold`)}>Signup</h2>

      <form
        onSubmit={handleSubmit}
        className="m-auto my-6 flex flex-col gap-4 text-start"
      >
        <InputField
          name={"username"}
          label={"Username:"}
          onChange={handleChange}
          value={inputs.username || ""}
        />

        <InputField
          type="email"
          name={"email"}
          label={"Email:"}
          onChange={handleChange}
          value={inputs.email || ""}
        />
        <div
          className={`
            flex w-full flex-col gap-4
            xs:flex-row
          `}
        >
          <InputField
            name={"firstname"}
            label={"First Name:"}
            onChange={handleChange}
            value={inputs.firstname || ""}
          />
          <InputField
            name={"lastname"}
            label={"Last Name:"}
            onChange={handleChange}
            value={inputs.lastname || ""}
          />
        </div>
        <InputField
          type="password"
          name={"password"}
          label={"Password:"}
          onChange={handleChange}
          value={inputs.password || ""}
        />
        <ButtonWithLoader
          type="submit"
          isLoading={loading}
          className={ctl(
            `
              m-auto flex w-max cursor-pointer items-center gap-4 rounded-xl
              bg-[var(--accent-color)] px-4 py-1
            `
          )}
        >
          {loading ? "Sigining Up..." : "Sign Up"}
        </ButtonWithLoader>
      </form>

      <p>
        Back to{" "}
        <Link to={"/login"} className="text-[var(--accent-color)] underline">
          login
        </Link>{" "}
        page
      </p>
    </div>
  );
};

export default Signup;

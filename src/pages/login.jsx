import ctl from "@netlify/classnames-template-literals";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { useState } from "react";
import { fetchPost } from "../utils/fetchUtils";
import ButtonWithLoader from "../components/ButtonWithLoader";
import useAlert from "../hooks/useAlert";
import InputField from "../components/InputField";

const Login = () => {
  const { token, setToken } = useAuth();
  const { setAlert } = useAlert();
  const { inputs, handleChange } = useForm();

  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetchPost("users/login", { ...inputs });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setAlert({ status: "error", message: data.message });
    } else {
      setToken(data.output.token);
      setAlert({});
    }
  };

  return (
    <div
      className={ctl(
        `m-auto mt-8 w-1/3 rounded-2xl bg-[var(--secondary-color)] p-4 text-center`
      )}
    >
      <h2 className={ctl(`mt-8 text-3xl font-bold`)}>Login</h2>

      <form
        onSubmit={handleSubmit}
        className="m-auto my-6 flex w-full flex-col gap-4 text-start"
      >
        <InputField
          name={"username"}
          label={"Username:"}
          onChange={handleChange}
          value={inputs.username}
        />

        <InputField
          type="password"
          name={"password"}
          label={"Password:"}
          onChange={handleChange}
          value={inputs.password}
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
          {loading ? "Logging In" : "Login"}
        </ButtonWithLoader>
      </form>

      <p>
        Or{" "}
        <Link to={"/signup"} className="text-[var(--accent-color)] underline">
          sign up
        </Link>{" "}
        for a new one
      </p>
    </div>
  );
};

export default Login;

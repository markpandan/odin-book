import ctl from "@netlify/classnames-template-literals";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className={ctl(
        `m-auto mt-8 w-1/3 rounded-2xl bg-[var(--secondary-color)] p-4 text-center`
      )}
    >
      <h2 className={ctl(`mt-8 text-3xl font-bold`)}>Login</h2>

      <form className="m-auto mt-6 mb-6 flex w-min flex-col gap-4 text-start">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>
        <button
          className={ctl(
            `m-auto w-max cursor-pointer rounded-xl bg-[var(--accent-color)] px-4 py-1`
          )}
        >
          Login
        </button>
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

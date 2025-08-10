import ctl from "@netlify/classnames-template-literals";

const Signup = () => {
  return (
    <div
      className={ctl(
        `m-auto mt-8 w-1/3 rounded-2xl bg-[var(--secondary-color)] px-4 py-12 text-center`
      )}
    >
      <h2 className={ctl(`text-3xl font-bold`)}>Signup</h2>

      <form className="m-auto mt-6 flex w-min flex-col gap-4 text-start">
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>
        <button
          className={ctl(
            `m-auto w-max cursor-pointer rounded-xl bg-[var(--accent-color)] px-4 py-1`
          )}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

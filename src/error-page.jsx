import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-[-50%] text-center">
      <div className="mb-8">
        <h1 className="mb-4 text-5xl">
          An <span className="text-[var(--accent-color)]">error</span> occured
        </h1>
        <p className="text-xl italic">
          If this error occurs, contact the{" "}
          <a
            href="https://github.com/markpandan"
            target="_blank"
            className="text-[var(--accent-color)] underline"
          >
            owner
          </a>
        </p>
      </div>

      <Link
        to="/"
        className={`
          text-[var(--accent-color)] underline underline-offset-4
          hover:text-[var(--highlight-color)]
        `}
      >
        Return To Home
      </Link>
    </div>
  );
};

export default ErrorPage;

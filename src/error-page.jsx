const ErrorPage = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-[-50%] text-center">
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
  );
};

export default ErrorPage;

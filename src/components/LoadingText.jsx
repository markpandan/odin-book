import Spinner from "./Spinner";

const LoadingText = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Spinner
        className={"size-8 animate-spin fill-[var(--highlight-color)]"}
      />
      <p className="text-xl">Loading...</p>
    </div>
  );
};

export default LoadingText;

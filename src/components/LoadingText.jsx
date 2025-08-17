import Spinner from "./Spinner";

const LoadingText = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Spinner
        className={"size-8 animate-spin fill-[var(--highlight-color)]"}
      />
      <p className="text-xl">{text}</p>
    </div>
  );
};

export default LoadingText;

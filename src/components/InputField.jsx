const InputField = ({ name, label, type = "text", className }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        className="block rounded-xl border-2 border-[var(--highlight-color)] px-4 py-2"
      />
    </div>
  );
};

export default InputField;

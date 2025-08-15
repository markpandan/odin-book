const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block w-full rounded-xl border-2 border-[var(--highlight-color)] px-4 py-2"
      />
    </div>
  );
};

export default InputField;

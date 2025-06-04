const InputField = ({ value, onChange, inputRef, readonly, title, type }) => {
  return (
    <div>
      <label className="text-xs">{title}</label>
      <input
        type={type}
        ref={inputRef}
        className={`h-[33px] w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent ${
          readonly ? "cursor-not-allowed opacity-70" : ""
        }`}
        value={value}
        onChange={(e) => !readonly && onChange(e.target.value)}
        readOnly={readonly}
      />
    </div>
  );
};

export default InputField;

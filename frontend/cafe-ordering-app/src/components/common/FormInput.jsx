const FormInput = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "",
  ...props 
}) => {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-2">
      <label className="flex flex-col min-w-40 flex-1">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-14 placeholder:text-[#648770] p-4 text-base font-normal leading-normal ${className}`}
          {...props}
        />
      </label>
    </div>
  );
};

export default FormInput;

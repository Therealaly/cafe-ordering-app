const FormCheckbox = ({ checked, onChange, children, className = "" }) => {
  return (
    <div className={`flex items-center px-4 py-2 ${className}`}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <span className="text-sm text-gray-700">{children}</span>
      </label>
    </div>
  );
};

export default FormCheckbox;

const AlertMessage = ({ message, type = "error" }) => {
  const bgColor = type === "error" ? "bg-red-800" : type === "success" ? "bg-green-800" : "bg-blue-800";
  
  return (
    <div className={`px-4 py-2 mx-4 mt-2 ${bgColor} text-white text-sm font-semibold rounded-lg`}>
      <p>{message}</p>
    </div>
  );
};

export default AlertMessage;

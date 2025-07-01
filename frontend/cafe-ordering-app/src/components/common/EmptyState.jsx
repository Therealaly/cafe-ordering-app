import { Link } from "react-router-dom";

const EmptyState = ({ 
  message, 
  actionText, 
  actionLink,
  className = "" 
}) => {
  return (
    <div className={`text-center p-4 border border-gray-200 rounded-xl shadow-sm bg-white ${className}`}>
      <p className="text-gray-500 font-medium mb-4">
        {message}
      </p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-4 py-2 bg-green-800 text-white rounded-lg font-semibold hover:bg-green-900 transition"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

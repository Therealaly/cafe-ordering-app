import { NavLink } from "react-router-dom";

const ProfileMenuItem = ({ item, onClick, isLogout = false }) => {
  if (isLogout) {
    return (
      <button
        className="flex flex-row items-center justify-between p-3 border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition w-full text-left"
        onClick={onClick}
        type="button"
      >
        <div className="flex flex-row items-center gap-3">
          {item.icon}
          <span className="text-base font-medium text-red-500">
            {item.label}
          </span>
        </div>
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      className="flex flex-row items-center justify-between p-3 border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
    >
      <div className="flex flex-row items-center gap-3">
        {item.icon}
        <span className="text-base font-medium text-gray-800">
          {item.label}
        </span>
      </div>
    </NavLink>
  );
};

export default ProfileMenuItem;

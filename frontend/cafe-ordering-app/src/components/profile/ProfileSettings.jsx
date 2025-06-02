import { NavLink } from "react-router-dom";
import { KeyRound, LogOut, MessageCircleQuestion, UserRoundPen } from 'lucide-react';
import { getUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const user = getUser();
  const isUserValid = user && Object.keys(user).length > 0 && user.name && user.email;
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Ganti Password",
      icon: <KeyRound className="text-gray-700" />,
      to: "/ganti-password",
    },
    {
      label: "Ubah Nama Akun",
      icon: <UserRoundPen className="text-gray-700" />,
      to: "/ubah-nama",
    },
    {
      label: "Pelaporan / Kontak",
      icon: <MessageCircleQuestion className="text-gray-700" />,
      to: "/kontak",
    },
    {
      label: "Log Out",
      icon: <LogOut className="text-red-500" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("tableNumber");
    navigate("/login"); // Redirect to login page
  }

  if (!isUserValid) {
    return (
      <div className="h-full flex flex-col items-center bg-white rounded-t-3xl pt-60 z-50">
        <span className="text-gray-700 text-base font-medium">
          Login untuk mengubah pengaturan
        </span>
        <button
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          onClick={() => navigate("/login")}> Login </button>
      </div>
    );
  }

  return (
    <div className="h-full left-0 right-0 bottom-0 mt-2 border-t-gray-200 shadow-[0_-6px_12px_rgba(0,0,0,0.1)] rounded-t-3xl bg-white pt-4 pb-10 z-50">
      <div className="flex flex-col mx-5 pt-5">
        {menuItems.map((item, index) => {
          // Special handling for Log Out
          if (item.label === "Log Out") {
            return (
              <button
                key={index}
                className="flex flex-row items-center justify-between p-3 border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition w-full text-left"
                onClick={handleLogout}
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
          // Default NavLink for other items
          return (
            <NavLink
              key={index}
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
        })}
      </div>
    </div>
  );
};

export default ProfileSettings;

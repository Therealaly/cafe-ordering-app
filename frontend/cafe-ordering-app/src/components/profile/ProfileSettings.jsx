import { NavLink } from "react-router-dom";
import { KeyRound, LogOut, MessageCircleQuestion, UserRoundPen } from 'lucide-react';

const ProfileSettings = () => {
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
      to: "/logout", // ganti dengan fungsi logout jika butuh
    },
  ];

  return (
    <div className="h-full left-0 right-0 bottom-0 mt-2 border-t-gray-200 shadow-[0_-6px_12px_rgba(0,0,0,0.1)] rounded-t-3xl bg-white pt-4 pb-10 z-50">
      <div className="flex flex-col mx-5 pt-5">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className="flex flex-row items-center justify-between p-3 border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
          >
            <div className="flex flex-row items-center gap-3">
              {item.icon}
              <span className={`text-base font-medium ${item.label === "Log Out" ? "text-red-500" : "text-gray-800"}`}>
                {item.label}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;

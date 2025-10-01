import { KeyRound, LogOut, MessageCircleQuestion, UserRoundPen } from 'lucide-react';
import ProfileMenuItem from "../common/ProfileMenuItem";
import { useAuth } from "../../hooks/useAuth";

const ProfileSettings = () => {
  const { isUserValid, logout, login } = useAuth();

  const menuItems = [
    {
      label: "Ganti Password",
      icon: <KeyRound className="text-gray-700" />,
      to: "/forgot-password",
    },
    {
      label: "Ubah Nama Akun",
      icon: <UserRoundPen className="text-gray-700" />,
      to: "/#",
    },
    {
      label: "Pelaporan / Kontak",
      icon: <MessageCircleQuestion className="text-gray-700" />,
      to: "https://wa.me/+6281215248027",
    },
    {
      label: "Log Out",
      icon: <LogOut className="text-red-500" />,
    },
  ];

  const handleLogout = () => {
    logout();
  }

  if (!isUserValid) {
    return (
      <div className="h-full flex flex-col items-center bg-white rounded-t-3xl pt-60 z-50">
        <span className="text-gray-700 text-base font-medium">
          Login untuk mengubah pengaturan
        </span>
        <button
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          onClick={login}> Login </button>
      </div>
    );
  }

  return (
    <div className="h-full left-0 right-0 bottom-0 mt-2 border-t-gray-200 shadow-[0_-6px_12px_rgba(0,0,0,0.1)] rounded-t-3xl bg-white pt-4 pb-10 z-50">
      <div className="flex flex-col mx-5 pt-5">
        {menuItems.map((item, index) => (
          <ProfileMenuItem
            key={index}
            item={item}
            onClick={item.label === "Log Out" ? handleLogout : undefined}
            isLogout={item.label === "Log Out"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;

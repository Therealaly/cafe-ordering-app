import SideMenu from "../components/admin/sideMenu";
import { Routes, Route } from "react-router-dom";
import MainPage from "../components/admin/mainPage";
import EditMenu from "../components/admin/editMenu";
import EditBanner from "../components/admin/editBanner";
import EditRole from "../components/admin/editRole";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const DashboardAdmin = () => {
  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("tableNumber");
    navigate("/login"); // Redirect to login page
  }

  return (
    <div className="w-screen h-full flex flex-col">
      <div className="h-24 flex flex-row bg-green-950 justify-between items-center">
        <div className="h-full flex flex-row gap-5 p-5 items-center">
          <img src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163" alt="Logo Warna Kopi" className='h-full'/>
          <h1 className="text-lg font-bold text-white">Dashboard Admin</h1>
        </div>
        <button className="flex flex-row items-center justify-between p-3 shadow-sm bg-red-500 hover:bg-red-600 transition w-min mr-7"
          onClick={handleLogout}
          type="button"
        >
          <div className="flex flex-row items-center gap-3">
            <LogOut/>
            <span className="text-base font-medium text-white">
              Logout
            </span>
          </div>
        </button>
      </div>
      <div className="flex flex-row w-full h-full">
        <SideMenu/>
        <Routes>
          <Route path="dashboard" element={<MainPage />} />
          <Route path="menu" element={<EditMenu />} />
          <Route path="banner" element={<EditBanner />} />
          <Route path="users" element={<EditRole />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardAdmin;
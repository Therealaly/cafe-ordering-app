import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Coffee, Image, UserPen } from 'lucide-react';



const SideMenu = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div className="w-1/6 h-screen bg-gray-300 p-5 flex flex-col gap-5
    ">
      <div className="text-black flex flex-col items-center justify-center">
        <p>Selamat datang</p>
        <p>{user.name}!</p>
      </div>
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink to="/admin/dashboard" className="text-sm flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer gap-2 text-black">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/menu" className="text-sm flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer gap-2 text-black">
            <Coffee size={20} />
            Manajemen Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/banner" className="text-sm flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer gap-2 text-black">
            <Image size={20} />
            Manajemen Promo
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="text-sm flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer gap-2 text-black">
            <UserPen size={20} />
            Manajemen Pengguna
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SideMenu;
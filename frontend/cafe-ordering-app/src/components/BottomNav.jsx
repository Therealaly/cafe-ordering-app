import { NavLink } from 'react-router-dom';
import { House, ClipboardList, User, Bot } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 rounded-t-2xl shadow-[0_-6px_12px_rgba(0,0,0,0.1)]'>
      <div className='flex flex-row py-2 justify-around w-full'>
        <NavLink to={"/"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-950 border-t-2 border-green-950 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <House size={24} className='text-inherit'/>
          <span className='text-sm'>Home</span>
        </NavLink>
        <NavLink to={"/pesanan"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-950 border-t-2 border-green-950 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <ClipboardList size={24} className='text-inherit'/>
          <span className='text-sm'>Pesanan</span>
        </NavLink>
        <NavLink to={"/chatbot"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-950 border-t-2 border-green-950 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <Bot size={24} className='text-inherit'/>
          <span className='text-sm'>WarnaBee</span>
        </NavLink>
        <NavLink to={"/profil"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-950 border-t-2 border-green-950 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <User size={24} className='text-inherit'/>
          <span className='text-sm'>Profil</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;

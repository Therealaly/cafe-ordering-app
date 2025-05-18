// import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'
import UpperBar from './components/UpperBar'
import Cart from './pages/Cart'
import './App.css'

function App() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('./kasir');

  return (
    <div className='w-full h-full'>
      <UpperBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pesanan' element={<Orders/>} />
        <Route path='/profil' element={<Profile/>} />
        <Route path='/keranjang' element={<Cart/>} />
        {/* <Route path="/ganti-password" element={<GantiPassword />} />
        <Route path="/ubah-nama" element={<UbahNama />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/logout" element={<Logout />} /> */}

      </Routes>
      {!hideNav && <BottomNav/>}
    </div>
  )
}

export default App
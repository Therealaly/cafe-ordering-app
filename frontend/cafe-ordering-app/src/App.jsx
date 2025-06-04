// import { useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'
import UpperBar from './components/UpperBar'
import Cart from './pages/Cart'
import DashboardKasir from './pages/DashboardKasir'
import Login from './pages/Login'
import Register from './pages/Register'
import QrScan from './pages/QrScan'

import './App.css'
import { useEffect } from 'react'

function App() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/kasir') || location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

  const isKasirLoggedIn = () => {
    const auth = JSON.parse(localStorage.getItem("kasirAuth"));
    return auth.role("kasir")
  }

  return (
    <div className='w-full h-full'>
      {!hideNav && <UpperBar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pesanan' element={<Orders/>} />
        <Route path='/profil' element={<Profile/>} />
        <Route path='/keranjang' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/qr-scan' element={<QrScan/>} />
  
        {/* Kasir Routes */}
        <Route path='/kasir/dashboard' element={
          isKasirLoggedIn ? <DashboardKasir/> : <Navigate to={"/kasir/login"}/> } />
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
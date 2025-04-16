// import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'
import './App.css'

function App() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('./kasir');

  return (
    <div className='pb-16'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pesanan' element={<Orders/>} />
        <Route path='/profil' element={<Profile/>} />
      </Routes>
      {!hideNav && <BottomNav/>}
    </div>
  )
}

export default App
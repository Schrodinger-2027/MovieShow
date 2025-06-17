import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbars from './component/Navbars'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import {Toaster} from 'react-hot-toast'
import Footer from './component/Footer'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster/>
      {!isAdminRoute && <Navbars/>}
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/Movies' element = {<Movies/>} />
        <Route path = '/Movies/:id' element = {<MovieDetails/>} />
        <Route path = '/Movies/:id/:date' element = {<SeatLayout/>} />
        <Route path = '/my-bookings' element = {<MyBookings/>} />
        <Route path = '/Favorite' element = {<Favorite/>} />
      </Routes>
      {!isAdminRoute && <Footer/>}

    </>
  )
}

export default App

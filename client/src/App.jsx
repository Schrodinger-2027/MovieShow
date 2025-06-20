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
import DashBoard from './pages/admin/DashBoard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import LayOut from './pages/admin/Layout'

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
        <Route path = '/MyBookings' element = {<MyBookings/>} />
        <Route path = '/Favorite' element = {<Favorite/>} />
        <Route path='/admin/*' element={<LayOut/>}>
          <Route index element={<DashBoard/>}/>
          <Route path='add-shows' element={<AddShows/>}/>
          <Route path='list-shows' element={<ListShows/>}/>
          <Route path='list-Bookings' element={<ListBookings/>}/>
        </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}

    </>
  )
}

export default App

import React from 'react'
import AdminNavbar from '../../component/Admin/AdminNavbar'
import AdminSideBar from '../../component/Admin/AdminSideBar'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <>
        <AdminNavbar/>
        <div className='flex'>
            <AdminSideBar/>
            <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default LayOut

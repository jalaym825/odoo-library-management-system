import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Pages/Admin/Admin'

function UserLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default UserLayout

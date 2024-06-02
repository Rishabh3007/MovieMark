import React from 'react'
import Navbar from './Navbar'
import SearchBar from '../components/SearchBar'
import { Outlet} from "react-router-dom";

function Layout() {
  return (
    <>
        <Navbar />
        <SearchBar />
        <Outlet />
    </>
  )
}

export default Layout
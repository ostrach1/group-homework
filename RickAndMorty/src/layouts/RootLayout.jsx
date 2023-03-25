import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/Navbar'


function RootLayout() {
  return (
      <>
      <header> 
          <nav> 
    <NavBar />
    </nav>
    </header>

<main>
    <Outlet />
  
</main>
    </>
  )
}

export default RootLayout
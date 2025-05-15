import React from 'react'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <NavBar/>
        <div>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout
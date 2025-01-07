import React from 'react'
import AudiWhite from '/assets/Audi_Rings_Medium_bl-RGB.png'
const Header = () => {
  return (
    <header>
    <div className="header-content">
      <a href=""><img src={AudiWhite} alt="Logo Audi" className="logo"></img></a> 
      <h1>App Service Desk AUDI</h1>
    </div>
  </header>
  )
}

export default Header

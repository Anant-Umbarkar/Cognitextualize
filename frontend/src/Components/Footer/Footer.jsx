import React, { useEffect, useState } from 'react';
import './Footer.css'; // Linking the CSS
import { NavLink } from 'react-router-dom';
import { GrAnalytics } from "react-icons/gr";

const Footer = () => {
  const [click, setClick] = useState(false);
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("token"));
  useEffect(()=>{
    setloggedIn(localStorage.getItem("token"));
  },[localStorage.getItem("token")])


  const handleClick = () => setClick(!click);

  return (
    <div className="footer-outer">
      <div className='image_container'>
        <img src='https://res.cloudinary.com/dcglxmssd/image/upload/v1745671728/Group_1_3_x6xltl.png' alt='education'/>
      </div>
      <div className="footer-inner">
        <div className="c1">
          <div className="logo">
            <NavLink exact="true" to="/" className="nav-logo-footer">
              <GrAnalytics />
            </NavLink></div>
          <div className="navlinks">
          <li className="nav-item">
              <NavLink
                exact="true"
                to="/"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/about"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            {loggedIn && (
              <li className="nav-item">
                <NavLink
                  exact="true"
                  to="/analyze"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Analyze
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/sample"
                className="nav-links"
                onClick={handleClick}
              >
                Sample Result
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact="true"
                to="/resources"
                className="nav-links"
                onClick={handleClick}
              >
                Resources
              </NavLink> 
            </li>*/}

          </div>
        </div>
        <div className="c2">
          © 2025 Cognitextualize. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;

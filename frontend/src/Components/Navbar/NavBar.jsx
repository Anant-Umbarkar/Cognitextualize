import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrAnalytics } from "react-icons/gr";

function NavBar() {
  const [click, setClick] = useState(false);
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(()=>{
    setloggedIn(localStorage.getItem("token"));
  },[localStorage.getItem("token")])

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setloggedIn(null);
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact="true" to="/" className="nav-logo">
            <GrAnalytics />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
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
            </li> */}

            {loggedIn && (
              <li className="nav-item logout-btn-wrapper">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
            {!loggedIn && (
              <li className="nav-item login-btn-wrapper">
                <button className="login-btn" onClick={handleLogin}>
                  Login
                </button>
              </li>
            )}
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <GiHamburgerMenu />
              </span>
            ) : (
              <span className="icon">
                <IoClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

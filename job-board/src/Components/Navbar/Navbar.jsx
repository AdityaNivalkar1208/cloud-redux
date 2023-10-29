import React from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {FaUserAlt} from "react-icons/fa";
import './Navbar.css'

function Navbar() {

    const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('isEmployer');
    navigate('/EmployeeLogin');
  }

  return (
    <>

      <div className="navbar-container">

        <div className="logo">
          <h1 className="navbar-title">JobHive</h1>
        </div>

        <div className="navbar-menu">

          <ul className="navbar-list">
            <li className="nav-menu"><NavLink to="/" className="navlinks">FIND YOUR DREAM JOBS</NavLink></li>
            
          </ul>

        </div>

        <div className="user-section">

          {localStorage.getItem('token') && localStorage.getItem('isEmployer') === null ?  <NavLink className="userIcon" to="/EmployeeLogin" onClick={handleLogout}>Logout</NavLink> : <NavLink to="/EmployeeLogin" className="userIcon"><FaUserAlt /></NavLink>  }
          <p className="slash">|</p>
          {localStorage.getItem('token') && localStorage.getItem('isEmployer') === 'true' ? <NavLink className="posticon" to="/poster" onClick={handleLogout}>Logout</NavLink>:<NavLink to="/poster" className="post">Post Job</NavLink>}

        </div>
        

      </div>

    </>
  )
}

export default Navbar

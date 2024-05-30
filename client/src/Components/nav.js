// Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode }from 'jwt-decode';
import logo from '../Components/logo.png';
import '../CSS/navbar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.userName); // Adjust this based on your token's structure
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    setUsername('');
    setDropdownOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <div className="navbar">
      <div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <a className="nav-link" href="/doctors">Home</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* <li className="nav-item"> */}
            {/* <a className="nav-link" href="/doctors/ourservices">Our Services</a> */}
          {/* </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
          <li className="nav-item">
            <a className="nav-link" href="/doctors/Appointment">Appointments</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <a className="nav-link" href="/doctors/ContactUs">Contact Us</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <a className="nav-link" href="/doctors/Create-profile">
              <button className="login-button" style={{ width: '200px', height: '55px' }}>Add Profile</button>
            </a>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <div className="dropdown">
                <div className="username-container">
                  <button ref={usernameRef} style={{backgroundColor:'transparent', color:'black'}} onClick={toggleDropdown}>
                  <b><img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' style={{height:'70px',borderRadius:'50px'}} ></img></b>
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleProfileClick}>{username}</button>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <button className="login-button">Login</button>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../CSS/navbar.css'; // Assuming you have a CSS module for styling

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('auth-token');
//     // navigate('/login');
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <a href="/">YourLogo</a>
//       </div>
//       <ul className={styles.navLinks}>
//         <li><a href="/">Home</a></li>
//         <li><a href="/Doctors">Doctors</a></li>
//         <li><a href="/Technicians">Technicians</a></li>
//         <li><a href="/Admin/users">Admin</a></li>
//         <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../Components/logo.png';
// import '../CSS/navbar.css';

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     // Perform any additional logout logic here (e.g., clearing user data)
//     navigate('/');
//   };

//   return (
//     <div className="navbar">
//       <div>
//         <img src={logo} alt="Logo" className="logo" />
//       </div>
//       <nav>
//         <ul className="nav-links">
//           <li className="nav-item">
//             <a className="nav-link" aria-current="page" href="/doctors">Home</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li className="nav-item">
//             <a className="nav-link" href="/doctors/ourservices">Our Services</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li className="nav-item">
//             <a className="nav-link" href="/doctors/Appointment">Appointments</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li className="nav-item">
//             <a className="nav-link" href="/doctors/ContactUs">Contact Us</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           {isLoggedIn ? (
//             <li className="nav-item">
//               <a className="nav-link" href="/doctors/Create-profile">
//                 <button className="login-button" style={{ width: '200px', height: '55px' }}>Add Profile</button>
//               </a>
//             </li>
//           ) : (
//             <li className="nav-item">
//               <button className="logout-button" style={{ width: '200px', height: '55px' }} onClick={handleLogout}>Logout</button>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../Components/logo.png';
// import '../CSS/navbar.css';

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const storedProfile = JSON.parse(localStorage.getItem('profile'));
//       if (storedProfile) {
//         setProfile(storedProfile);
//       } else {
//         try {
//           const response = await fetch('http://localhost:3001/Doctors/profile', { method: 'GET' });
//           if (response.ok) {
//             const data = await response.json();
//             setProfile(data);
//             localStorage.setItem('profile', JSON.stringify(data));
//           }
//         } catch (error) {
//           console.error('Error fetching profile:', error);
//         }
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setProfile(null);
//     localStorage.removeItem('profile');
//     navigate('/');
//   };

//   const handleAddProfile = () => {
//     navigate('/doctors/create-profile', { state: { userId: profile?.id } });
//   };

//   return (
//     <div className="navbar">
//       <div>
//         <img src={logo} alt="Logo" className="logo" />
//       </div>
//       <nav>
//         <ul className="nav-links">
//           <li className="nav-item">
//             <a className="nav-link" aria-current="page" href="/doctors">Home</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li className="nav-item">
//             <a className="nav-link" href="/doctors/ourservices">Our Services</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li className="nav-item">
//             <a className="nav-link" href="/doctors/Appointment">Appointments</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li className="nav-item">
//             <a className="nav-link" href="/doctors/ContactUs">Contact Us</a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           {isLoggedIn ? (
//             <li className="nav-item">
//               {profile ? (
//                 <span className="nav-link">{profile.fullName}</span>
//               ) : (
//                 <button className="login-button" style={{ width: '200px', height: '55px' }} onClick={handleAddProfile}>Add Profile</button>
//               )}
//             </li>
//           ) : (
//             <li className="nav-item">
//               <button className="logout-button" style={{ width: '200px', height: '55px' }} onClick={handleLogout}>Logout</button>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

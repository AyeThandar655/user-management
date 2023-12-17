import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React, { useState, useEffect } from 'react';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import ChangePassword from './Pages/ChangePassword/changepassword';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Lock from '@mui/icons-material/Lock';
import Logout from '@mui/icons-material/Logout';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const updateLoginStatus = (status, role) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(JSON.parse(storedStatus));
  }, []);

  useEffect(() => {
    if(isLoggedIn){
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/');
  };


  return (
      <div id="app" style={{ height: '100vh', display: 'flex' }}>
        <Sidebar
          style={{ height: '100vh', display: isLoggedIn ? 'block' : 'none' }}
          backgroundColor="rgb(134 187 246)"
        >
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              style={{ textAlign: 'center' }}
            >
              <h3> User Management </h3>
            </MenuItem>

            {isLoggedIn && (
              <>
                <MenuItem icon={<HomeOutlinedIcon />} component={<Link to="/home" />}>
                  Home
                </MenuItem>
                <MenuItem icon={<Lock />} component={<Link to="/change-password" />}>
                  Change Password
                </MenuItem>
                <MenuItem icon={<Logout />} onClick={handleLogout}>
                  Log Out
                </MenuItem>
              </>
            )}
          </Menu>
        </Sidebar>

        {/* Main content */}
        <main style={{ display: 'block' }}>
          <Routes>
            <Route path="/" element={<Login updateLoginStatus={updateLoginStatus} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/change-password" element={<ChangePassword setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;

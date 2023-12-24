import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import Role from './Pages/Role/role';
import ChangePassword from './Pages/ChangePassword/changepassword';
import ForgotPassword from './Pages/ForgotPassword/forgotpassword';
import ResetPassword from './Pages/ResetPassword/resetpassword';
import Register from './Pages/Register/register';
import Profile from './Pages/Profile/profile'
import Header from './components/header';
import Footer from './components/footer';
import AboutUs from './Pages/AboutUs/aboutus';
import ContactUs from './Pages/ContactUs/contactus';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const updateLoginStatus = (status, role) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
    setRole(role);
    localStorage.setItem('isRole', JSON.stringify(role));
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(JSON.parse(storedStatus));
    const roleStatus = localStorage.getItem('isRole');
    setRole(JSON.parse(roleStatus))
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (isLoggedIn && role === 1 && (currentPath === '/home' || currentPath === '/')) {
      navigate('/home');
    }
    else if(isLoggedIn && role !== 1 && (currentPath === '/home' || currentPath === '/')){
      navigate('/change-password');
    }
  }, [isLoggedIn, role, navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <Fragment>
      {isLoggedIn && (<Header handleLogout={handleLogout} role={role}/>)}
      <Routes>
        <Route path="/" element={<Login updateLoginStatus={updateLoginStatus} />} />
        {role === 1 && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/role" element={<Role />} />
            <Route path="/register" element={<Register />} />
          </>)}

        <Route path="/change-password" element={<ChangePassword setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      {isLoggedIn && (<Footer />)}
    </Fragment>
  );
}

export default App;

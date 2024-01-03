import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';
import { AccessPointRoleDataApi, AccessPointDepartmentDataApi } from './API/api';
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
import ContactUs from './Pages/ContactUs/contactus';
import Logout from './Pages/Logout/logout';

function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [accessPointsRole, setAccessPointsRole] = useState([]);
  const [accessPointsDept, setAccessPointsDept] = useState([]);

  const updateLoginStatus = (status, roleID, departmentID) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
    setRoleId(roleID);
    localStorage.setItem('isRoleId', JSON.stringify(roleID));
    setDepartmentId(departmentID)
    localStorage.setItem('isDepartmentId', JSON.stringify(departmentID));
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(JSON.parse(storedStatus));
    const roleStatus = localStorage.getItem('isRoleId');
    setRoleId(JSON.parse(roleStatus))
    const departmentStatus = localStorage.getItem('isDepartmentId');
    setDepartmentId(JSON.parse(departmentStatus));
    if (JSON.parse(storedStatus)) {
      navigate(`/profile`);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (roleId !== "" && roleId !== null) {
      AccessPointRoleDataApi({ role_id: roleId })
        .then((response) => {
          if (response.success) {
            if (response.access_points.accessPoints.length > 0) {
              setAccessPointsRole(response.access_points.accessPoints);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching access points:", error);
        });
    }
  }, [roleId]);

  
  useEffect(() => {
    if (departmentId !== "" && departmentId !== null) {
      AccessPointDepartmentDataApi({ department_id: departmentId })
        .then((response) => {
          if (response.success) {
            if (response.access_points.accessPoints.length > 0) {
              setAccessPointsDept(response.access_points.accessPoints);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching access points:", error);
        });
    }
  }, [departmentId]);

  const resetAccessPointsRole = () => {
    setAccessPointsRole([]);
  };

  const resetAccessPointsDept = () => {
    setAccessPointsDept([]);
  };


  return (
    <Fragment>
      {isLoggedIn && (<Header accessPointsRole={accessPointsRole} accessPointsDept={accessPointsDept} />)}
      <Routes>
        <Route path="/" element={<Login updateLoginStatus={updateLoginStatus} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/role" element={<Role />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} resetAccessPointsRole={resetAccessPointsRole} resetAccessPointsDept={resetAccessPointsDept} />} />
      </Routes>
      {isLoggedIn && (<Footer />)}
    </Fragment>
  );
}

export default App;

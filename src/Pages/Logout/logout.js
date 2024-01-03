import React, { Fragment } from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn, resetAccessPointsRole, resetAccessPointsDept }) => {

    const navigate = useNavigate();

    const handleDeleteConfirm = () => {
        setIsLoggedIn(false);
        resetAccessPointsRole();
        resetAccessPointsDept();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        navigate('/');
    };

    const handleDeleteCancel = () => {
        setIsLoggedIn(true);
    };

    return (
        <Fragment>
            <div className="mainLogoutContainer">
                <div className="cardLogoutContainer">
                    <div className="titleLogoutContainer">Logout</div>
                    <p className="logout-text">Are you sure you want to logout?</p>
                    <div className="button-main">
                        <button className="logout-button-cancle" onClick={handleDeleteCancel}>Cancel</button>
                        <button className="logout-button-ok" onClick={handleDeleteConfirm}>Ok</button>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Logout
import React, { useState, useEffect } from "react";
import "./alert.css";

export default function Alert({ children, type, message, isShow }) {

    const [showAlert, setShowAlert] = useState(false);

    const alertClass = `alert ${type}`;

    useEffect(() => {
        setShowAlert(isShow);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }, [isShow]);

    const renderElAlert = function () {
        return React.cloneElement(children);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setShowAlert(false);
    };

    return (
        <div className={`${alertClass} ${showAlert ? "" : "hide"}`}>
            <span className="closebtn" onClick={handleClose}>
                &times;
            </span>
            {children ? renderElAlert() : message}
        </div>
    );
}
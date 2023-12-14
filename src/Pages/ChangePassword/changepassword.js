import React, { useState } from "react";
import "./changepassword.css";
import { useNavigate } from "react-router-dom";
import { ChangePasswordApi } from "../../API/api";

const ChangePassword = ({setIsLoggedIn }) => {

    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [oldPasswordError, setOldPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const userData = JSON.parse(localStorage.getItem('userData'));
    const handleChangePassword = () => {
        ChangePasswordApi({ _data: { id : userData.user_id, oldPassword: oldPassword, newPassword: newPassword } })
            .then((response) => {
                if (response.status) {
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setIsLoggedIn(false);
                    navigate('/');
                } else {
                    window.alert(response.error)
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    const onButtonClick = () => {
        // Set initial error values to empty
        setOldPasswordError("")
        setNewPasswordError("")
        setConfirmNewPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === oldPassword) {
            setOldPasswordError("Please enter your old password")
            return
        }

        if ("" === newPassword) {
            setNewPasswordError("Please enter your new password")
            return
        }

        if ("" === confirmNewPassword) {
            setConfirmNewPasswordError("Please enter your confirm new password")
            return
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordError("Your password does not match !");
            return
        }

        handleChangePassword()

    }


    return (
        <div className="mainContainerCP">
            <div className="cardContainerCP">
                <div className="titleContainerCP">Change Password</div>
                <br />
                <div className="inputContainer">
                    <input
                        value={oldPassword}
                        placeholder="Enter your old password"
                        onChange={(ev) => setOldPassword(ev.target.value)}
                        className="inputBox"
                    />
                    <div className="errorLabel">{oldPasswordError}</div>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        value={newPassword}
                        placeholder="Enter your new password"
                        onChange={(ev) => setNewPassword(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{newPasswordError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        value={confirmNewPassword}
                        placeholder="Enter your confirm new password"
                        onChange={(ev) => setConfirmNewPassword(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{confirmNewPasswordError}</label>
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        className="inputButton"
                        type="button"
                        onClick={onButtonClick}
                        value="Change Pasword"
                    />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
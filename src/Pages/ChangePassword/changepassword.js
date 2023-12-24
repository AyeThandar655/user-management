import React, { useState, Fragment } from "react";
import "./changepassword.css";
import { useNavigate } from "react-router-dom";
import { ChangePasswordApi } from "../../API/api";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import Alert from "../../components/alert";

const ChangePassword = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [oldPasswordError, setOldPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [showOldPassword, setShowOldPassword] = useState(false);
    const oldpasswordtype = showOldPassword ? "text" : "password";
    const oldpasswordicon = showOldPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const handleOldPasswordToggle = () => {
        setShowOldPassword((prevShowPassword) => !prevShowPassword);
    };

    const [showNewPassword, setShowNewPassword] = useState(false);
    const newpasswordtype = showNewPassword ? "text" : "password";
    const newpasswordicon = showNewPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const handleNewPasswordToggle = () => {
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const confirmpasswordtype = showConfirmPassword ? "text" : "password";
    const confirmpasswordicon = showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    }

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    const userData = JSON.parse(localStorage.getItem('userData'));
    const handleChangePassword = () => {
        ChangePasswordApi({ _data: { id: userData.id, oldPassword: oldPassword, newPassword: newPassword } })
            .then((response) => {
                if (response.success) {
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setIsLoggedIn(false);
                    navigate('/');
                } else {
                    setAlertMessage(response.message);
                    setAlertType("error")
                    setIsShow(true);
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
        <Fragment>
            <Alert type={alertType} message={alertMessage} isShow={isShow} />
            <div className="mainChangePasswordContainer">
                <div className="cardChangePasswordContainer">
                    <div className="titleChangePasswordContainer">Change Password</div>
                    <br />
                    <div className="changepasswrod-label">
                        <label>Old Password <label className="star-css"> * </label></label>
                    </div>
                    <div className="changePasswordContainer relative-change-pw">
                        <input
                            type={oldpasswordtype}
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter your new password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            autoComplete="new-password"
                            className="changePasswordBox"
                        />
                        <span className="eye-icon-op-cpw" onClick={handleOldPasswordToggle}>
                            {oldpasswordicon}
                        </span>
                        <div className="errorLabel">{oldPasswordError}</div>
                    </div>
                    <br />
                    <div className="changepasswrod-label">
                        <label>New Password <label className="star-css"> * </label></label>
                    </div>
                    <div className="changePasswordContainer relative-change-pw">
                        <input
                            type={newpasswordtype}
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            autoComplete="new-password"
                            className="changePasswordBox"
                        />
                        <span className="eye-icon-np-cpw" onClick={handleNewPasswordToggle}>
                            {newpasswordicon}
                        </span>
                        <label className="errorLabel">{newPasswordError}</label>
                    </div>
                    <br />
                    <div className="changepasswrod-label">
                        <label>Confirm Password <label className="star-css"> * </label></label>
                    </div>
                    <div className="changePasswordContainer relative-change-pw">
                        <input
                            type={confirmpasswordtype}
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="Enter your confirm password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            autoComplete="new-password"
                            className="changePasswordBox"
                        />
                        <span className="eye-icon-cp-cpw" onClick={handleConfirmPasswordToggle}>
                            {confirmpasswordicon}
                        </span>
                        <label className="errorLabel">{confirmNewPasswordError}</label>
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <div className="changePasswordContainer">
                        <input
                            className="changePasswordButton"
                            type="button"
                            onClick={onButtonClick}
                            value="Change Pasword"
                        />
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default ChangePassword
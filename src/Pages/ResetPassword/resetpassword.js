import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResetPasswordApi } from "../../API/api";
import "./resetpassword.css";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import Alert from "../../components/alert";
import $ from "jquery";

const ResetPassword = () => {

    const [new_password, setNewPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const [new_passwordError, setNewPasswordError] = useState("")
    const [confirm_passwordError, setConfirmPasswordError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    const search = useLocation().search;
    const reset_token = new URLSearchParams(search).get("token");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const type = showNewPassword ? "text" : "password";
    const icon = showNewPassword ? <RiEyeOffFill /> : <RiEyeFill />;


    const handleToggle = () => {
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const confirmpasswordtype = showConfirmPassword ? "text" : "password";
    const confirmpasswordicon = showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    }

    $("#confirm_password").on("keyup", function () {
        if (new_password !== confirm_password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    });

    const resetPassword = () => {
        
        ResetPasswordApi({ _data: { reset_token: reset_token, new_password: new_password } })
            .then((response) => {
                console.log("response....", response);
                if (response.success) {
                    navigate('/');
                } else {
                    setAlertType("error")
                    setAlertMessage(response.message);
                    setIsShow(true);
                    setNewPassword("");
                    setConfirmPassword("");
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    const onButtonClick = () => {
        setNewPasswordError("")
        setConfirmPasswordError("")

        if ("" === new_password) {
            setNewPasswordError("Please enter your new password")
            return
        }

        if ("" === confirm_password) {
            setConfirmPasswordError("Please enter your confirm password")
            return
        }

        if (new_password !== confirm_password) {
            setPasswordError("Your password does not match!")
            return
        }

        resetPassword()
    }

    return (
        <div className="mainResetContainer">
            <Alert type={alertType} message={alertMessage} isShow={isShow} />
            <div className="cardResetContainer">
                <div className="titleResetContainer">Reset Password</div>
                <br />
                <div className="reset-label">
                    <label>New Password <label className="star-css"> * </label> </label>
                </div>
                <div className="inputResetContainer relative-reset">
                    <input
                        type={type}
                        id="new_password"
                        name="new_password"
                        placeholder="Enter your new password"
                        value={new_password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                        className="inputResetBox"
                    />
                    <span className="eye-icon-np" onClick={handleToggle}>
                        {icon}
                    </span>
                    <label className="errorLabel">{new_passwordError}</label>
                </div>
                <br />
                <div className="reset-label">
                    <label>Confirm Password <label className="star-css"> * </label></label>
                </div>
                <div className="inputResetContainer relative-reset">
                    <input
                        type={confirmpasswordtype}
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Enter your confirm password"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        className="inputResetBox"
                    />
                    <span className="eye-icon-cp-reset" onClick={handleConfirmPasswordToggle}>
                        {confirmpasswordicon}
                    </span>
                    <label className="errorLabel">{confirm_passwordError}</label>
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className="inputResetContainer">
                    <input
                        className="resetPasswordButton"
                        type="button"
                        onClick={onButtonClick}
                        value="Reset Password"
                    />
                </div>

            </div>
        </div>
    )
}

export default ResetPassword
import React, { useState } from "react";
import { CheckEmailApi } from "../../API/api";
import "./forgotpassword.css";
import Alert from "../../components/alert";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    // Log in a user using email and password
    const checkEmail = () => {
        CheckEmailApi({ _data: { email: email } })
            .then((response) => {
                if (response.success) {
                    setEmail("")
                    setAlertType("success")
                    setAlertMessage(response.message);
                    setIsShow(true);
                } else {
                    setAlertType("error")
                    setAlertMessage(response.message);
                    setIsShow(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        checkEmail()

    }

    return (
        <div className="mainForgotContainer">
            <Alert type={alertType} message={alertMessage} isShow={isShow} />
            <div className="cardForgotContainer">
                <div className="titleForgotContainer">Forgot Password</div>
                <br />
                <div className="forgot-label">
                    <label>Email <label className="star-css"> * </label> </label>
                </div>
                <div className="inputForgotContainer">
                    <input
                        value={email}
                        placeholder="Enter your email"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="inputForgotBox"
                    />
                    <div className="errorLabel">{emailError}</div>
                </div>
                <br />
                <div className="inputForgotContainer">
                    <input
                        className="forgotPasswordButton"
                        type="button"
                        onClick={onButtonClick}
                        value="Forgot Password"
                    />
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword
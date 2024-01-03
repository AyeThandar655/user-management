import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../API/api";
import "./login.css";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "../../components/alert";

const Login = ({ updateLoginStatus }) => {

    const recaptcha = useRef();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const type = showPassword ? "text" : "password";
    const icon = showPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const handleToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const logIn = async () => {
        try {
            const response = await LoginApi({ _data: { email: email, password: password } });

            if (response.success) {
                localStorage.setItem('userData', JSON.stringify(response.user));
                updateLoginStatus(true, response.user.role_id, response.user.department_id);
                navigate('/profile');
            } else {
                setAlertType("error");
                setAlertMessage(response.message);
                setIsShow(true);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };


    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        const captchaValue = recaptcha.current.getValue();
        if (!captchaValue) {
            setAlertType("error")
            setAlertMessage("Please verify the reCAPTCHA!");
            setIsShow(true);
        } else {
            logIn()
        }
    }

    return (
        <div className="mainLoginContainer">
            <Alert type={alertType} message={alertMessage} isShow={isShow} />
            <div className="cardLoginContainer">
                <div className="titleLoginContainer">Login</div>
                <br />
                <div className="login-label">
                    <label>Email <label className="star-css"> * </label> </label>
                </div>
                <div className="loginContainer">
                    <input
                        value={email}
                        placeholder="Enter your email"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="loginInputBox"
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className="login-label">
                    <label>Password <label className="star-css"> * </label> </label>
                </div>
                <div className="loginContainer relative-login">
                    <input
                        type={type}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        className="loginInputBox"
                    />
                    <span className="eye-icon-login" onClick={handleToggle}>
                        {icon}
                    </span>
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <div className="recaptcha-login">
                    <ReCAPTCHA ref={recaptcha} sitekey="6LfPiTopAAAAAL3xM8p3dFObrawJaI_9jIA6SUKS" />
                </div>
                <div className="forgotLabel" >
                    <a className="forgotpass-a" href="/forgot-password">
                        Forgot your password?
                    </a>
                </div>
                <br />
                <div className="loginContainer">
                    <input
                        className="loginButton"
                        type="button"
                        onClick={onButtonClick}
                        value="Login"
                    />
                </div>

            </div>
        </div>
    )
}

export default Login
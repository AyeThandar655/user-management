import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../API/api";
import "./login.css";

const Login = ({ updateLoginStatus }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    // Log in a user using email and password
    const logIn = () => {
        LoginApi({ _data: { email: email, password: password } })
            .then((response) => {
                if (response.status) {
                    localStorage.setItem('userData', JSON.stringify(response.user_data));
                    updateLoginStatus(true, response.user_data.user_role);
                    navigate('home');
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

        logIn()

    }

    return (
        <div className="mainContainer">
            <div className="cardContainer">
                <div className="titleContainer">Login</div>
                <br />
                <div className="inputContainer">
                    <input
                        value={email}
                        placeholder="Enter your email"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="inputBox"
                    />
                    <div className="errorLabel">{emailError}</div>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        value={password}
                        placeholder="Enter your password"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        className="inputButton"
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
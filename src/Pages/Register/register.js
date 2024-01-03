import React, { useEffect, useState, useRef, Fragment } from "react"
import { DepartmentApi, RoleDataApi, CreateUsersApi } from "../../API/api";
import "./register.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import Moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "../../components/alert";

const Register = () => {

    const navigate = useNavigate();
    const recaptcha = useRef();

    const birthday_options = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];

    const birthmonth_options = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birth_day, setBirthDay] = useState("");
    const [birth_month, setBirthMonth] = useState("");
    const [birth_year, setBirthYear] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [role_id, setRoleId] = useState(0);
    const [department_id, setDepartmentId] = useState(0);
    const [create_date, setCreateDate] = useState(new Date());

    const [showPassword, setShowPassword] = useState(false);
    const type = showPassword ? "text" : "password";
    const icon = showPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const confirmpasswordtype = showConfirmPassword ? "text" : "password";
    const confirmpasswordicon = showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />;

    const [inputError, setInputError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        RoleDataApi()
            .then((response) => {
                if (response.success) {
                    if (response.role_data.length > 0) {
                        const sortedRoleData = [...response.role_data].sort((a, b) => a.role_id - b.role_id);
                        setRoles(sortedRoleData);
                    }
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

        DepartmentApi()
            .then((response) => {
                if (response.success) {
                    if (response.department_data.length > 0) {
                        const sortedDepartmentData = [...response.department_data].sort((a, b) => a.department_id - b.department_id);
                        setDepartments(sortedDepartmentData);
                    }
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

    }, [])

    const _onBirthDaySelect = (selectedOption) => {
        setBirthDay(selectedOption.value);
    };


    const _onBirthMonthSelect = (selectedOption) => {
        setBirthMonth(selectedOption.value);
    };

    const handleToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleRoleSelectChange = (e) => {
        setRoleId(e.target.value);
    };

    const handleDepartmentSelectChange = (e) => {
        setDepartmentId(e.target.value);
    };


    $("#confirm_password").on("keyup", function () {
        if (password !== confirm_password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    });

    const checkObjectValid = () => {
        if (
            first_name &&
            last_name &&
            email &&
            birth_day &&
            birth_month &&
            birth_year &&
            phone_number &&
            password &&
            confirm_password &&
            role_id &&
            department_id &&
            create_date
        ) {
            if (!passwordError) {
                setInputError(false);
                return true;
            }
        } else {
            setInputError(true);
            return false;
        }
    };

    const handleCreateUserSubmit = (e) => {
        e.preventDefault();
        if (checkObjectValid()) {
            const captchaValue = recaptcha.current.getValue();
            if (!captchaValue) {
                setAlertMessage("Please verify the reCAPTCHA!");
                setAlertType("error")
                setIsShow(true);
            } else {
                CreateUsersApi({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    birth_day: birth_day,
                    birth_month: birth_month,
                    birth_year: birth_year,
                    phone_number: phone_number,
                    password: password,
                    role_id: parseInt(role_id),
                    department_id: parseInt(department_id),
                    create_date: Moment(create_date, 'YYYY-MM-DD')
                })
                    .then((response) => {
                        if (response.success) {
                            navigate('/home', { state: { create_user: true } });
                        }
                        else{
                            setAlertMessage(response.message);
                            setAlertType("warning")
                            setIsShow(true);
                            setEmail("");
                        }
                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
            }
        }
    };

    return (
        <Fragment>
            <Alert type={alertType} message={alertMessage} isShow={isShow} />
            <div className="create-user-css">
                <form className="create-user-form-css">
                    <h4 className="createUserTitle"> Create User</h4>
                    <div className="row">
                        <div className="form-group-register col-md-6">
                            <label htmlFor="first_name" className="register-label">First Name <label className="star-css"> * </label> </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={first_name}
                                onChange={(ev) => setFirstName(ev.target.value)}
                                className="registerInputBox"
                            />
                            {inputError && !first_name && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>

                        <div className="form-group-register col-md-6">
                            <label htmlFor="last_name" className="register-label">Last Name <label className="star-css"> * </label> </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={last_name}
                                onChange={(ev) => setLastName(ev.target.value)}
                                className="registerInputBox"
                            />
                            {inputError && !last_name && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-register col-md-6">
                            <label htmlFor="email" className="register-label">Email <label className="star-css"> * </label> </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                className="registerInputBox"
                            />
                            {inputError && !email && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                        <div className="form-group-register col-md-6">
                            <label htmlFor="birth_day" className="register-label">Birth Day <label className="star-css"> * </label> </label>
                            <Dropdown id="birth_day" options={birthday_options} onChange={_onBirthDaySelect}
                                value={birth_day} placeholder="Please select " />
                            {inputError && !birth_day && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-register col-md-6">
                            <label htmlFor="birth_month" className="register-label">Birth Month <label className="star-css"> * </label></label>
                            <Dropdown id="birth_month" options={birthmonth_options} onChange={_onBirthMonthSelect}
                                value={birth_month} placeholder="Please select" />
                            {inputError && !birth_month && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                        <div className="form-group-register col-md-6">
                            <label htmlFor="birth_year" className="register-label">Year of birth <label className="star-css"> * </label> </label>
                            <input
                                type="text"
                                id="birth_year"
                                name="birth_year"
                                value={birth_year}
                                onChange={(ev) => setBirthYear(ev.target.value)}
                                className="registerInputBox"
                            />
                            {inputError && !birth_year && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="row pw-main">
                        <div className="form-group-register col-md-6 relative-register">
                            <label htmlFor="password" className="register-label">Password <label className="star-css"> * </label> </label>
                            <input
                                type={type}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                className="registerInputBox"
                            />
                            <span className="eye-icon" onClick={handleToggle}>
                                {icon}
                            </span>
                            {inputError && !password && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                        <div className="form-group-register col-md-6 relative-register">
                            <label htmlFor="confirm_password" className="register-label">Confirm Password <label className="star-css"> * </label></label>
                            <input
                                type={confirmpasswordtype}
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Enter your confirm password"
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                className="registerInputBox"
                            />
                            <span className="eye-icon-cp" onClick={handleConfirmPasswordToggle}>
                                {confirmpasswordicon}
                            </span>
                            {inputError && !confirm_password && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                            {passwordError && password !== confirm_password && (
                                <label className="errorLabel">
                                    Password does not match !
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-register col-md-6">
                            <label htmlFor="phone_number" className="register-label">Mobile Number <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={phone_number}
                                onChange={(ev) => setPhoneNumber(ev.target.value)}
                                className="registerInputBox"
                            />
                            {inputError && !phone_number && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                        <div className="form-group-register col-md-6">
                            <label htmlFor="createdate" className="register-label">Create Date <label className="star-css"> * </label></label>
                            <DatePicker
                                id="createdate"
                                name="createdate"
                                selected={create_date}
                                minDate={new Date()}
                                value={create_date}
                                onChange={(createDate) =>
                                    setCreateDate(createDate)
                                }
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                                className="registerInputBox"
                            />
                            {inputError && !create_date && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-register col-md-6">
                            <label htmlFor="role" className="register-label">Role <label className="star-css"> * </label></label>
                            <select
                                id="role"
                                name="role_id"
                                value={role_id}
                                onChange={handleRoleSelectChange}
                                className="select-css-register"
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.role_id} value={role.role_id}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>
                            {inputError && !role_id && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>

                        <div className="form-group-register col-md-6">
                            <label htmlFor="department" className="register-label">Department <label className="star-css"> * </label></label>
                            <select
                                id="department"
                                name="department_id"
                                value={department_id}
                                onChange={handleDepartmentSelectChange}
                                className="select-css-register"
                            >
                                <option value="">Select Department</option>
                                {departments.map((department) => (
                                    <option key={department.department_id} value={department.department_id}>
                                        {department.department_name}
                                    </option>
                                ))}
                            </select>
                            {inputError && !department_id && (
                                <label className="errorLabel">
                                    This field is required !
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="recaptcha-register">
                        <ReCAPTCHA ref={recaptcha} sitekey="6LfPiTopAAAAAL3xM8p3dFObrawJaI_9jIA6SUKS" />
                    </div>
                    <div className="create-user-submit-btn-main">
                        <button className="create-user-submit-btn" onClick={handleCreateUserSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>

    )
}

export default Register
import React, { useState, useEffect, Fragment } from "react";
import './profile.css'
import profileImg from '../../assets/profile.png'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { UpdateUserProfileApi } from '../../API/api'
import Alert from "../../components/alert";

const Profile = () => {

    const birthday_options = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];

    const birthmonth_options = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [userData, setUserData] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        surn_name: '',
        email: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        phone_number: ''
    });
    const [updateUserStatus, setUpdateUserStatus] = useState(false)

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const user_data = JSON.parse(localStorage.getItem('userData'));
        setUserData({
            user_id: user_data.id || '',
            first_name: user_data.first_name || '',
            last_name: user_data.last_name || '',
            surn_name: user_data.surn_name || '',
            email: user_data.email || '',
            birth_day: user_data.birth_day || '',
            birth_month: user_data.birth_month || '',
            birth_year: user_data.birth_year || '',
            phone_number: user_data.phone_number || '',
        });
    }, [updateUserStatus])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const _onBirthDaySelect = (selectedOption) => {
        setUserData((prevUser) => ({
            ...prevUser,
            birth_day: selectedOption.value,
        }));
    };

    const _onBirthMonthSelect = (selectedOption) => {
        setUserData((prevUser) => ({
            ...prevUser,
            birth_month: selectedOption.value,
        }));
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const _data = {
            user_id: userData.user_id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            surn_name: userData.surn_name,
            birth_day: userData.birth_day,
            birth_month: userData.birth_month,
            birth_year: userData.birth_year,
            phone_number: userData.phone_number,
        }
        UpdateUserProfileApi({ _data })
            .then((response) => {
                if (response.success) {
                    localStorage.setItem('userData', JSON.stringify(response.user));
                    setUpdateUserStatus(true);
                    setAlertMessage(response.message);
                    setAlertType("success")
                    setIsShow(true);
                }
                else {
                    setAlertMessage(response.message);
                    setAlertType("error")
                    setIsShow(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    return (
        <Fragment>
            <Alert type={alertType} message={alertMessage} isShow={isShow} />
            <div className="profile-main-css">
                <form className="profile-form-css">
                    <h4 className="profileTitle"> Profile </h4>
                    <div className="profile-image-main">
                        <img src={profileImg} alt="" className="profile-image" />
                    </div>
                    <div className="row">
                        <div className="form-group-profile col-md-6">
                            <label htmlFor="first_name" className="profile-label">First Name <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleInputChange}
                                className="profileInputBox"
                            />
                        </div>

                        <div className="form-group-profile col-md-6">
                            <label htmlFor="last_name" className="profile-label">Last Name <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleInputChange}
                                className="profileInputBox"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-profile col-md-6">
                            <label htmlFor="surn_name" className="profile-label">Surn Name <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="surn_name"
                                name="surn_name"
                                value={userData.surn_name}
                                onChange={handleInputChange}
                                className="profileInputBox"
                            />
                        </div>

                        <div className="form-group-profile col-md-6">
                            <label htmlFor="email" className="profile-label">Email <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={userData.email}
                                className="profileInputBox"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-profile col-md-6">
                            <label htmlFor="birth_day" className="profile-label">Birth Day <label className="star-css"> * </label></label>
                            <Dropdown id="birth_day" options={birthday_options} onChange={_onBirthDaySelect}
                                value={userData.birth_day || ''} placeholder="Please Select" />
                        </div>

                        <div className="form-group-profile col-md-6">
                            <label htmlFor="birth_month" className="profile-label">Birth Month <label className="star-css"> * </label></label>
                            <Dropdown id="birth_month" options={birthmonth_options} onChange={_onBirthMonthSelect}
                                value={userData.birth_month || ''} placeholder="Please Select" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group-profile col-md-6">
                            <label htmlFor="birth_year" className="profile-label">Year of birth <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="birth_year"
                                name="birth_year"
                                value={userData.birth_year}
                                onChange={handleInputChange}
                                className="profileInputBox"
                            />
                        </div>

                        <div className="form-group-profile col-md-6">
                            <label htmlFor="phone_number" className="profile-label">Mobile Number <label className="star-css"> * </label></label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={userData.phone_number}
                                onChange={handleInputChange}
                                className="profileInputBox"
                            />
                        </div>
                    </div>
                    <div className="profile-submit-btn-main">
                        <button className="profile-submit-btn" onClick={handleProfileSubmit}>
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </Fragment>
    )
}

export default Profile
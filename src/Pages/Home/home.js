import React, { useEffect, useState, useMemo, Fragment } from "react"
import { UserDataApi, EditUserApi, DeleteUserApi, DepartmentApi, PositionApi, RoleDataApi, } from "../../API/api";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import 'react-dropdown/style.css';
import Pagination from "../../components/pagination";
import Dropdown from 'react-dropdown';
import Alert from "../../components/alert";

const Home = () => {

    const navigate = useNavigate();

    const birthday_options = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];

    const birthmonth_options = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [editUser, setEditUser] = useState({
        user_id: "",
        first_name: "",
        last_name: "",
        surn_name: "",
        birth_day: "",
        birth_month: "",
        birth_year: "",
        phone_number: "",
        role_id: "",
        department_id: "",
        position_id: "",
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [deleteUserID, setDeleteUserID] = useState(null);

    const PageSize = 5;

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return users.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, users]);

    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (userData !== undefined && userData !== null) {
            UserDataApi({ role_id: userData.role_id })
                .then((response) => {
                    if (response.success) {
                        if (response.user_data.length > 0) {
                            const sortedUserData = [...response.user_data].sort((a, b) => a.id - b.id);
                            setUsers(sortedUserData);
                        }
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }

    }, [userData, editStatus, currentPage])


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


        PositionApi()
            .then((response) => {
                if (response.success) {
                    if (response.position_data.length > 0) {
                        const sortedPositionData = [...response.position_data].sort((a, b) => a.position_id - b.position_id);
                        setPositions(sortedPositionData);
                    }
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [])

    const createuser = () => {
        navigate('/register');
    };


    const deleteRow = (id) => {
        setDeleteUserID(id)
        setDeleteModalOpen(true);
    };

    const editRow = (user_id) => {
        const userToEdit = users.find((user) => user.id === user_id);
        setEditUser(userToEdit);
        setEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const _onBirthDaySelect = (selectedOption) => {
        setEditUser((prevUser) => ({
            ...prevUser,
            birth_day: selectedOption.value,
        }));
    };

    const _onBirthMonthSelect = (selectedOption) => {
        setEditUser((prevUser) => ({
            ...prevUser,
            birth_month: selectedOption.value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const _data = {
            user_id: editUser.id,
            first_name: editUser.first_name,
            last_name: editUser.last_name,
            surn_name: editUser.surn_name,
            birth_day: editUser.birth_day,
            birth_month: editUser.birth_month,
            birth_year: editUser.birth_year,
            phone_number: editUser.phone_number,
            role_id: parseInt(editUser.role_id),
            department_id: parseInt(editUser.department_id),
            position_id: parseInt(editUser.position_id)
        }
        EditUserApi({ _data })
            .then((response) => {
                if (response.success) {
                    setEditUser({
                        user_id: "",
                        first_name: "",
                        last_name: "",
                        surn_name: "",
                        birth_day: "",
                        birth_month: "",
                        birth_year: "",
                        phone_number: "",
                        role_id: "",
                        department_id: "",
                        position_id: "",
                    });
                    setEditModalOpen(false);
                    setEditStatus(true);
                }
                else {
                    setEditModalOpen(false);
                    setAlertType("error")
                    setAlertMessage(response.message);
                    setIsShow(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const closeModal = () => {
        setEditModalOpen(false);
        setEditUser({
            id: "",
            name: "",
            email: "",
            phone_number: "",
            department_name: "",
            position_name: "",
        });
    };

    const handleDeleteConfirm = () => {
        DeleteUserApi(deleteUserID)
            .then((response) => {
                if (response.success) {
                    setDeleteStatus(!deleteStatus);
                }
                setDeleteModalOpen(false);
            })
            .catch((error) => {
                console.log("error", error);
                setDeleteModalOpen(false);
            });
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        if (searchTerm.trim() === '') {
            setFilteredUsers([]);
        } else {
            const filteredItems = users.filter((user) =>
                user.surn_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filteredItems);
        }

        setCurrentPage(1);
    }

    return (
        <div className="home-page-container">
            <div className="create-user-btn-main">
                <input
                    type="text"
                    value={searchItem}
                    onChange={handleSearch}
                    placeholder='Search by surn name'
                    className="filterUser"
                />
                <button className="create-user-btn" onClick={() => createuser()}>
                    Create User
                </button>
            </div>

            <div className="user-table-main-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Surn Name</th>
                            <th>Email</th>
                            <th>Birthday</th>
                            <th>Birthday Month</th>
                            <th>Year of birth</th>
                            <th>Mobile Number</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {filteredUsers.length > 0 ? (
                        <tbody>
                            {filteredUsers.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.surn_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.birth_day}</td>
                                        <td>{user.birth_month}</td>
                                        <td>{user.birth_year}</td>
                                        <td>{user.phone_number}</td>
                                        <td>{user.role_name}</td>
                                        <td>{user.department_name}</td>
                                        <td>{user.position_name}</td>
                                        <td>
                                            <span className="user-actions">
                                                <BsFillPencilFill
                                                    className="user-edit-btn"
                                                    onClick={() => editRow(user.id)}
                                                />
                                                <BsFillTrashFill
                                                    className="user-delete-btn"
                                                    onClick={() => deleteRow(user.id)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            {currentTableData.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.surn_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.birth_day}</td>
                                        <td>{user.birth_month}</td>
                                        <td>{user.birth_year}</td>
                                        <td>{user.phone_number}</td>
                                        <td>{user.role_name}</td>
                                        <td>{user.department_name}</td>
                                        <td>{user.position_name}</td>
                                        <td>
                                            <span className="user-actions">
                                                <BsFillPencilFill
                                                    className="user-edit-btn"
                                                    onClick={() => editRow(user.id)}
                                                />
                                                <BsFillTrashFill
                                                    className="user-delete-btn"
                                                    onClick={() => deleteRow(user.id)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={users.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

            {editModalOpen && (
                <Fragment>
                    <Alert type={alertType} message={alertMessage} isShow={isShow} />
                    <div
                        className="edit-user-modal-container"
                        onClick={(e) => {
                            if (e.target.className === "edit-user-modal-container") closeModal();
                        }}
                    >
                        <div className="edit-user-modal">
                            <form>
                                <h4 className="editUserModalTitle">Edit User</h4>
                                <div className="row">
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="firstname" className="edituser-label">First Name <label className="star-css"> * </label></label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="first_name"
                                            value={editUser.first_name}
                                            onChange={handleInputChange}
                                            className="editUserInputBox"
                                        />
                                    </div>

                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="lastname" className="edituser-label">Last Name <label className="star-css"> * </label></label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="last_name"
                                            value={editUser.last_name}
                                            onChange={handleInputChange}
                                            className="editUserInputBox"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="surnname" className="edituser-label">Surn Name <label className="star-css"> * </label></label>
                                        <input
                                            type="text"
                                            id="surnname"
                                            name="surn_name"
                                            value={editUser.surn_name}
                                            onChange={handleInputChange}
                                            className="editUserInputBox"
                                        />
                                    </div>

                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="birthday" className="edituser-label">Birth Day <label className="star-css"> * </label></label>
                                        <Dropdown id="birthday" options={birthday_options} onChange={_onBirthDaySelect}
                                            value={editUser.birth_day} placeholder="Please Select" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="birthdaymonth" className="edituser-label">Birth Month <label className="star-css"> * </label></label>
                                        <Dropdown id="birthdaymonth" options={birthmonth_options} onChange={_onBirthMonthSelect}
                                            value={editUser.birth_month} placeholder="Please Select" />
                                    </div>
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="birthyear" className="edituser-label">Year of birth <label className="star-css"> * </label></label>
                                        <input
                                            type="text"
                                            id="birthyear"
                                            name="birth_year"
                                            value={editUser.birth_year}
                                            onChange={handleInputChange}
                                            className="editUserInputBox"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="phonenumber" className="edituser-label">Mobile Number <label className="star-css"> * </label></label>
                                        <input
                                            type="text"
                                            id="phonenumber"
                                            name="phone_number"
                                            value={editUser.phone_number}
                                            onChange={handleInputChange}
                                            className="editUserInputBox"
                                        />
                                    </div>
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="role" className="edituser-label">Role <label className="star-css"> * </label></label>
                                        <select
                                            id="role"
                                            name="role_id"
                                            value={editUser.role_id}
                                            onChange={handleInputChange}
                                            className="select-css-home"
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role.role_id} value={role.role_id}>
                                                    {role.role_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="department" className="edituser-label">Department <label className="star-css"> * </label></label>
                                        <select
                                            id="department"
                                            name="department_id"
                                            value={editUser.department_id}
                                            onChange={handleInputChange}
                                            className="select-css-home"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map((department) => (
                                                <option key={department.department_id} value={department.department_id}>
                                                    {department.department_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group-home col-md-6">
                                        <label htmlFor="position" className="edituser-label">Position <label className="star-css"> * </label></label>
                                        <select
                                            id="position"
                                            name="position_id"
                                            value={editUser.position_id}
                                            onChange={handleInputChange}
                                            className="select-css-home"
                                        >
                                            <option value="">Select Position</option>
                                            {positions.map((position) => (
                                                <option key={position.position_id} value={position.position_id}>
                                                    {position.position_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                </div>
                                <button type="submit" className="edit-user-btn" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
            {deleteModalOpen && (
                <div className="delete-confirmation-modal">
                    <p>Are you sure you want to delete?</p>
                    <button onClick={handleDeleteCancel}>Cancel</button>
                    <button onClick={handleDeleteConfirm}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default Home
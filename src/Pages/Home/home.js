import React, { useEffect, useState } from "react"
import { UserDataApi, EditUserApi, DeleteUserApi, DepartmentApi, PositionApi } from "../../API/api";
import "./home.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const Home = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [editedUser, setEditedUser] = useState({
        user_id: "",
        name: "",
        email: "",
        phone_number: "",
        department_name: "",
        position_name: "",
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [deleteUserID, setDeleteUserID] = useState(null);

    useEffect(() => {
        if (userData !== undefined && userData !== null) {
            UserDataApi({ role: userData.user_role })
                .then((response) => {
                    if (response.status) {
                        const sortedUser = [...response.user_data].sort((a, b) => a.id - b.id);
                        setUsers(sortedUser);
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }

    }, [userData, editStatus, deleteStatus])

    useEffect(() => {
        DepartmentApi()
            .then((response) => {
                if (response.status) {
                    setDepartments(response.department_data);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

            if( editedUser.department_name !== ""){
                PositionApi({ department_name: editedUser.department_name })
                .then((response) => {
                    if (response.status) {
                        setPositions(response.position_data);
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });

            }
    }, [editedUser])

    const deleteRow = (id) => {
        setDeleteUserID(id)
        setDeleteModalOpen(true);
    };

    const editRow = (user_id) => {
        const userToEdit = users.find((user) => user.user_id === user_id);
        setEditedUser(userToEdit);
        setEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        EditUserApi({ _data: editedUser })
            .then((response) => {
                if (response.status) {
                    setEditedUser({
                        id: "",
                        name: "",
                        email: "",
                        phone_number: "",
                        department_name: "",
                        position_name: "",
                    });
                    setEditModalOpen(false);
                    setEditStatus(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const closeModal = () => {
        setEditModalOpen(false);
        setEditedUser({
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
                if (response.status) {
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

    return (
        <div>
            <h1 className="title"> Users List </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.department_name}</td>
                                <td>{user.position_name}</td>
                                <td>
                                    <span className="actions">
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(user.user_id)}
                                        />
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(user.user_id)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {editModalOpen && (
                <div
                    className="modal-container"
                    onClick={(e) => {
                        if (e.target.className === "modal-container") closeModal();
                    }}
                >
                    <div className="modal">
                        <form>
                            <h4 className="modalTitle"> Edit User</h4>
                            <div className="form-group">
                                <label htmlFor="page">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editedUser.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    value={editedUser.phone_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Department</label>
                                <select
                                    id="department"
                                    name="department_name"
                                    value={editedUser.department_name}
                                    onChange={handleInputChange}
                                    className="select-css"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.name}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Position</label>
                                <select
                                    id="position"
                                    name="position_name"
                                    value={editedUser.position_name}
                                    onChange={handleInputChange}
                                    className="select-css"
                                >
                                    <option value="">Select Position</option>
                                    {positions.map((position) => (
                                        <option key={position.position_id} value={position.position_name}>
                                            {position.position_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
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
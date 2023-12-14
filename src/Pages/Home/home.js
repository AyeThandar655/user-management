import React, { useEffect, useState } from "react"
import { UserDataApi, EditUserApi, DeleteUserApi } from "../../API/api";
import "./home.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const Home = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [users, setUsers] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: "",
        name: "",
        email: "",
        phonenumber: "",
        role: "",
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [deleteUserID, setDeleteUserID] = useState(null);

    useEffect(() => {
        if (userData !== undefined && userData !== null) {
            UserDataApi({ role: userData.user_role })
                .then((response) => {
                    if (response.status) {
                        setUsers(response.user_data);
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }

    }, [userData, editStatus, deleteStatus])

    const deleteRow = (id) => {
        setDeleteUserID(id)
        setDeleteModalOpen(true);
    };

    const editRow = (id) => {
        const userToEdit = users.find((user) => user.id === id);
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
                        phonenumber: "",
                        role: "",
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
            phonenumber: "",
            role: "",
        });
    };

    const handleDeleteConfirm = () => {
        DeleteUserApi(deleteUserID)
            .then((response) => {
                console.log("response.....", response);
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
                        <th>Role</th>
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
                                <td>{user.phonenumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span className="actions">
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(user.id)}
                                        />
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(user.id)}
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
                                    id="phonenumber"
                                    name="phonenumber"
                                    value={editedUser.phonenumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={editedUser.role}
                                    onChange={handleInputChange}
                                />
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
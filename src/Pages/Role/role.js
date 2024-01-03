import React, { useState, useEffect, Fragment } from "react";
import { RoleDataApi, CreateRoleApi, EditRoleApi, DeleteRoleApi } from "../../API/api";
import "./role.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Alert from "../../components/alert";

const Role = () => {

    const [roles, setRoles] = useState([]);
    const [role_name, setRoleName] = useState("");
    const [description, setDescription] = useState("");
    const [inputError, setInputError] = useState(false);
    const [showCreateRole, setShowCreateRole] = useState(false);
    const [createRoleStatus, setCreateRoleStatus] = useState(false);
    const [showEditRole, setShowEditRole] = useState(false);
    const [editRoleStatus, setEditRoleStatus] = useState(false);
    const [editRole, setEditRole] = useState({
        role_id: "",
        role_name: "",
        description: ""
    });
    const [deleteRoleID, setDeleteRoleID] = useState("");
    const [showDeleteRole, setShowDeleteRole] = useState(false);
    const [deleteRoleStatus, setDeleteRoleStatus] = useState(false);

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        RoleDataApi()
            .then((response) => {
                if (response.success) {
                    if (response.role_data.length > 0) {
                        const sortedRoleData = [...response.role_data].sort((a, b) => a.id - b.id);
                        setRoles(sortedRoleData);
                    }
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

    }, [createRoleStatus, editRoleStatus, deleteRoleStatus])


    const createrole = () => {
        setShowCreateRole(true);
    };

    const closeCreateRoleModal = () => {
        setShowCreateRole(false);
    };

    const submitCreateRole = () => {
        CreateRoleApi({ role_name: role_name, description: description })
            .then((response) => {
                if (response.success) {
                    setShowCreateRole(false);
                    setCreateRoleStatus(true);
                }
                else {
                    setShowCreateRole(false);
                    setAlertType("error")
                    setAlertMessage(response.message);
                    setIsShow(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    const handleCreateRole = (e) => {
        e.preventDefault();

        if (role_name === "") {
            setInputError(true)
            return
        }
        else {
            submitCreateRole();
        }
    };

    const editRow = (role_id) => {
        const roleToEdit = roles.find((role) => role.role_id === role_id);
        setEditRole(roleToEdit);
        setShowEditRole(true);
    };

    const closeEditModal = () => {
        setShowEditRole(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditRole((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEditRole = (e) => {
        e.preventDefault();
        EditRoleApi(editRole)
            .then((response) => {
                if (response.success) {
                    setShowEditRole(false);
                    setEditRoleStatus(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const deleteRow = (role_id) => {
        setDeleteRoleID(role_id)
        setShowDeleteRole(true);
    };

    const handleDeleteConfirm = () => {
        DeleteRoleApi(deleteRoleID)
            .then((response) => {
                if (response.success) {
                    setDeleteRoleStatus(true);
                }
                setShowDeleteRole(false);
            })
            .catch((error) => {
                console.log("error", error);
                setShowDeleteRole(false);
            });
    };

    const handleDeleteCancel = () => {
        setShowDeleteRole(false);
    };

    return (
        <div className="role-page-container">
            <div className="create-role-btn-main">
                <button className="create-role-btn" onClick={() => createrole()}>
                    Create Role
                </button>
            </div>
            {roles.length > 0 &&
                <div className="role-table-main-container">
                    <table className="role-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => {
                                return (
                                    <tr key={role.role_id}>
                                        <td>{role.role_id}</td>
                                        <td>{role.role_name}</td>
                                        <td>{role.description}</td>
                                        <td>
                                            <span className="role-actions">
                                                <BsFillPencilFill
                                                    className="role-edit-btn"
                                                    onClick={() => editRow(role.role_id)}
                                                />
                                                <BsFillTrashFill
                                                    className="role-delete-btn"
                                                    onClick={() => deleteRow(role.role_id)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            }
            {
                showCreateRole &&
                <Fragment>
                    <Alert type={alertType} message={alertMessage} isShow={isShow} />
                    <div
                        className="create-role-modal-container"
                        onClick={(e) => {
                            if (e.target.className === "create-role-modal-container") closeCreateRoleModal();
                        }}
                    >
                        <div className="create-role-modal">
                            <form>
                                <h4 className="createRoleModalTitle">Create Role</h4>
                                <div className="form-group-role">
                                    <label htmlFor="role_name" className="createrole-label"> Name <label className="star-css"> * </label></label>
                                    <input
                                        type="text"
                                        id="role_name"
                                        name="role_name"
                                        onChange={(ev) => setRoleName(ev.target.value)}
                                        className="createRoleInputBox"
                                    />
                                    {inputError && (
                                        <label className="errorLabel">
                                            This field is required !
                                        </label>
                                    )}
                                </div>
                                <div className="form-group-role">
                                    <label htmlFor="description" className="createrole-label"> Description </label>
                                    <textarea
                                        name="description"
                                        rows="5"
                                        aria-invalid="false"
                                        onChange={(ev) => setDescription(ev.target.value)}
                                        className="description-css" />
                                </div>

                                <button type="submit" className="create-role-button-css" onClick={handleCreateRole}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>

            }
            {
                showEditRole &&
                <div
                    className="edit-role-modal-container"
                    onClick={(e) => {
                        if (e.target.className === "edit-role-modal-container") closeEditModal();
                    }}
                >
                    <div className="edit-role-modal">
                        <form>
                            <h4 className="modalTitle"> Edit Role</h4>
                            <div className="form-group-role">
                                <label htmlFor="role_name" className="createrole-label">Name <label className="star-css"> * </label></label>
                                <input
                                    type="text"
                                    id="role_name"
                                    name="role_name"
                                    value={editRole.role_name}
                                    onChange={handleInputChange}
                                    className="description-css"
                                />
                            </div>
                            <div className="form-group-role">
                                <label htmlFor="description" className="createrole-label">Description</label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    value={editRole.description}
                                    onChange={handleInputChange}
                                    className="description-css"
                                />
                            </div>
                            <button className="edit-role-btn" onClick={handleEditRole}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            }
            {showDeleteRole && (
                <div className="delete-confirmation-modal">
                    <p>Are you sure you want to delete?</p>
                    <button onClick={handleDeleteCancel}>Cancel</button>
                    <button onClick={handleDeleteConfirm}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default Role
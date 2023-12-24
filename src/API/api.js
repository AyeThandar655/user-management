export const base_url = "http://localhost:3002/";

export const LoginApi = async ({ _data }) => {
    return await fetch(base_url + "login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const CheckEmailApi = async ({ _data }) => {
    return await fetch(base_url + "check-email", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const ResetPasswordApi = async ({ _data }) => {
    return await fetch(base_url + "reset-password", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const UserDataApi = async (_data) => {
    return await fetch(base_url + "getuser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const RoleDataApi = async () => {
    return await fetch(base_url + "getrole", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json());
};

export const CreateRoleApi = async (_data) => {
    return await fetch(base_url + "create-role", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const EditRoleApi = async (_data) => {
    console.log("_data....", _data);
    return await fetch(base_url + "edit-role", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const DeleteRoleApi = async (id) => {
    console.log("id...", id);
    return await fetch(base_url + `delete-role/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json());
};

export const CreateUsersApi = async (_data) => {
    console.log("_data.....", _data)
    return await fetch(base_url + "create-user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const EditUserApi = async ({ _data }) => {
    return await fetch(base_url + "edit-user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const DeleteUserApi = async (id) => {
    return await fetch(base_url + `delete/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json());
};

export const ChangePasswordApi = async ({ _data }) => {
    return await fetch(base_url + "change-password", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const DepartmentApi = async (id) => {
    return await fetch(base_url + "getdepartment", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json());
};


export const PositionApi = async (_data) => {
    return await fetch(base_url + "getposition", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const UpdateUserProfileApi = async ({ _data }) => {
    return await fetch(base_url + "update-user-profile", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};
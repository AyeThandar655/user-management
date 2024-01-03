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
    return await fetch(base_url + "edit-role", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const DeleteRoleApi = async (id) => {
    return await fetch(base_url + `delete-role/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json());
};

export const CreateUsersApi = async (_data) => {
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

export const UpdateUserProfileApi = async ({ _data }) => {
    const formData = new FormData();
    formData.append('user_id', _data.user_id);
    formData.append('first_name', _data.first_name);
    formData.append('last_name', _data.last_name);
    formData.append('birth_day', _data.birth_day);
    formData.append('birth_month', _data.birth_month);
    formData.append('birth_year', _data.birth_year);
    formData.append('phone_number', _data.phone_number);
    formData.append('user_image', _data.user_image);
    return await fetch(base_url + "update-user-profile", {
        method: "POST",
        body: formData,
    }).then((response) => response.json());
};

export const AccessPointRoleDataApi = async (_data) => {
    return await fetch(base_url + "getaccesspoint-role", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const AccessPointDepartmentDataApi = async (_data) => {
    return await fetch(base_url + "getaccesspoint-department", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data),
    }).then((response) => response.json());
};
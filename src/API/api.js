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

export const UserDataApi = async (_data) => {
    return await fetch(base_url + "user_data", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(_data),
    }).then((response) => response.json());
};

export const EditUserApi = async ({ _data }) => {
    console.log("_data.....", _data)
  return await fetch(base_url + "edit", {
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
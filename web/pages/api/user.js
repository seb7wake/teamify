const deleteUser = async (id) => {
  console.log("here", id);
  let response = await fetch(`http://localhost:8000/api/users/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return { status: response.status };
};

const addUser = async (values) => {
  let response = await fetch(`http://localhost:8000/api/users/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  return { status: response.status, data };
};

const updateUser = async (values, id) => {
  console.log(values);
  let response = await fetch(`http://localhost:8000/api/users/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  return { status: response.status, data };
};

const getUser = async (id) => {
  let response = await fetch(`http://localhost:8000/api/users/${id}`);
  const data = await response.json();
  return { status: response.status, data };
};

const getUsers = async () => {
  let response = await fetch(`http://localhost:8000/api/users`);
  const data = await response.json();
  return data;
};

export { deleteUser, addUser, updateUser, getUser, getUsers };

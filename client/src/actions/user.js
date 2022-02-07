import axios from "axios";
import { API_URL } from "../config";
import { setSettings, setUser, setUsers } from "../reducers/userReducer";

export const createUser = async (form) => {
  try {
    await axios.post(`${API_URL}/auth/registration`, form);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const updateUser = async (form, id) => {
  try {
    await axios.put(`${API_URL}/users/${id}`, form);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, form);

      dispatch(setUser(data.user));
      localStorage.userData = JSON.stringify(data);
    } catch (e) {
      //console.log(e);
    }
  };
};

export const auth = async () => {
  const userData = JSON.parse(localStorage.userData);
  if (userData) {
    const response = await axios.get(`${API_URL}/auth`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });

    localStorage.userData = JSON.stringify(response.data);
    return response;
  }
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const userData = JSON.parse(localStorage.userData);
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      dispatch(setUsers(response.data));
      //console.log(response.data);
    } catch (e) {}
  };
};

export const createDepartment = async (form) => {
  try {
    await axios.post(`${API_URL}/departments`, form);
    //alert(response.data.message);
  } catch (e) {
    alert(e);
  }
};

export const createRole = async (form) => {
  try {
    await axios.post(`${API_URL}/roles`, form);
  } catch (e) {
    alert(e);
  }
};

export const getSettings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API_URL}/users/settings`);
      dispatch(setSettings(data));
      //alert(response.data.message);
    } catch (e) {
      alert(e);
    }
  };
};

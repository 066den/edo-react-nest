import axios from "axios";
import { API_URL } from "../../config";
import { setSenders, setSettings, setUser } from "../reducers/userReducer";

export const createUser = async (form) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/registration`,
      form
    );
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const updateUser = async (form, id) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    await axios.put(`${API_URL}/users/${id}`, form, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });

    const response = await getUsers();
    return response.data;
  } catch (e) {}
};

export const login = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, form);
      dispatch(setUser(data.user));
      localStorage.userData = JSON.stringify(data);
    } catch (e) {
      return e.response.data;
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const userData = JSON.parse(localStorage.userData);
      if (userData) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
          }
        );

        localStorage.userData = JSON.stringify(response.data);
        dispatch(setUser(response.data.user));
      }
    } catch (e) {}
  };
};

export const getUsers = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/users`);
};

export const getSenders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/senders`
      );
      dispatch(setSenders(response.data));
    } catch (e) {}
  };
};

export const createSender = async (data) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/senders`, data);
  } catch (e) {
    return e.response.data;
  }
};

export const updateSender = async (data, id) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/senders/${id}`, data);
  } catch (e) {}
};

export const deleteSender = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/senders/${id}`);
  } catch (e) {}
};

export const createDepartment = async (form) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/departments`, form);
  } catch (e) {
    alert(e);
  }
};

export const createRole = async (form) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/roles`, form);
  } catch (e) {
    alert(e);
  }
};

export const getSettings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/settings`
      );
      dispatch(setSettings(data));
    } catch (e) {
      alert(e);
    }
  };
};

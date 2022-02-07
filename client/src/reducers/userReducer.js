const SET_USER = "SET_USER";
const SET_USERS = "SET_USERS";
const LOGOUT = "LOGOUT";
const SET_SETTINGS = "SET_SETTINGS";

const defaultState = {
  currentUser: {},
  isAuth: false,
  users: [],
  roles: [],
  departments: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        roles: action.payload.roles,
        departments: action.payload.deps,
      };

    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };

    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case LOGOUT:
      delete localStorage.userData;
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setUsers = (users) => ({ type: SET_USERS, payload: users });
export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  payload: settings,
});
export const logout = () => ({ type: LOGOUT });

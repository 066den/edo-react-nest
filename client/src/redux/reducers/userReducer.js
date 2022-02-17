const SET_USER = "SET_USER";
const SET_USERS = "SET_USERS";
const SET_SENDERS = "SET_SENDERS";
const DEL_SENDER = "DEL_SENDER";
const LOGOUT = "LOGOUT";
const SET_SETTINGS = "SET_SETTINGS";

const defaultState = {
  currentUser: {},
  isAuth: false,
  users: [],
  roles: [],
  departments: [],
  senders: [],
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

    case SET_SENDERS:
      return {
        ...state,
        senders: action.payload,
      };

    case DEL_SENDER:
      return {
        ...state,
        senders: state.senders.filter((el) => el.id !== action.payload),
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setUsers = (users) => ({ type: SET_USERS, payload: users });
export const setSenders = (senders) => ({
  type: SET_SENDERS,
  payload: senders,
});

export const delSender = (id) => ({ type: DEL_SENDER, payload: id });

export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  payload: settings,
});

export const logout = () => ({ type: LOGOUT });

const SET_FIELDS = "SET_FIELDS";
const SET_ALERT = "SET_ALER";
const DEL_ALERT = "DEL_ALERT";

const defaultState = {
  customFields: {},
  alerts: [],
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FIELDS:
      return {
        ...state,
        customFields: action.payload,
      };

    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, { ...action.payload, id: Date.now() }],
      };

    case DEL_ALERT:
      const alerts = state.alerts.filter((item) => item.id !== action.payload);
      return {
        ...state,
        alerts: alerts,
      };
    default:
      return state;
  }
}

export const setCustomFields = (fields) => ({
  type: SET_FIELDS,
  payload: fields,
});

export const setAlert = (response) => ({
  type: SET_ALERT,
  payload: response,
});

export const delAlert = (id) => ({
  type: DEL_ALERT,
  payload: id,
});

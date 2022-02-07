const SET_FIELDS = "SET_FIELDS";

const defaultState = {
  loading: false,
  customFields: {},
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FIELDS:
      return {
        ...state,
        customFields: action.payload,
      };
    default:
      return state;
  }
}

export const setCustomFields = (fields) => ({
  type: SET_FIELDS,
  payload: fields,
});

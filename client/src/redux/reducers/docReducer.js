const SET_NOMENCLATURE = "SET_NOMENCLATURE";

const defaultState = {
  nomenclature: [],
};

export default function docReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_NOMENCLATURE:
      return {
        ...state,
        nomenclature: action.payload.value,
      };
    default:
      return state;
  }
}

export const setNomenclature = (fields) => ({
  type: SET_NOMENCLATURE,
  payload: fields,
});

import axios from "axios";
import { setNomenclature } from "../reducers/docReducer";

export const updateNomenclature = async (fields) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/custom-fields/nomenclature`,
      fields
    );
    //console.log(fields);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const getNomenclature = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/custom-fields/nomenclature`
      );
      dispatch(setNomenclature(data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

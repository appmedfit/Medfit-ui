import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";
import { login } from "../store/auth.slice";

export const getStudents = () => async (dispatch) => {
  console.log();
  return dispatch(
    axiosClient({
      method: "Get",
      url: constants.getStudents,

      responseType: "json",
    })
      .then((resp) => {
        //    console.log(resp)
      })
      .catch((error) => {
        console.log(error);
      })
  );
};

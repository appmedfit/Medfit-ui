import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";

export const fileupload = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.fileupload,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";

export const addReports = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.addReports,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const getReports = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.getReports,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const updateReports = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.updateReports,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

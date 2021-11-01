import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";

export const addDoctorSlots = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.addDoctorSlots,
    data: data,
    responseType: "json",
  });
};

export const getDoctorSlots = (data) => async (dispatch) => {
  return axiosClient({
    method: "POST",
    url: constants.getDoctorSlots,
    data: data,
    responseType: "json",
  });
};

export const bookSlot = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.booking,
    data: data,
    responseType: "json",
  });
};

export const bookingDetails = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.bookingDetails,
    data: data,
    responseType: "json",
  });
};

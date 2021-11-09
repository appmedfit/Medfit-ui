import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";

export const addDoctorSlots = (data) => async (dispatch) => {
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

export const getNextSevenDaysDoctorSlots = (data) => async (dispatch) => {
  return axiosClient({
    method: "POST",
    url: constants.getNextSevenDaysDoctorSlots,
    data: data,
    responseType: "json",
  });
};

export const bookSlot = (data) => async (dispatch) => {
  return axiosClient({
    method: "POST",
    url: constants.booking,
    data: data,
    responseType: "json",
  });
};

export const bookingDetails = (data) => async (dispatch) => {
  return axiosClient({
    method: "POST",
    url: constants.bookingDetails,
    data: data,
    responseType: "json",
  });
};

export const updateBooking = (data) => async (dispatch) => {
  return axiosClient({
    method: "POST",
    url: constants.updateBooking,
    data: data,
    responseType: "json",
  });
};

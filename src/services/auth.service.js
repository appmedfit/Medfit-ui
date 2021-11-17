import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";
import { login } from "../store/auth.slice";

export const Login = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.signIn,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const SignUp = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.signUp,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const updateUser = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.updateUser,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};
export const addUser = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.addUser,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};
export const getUser = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.getUser,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const SignOut = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.SignOut,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const UnAuthorized = () => async () => {};

export const getUsersWithCondition = (data) => async (dispatch) => {
  return axiosClient(
    {
      method: "POST",
      url: constants.getUsersWithCondition,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

export const updateConsultancyFee = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient(
    {
      method: "POST",
      url: constants.updateConsultancyFee,
      data: data,
      responseType: "json",
    },
    dispatch
  );
};

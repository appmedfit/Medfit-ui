import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";
import { login } from "../store/auth.slice";

export const Login = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.signIn,
    data: data,
    responseType: "json",
  });
};

export const SignUp = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.signUp,
    data: data,
    responseType: "json",
  });
};

export const updateUser = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.updateUser,
    data: data,
    responseType: "json",
  });
};

export const SignOut = (data) => async (dispatch) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.SignOut,
    data: data,
    responseType: "json",
  });
};

export const getUsersWithCondition = async (data) => {
  console.log(data);
  return axiosClient({
    method: "POST",
    url: constants.getUsersWithCondition,
    data: data,
    responseType: "json",
  });
};

import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth.slice";
import constants from "./constants";

const client = axios.create({
  baseURL: constants.baseUrl,
});
//
const axiosClient = async (options) => {
  options.headers = {
    Authorization: sessionStorage.getItem("user")
      ? "Bearer " +
        JSON.parse(sessionStorage.getItem("user"))["currentUser"]["token"]
      : "",
  };

  const onSuccess = (response) => response.data;
  const onError = (error) => {
    if (error.response) {
      console.log("err", error.response);
      if (error.response?.data?.message == "Unauthorized") {
        sessionExpired();
      }
      return Promise.reject(error.response || error.message);
    }
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

const sessionExpired = () => {
  sessionStorage.clear();
  // dispatch(logout());
};

export default axiosClient;

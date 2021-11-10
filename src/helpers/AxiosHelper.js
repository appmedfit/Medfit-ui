import axios from "axios";
import { handleLoginModal, logout } from "../store/auth.slice";
import constants from "./constants";
import { history } from "./history";

const client = axios.create({
  baseURL: constants.baseUrl,
});
//
const axiosClient = async (options, dispatch) => {
  options.headers = {
    Authorization: sessionStorage.getItem("user")
      ? "Bearer " +
        JSON.parse(sessionStorage.getItem("user"))["currentUser"]["token"]
      : "",
  };

  const onSuccess = (response) => response.data;
  const onError = (error) => {
    if (error.response) {
      console.log("err", error.response.data);
      if (error.response.data == "Unautorized") {
        sessionStorage.clear();
        dispatch(logout());
        // history.go(0);
        dispatch(handleLoginModal(true));
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

export default axiosClient;

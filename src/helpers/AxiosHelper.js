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
      console.log("err", error.response);
      if (
        error.response.status == 401 ||
        error.response.data == "Unautorized" ||
        error.response["data"]["message"] == "Unautorized"
      ) {
        console.log("inside");
        sessionStorage.clear();
        dispatch(logout());
        history.push("/");
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

import axios from "axios";
import constants from "./constants";

const client = axios.create({
  baseURL: constants.baseUrl,
});

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

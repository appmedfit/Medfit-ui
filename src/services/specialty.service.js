import axiosClient from "../helpers/AxiosHelper";
import constants from "../helpers/constants";
import { login } from "../store/auth.slice";

export const getSpeciality = async (id) => {
  console.log();
  return axiosClient({
    method: "Get",
    url: constants.getSpeciality + "/" + id,

    responseType: "json",
  });
};

export const getAllSpecialties = async () => {
  console.log();
  return axiosClient({
    method: "Get",
    url: constants.getSpeciality,
    responseType: "json",
  });
};

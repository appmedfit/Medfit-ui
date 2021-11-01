import { SignOut } from "../services/auth.service";

const constants = {
  baseUrl: "https://medfit-backend.herokuapp.com/api/v1/",
  //"http://localhost:8080/api/v1/",
  signIn: "user/signIn",
  signUp: "user/signUp",
  getStudents: "/student",
  SignOut: "user/signOut",
  getSpeciality: "specialty",
};

export default constants;

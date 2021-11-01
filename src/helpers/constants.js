import { SignOut } from "../services/auth.service";

const constants = {
  baseUrl: "https://medfit-backend.herokuapp.com/api/v1/",
  //"http://localhost:8080/api/v1/",
  signIn: "user/signIn",
  signUp: "user/signUp",
  getStudents: "/student",
  SignOut: "user/signOut",
  getUsersWithCondition: "user/getUsersWithCondition",
  updateUser: "user/updateUser",
  getSpeciality: "specialty",
  getDoctorSlots: "availableSlots/getSlots",
  addDoctorSlots: "availableSlots",
  booking: "availableSlots/booking",
  bookingDetails: "availableSlots/bookingDetails",
  getSpeciality: "specialty",
};

export default constants;

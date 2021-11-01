import { SignOut } from "../services/auth.service";

const constants = {
  baseUrl: "http://localhost:8080/api/v1/",
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
};

export default constants;

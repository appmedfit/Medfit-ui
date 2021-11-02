import { SignOut } from "../services/auth.service";

const constants = {
  baseUrl: "http://localhost:8080/api/v1/",
  //      "https://medfit-backend.herokuapp.com/api/v1/",
  //"http://localhost:8080/api/v1/",
  signIn: "user/signIn",
  signUp: "user/signUp",
  getStudents: "/student",
  SignOut: "user/signOut",
  getUsersWithCondition: "user/getUsersWithCondition",
  updateUser: "user/updateUser",
  getSpeciality: "specialty",
  getDoctorSlots: "slots/getSlots",
  addDoctorSlots: "slots",
  booking: "slots/booking",
  bookingDetails: "slots/bookingDetails",
  getSpeciality: "specialty",
  updateBooking: "slots/updateBooking",
};

export default constants;

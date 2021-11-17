const constants = {
  baseUrl: "https://medfit-backend.herokuapp.com/api/v1/",
  //"http://localhost:8080/api/v1/",
  //"https://medfit-backend.herokuapp.com/api/v1/",
  appUrl: "http://localhost:3000/",
  //"http://appmedfit.s3-website.us-east-2.amazonaws.com/"
  signIn: "user/signIn",
  signUp: "user/signUp",
  getStudents: "/student",
  SignOut: "user/signOut",
  getUsersWithCondition: "user/getUsersWithCondition",
  updateUser: "user/updateUser",
  addUser: "user/addUser",
  getUser: "user/getUser",
  getSpeciality: "specialty",
  getDoctorSlots: "slots/getSlots",
  addDoctorSlots: "slots",
  booking: "slots/booking",
  bookingDetails: "slots/bookingDetails",
  getSpeciality: "specialty",
  updateBooking: "slots/updateBooking",
  getNextSevenDaysDoctorSlots: "slots/nextSevenDaysSlots",
  updateConsultancyFee: "user/updateConsultancyFee",
  createRazorPayOrder: "razorpay/createRazorPayOrder",
};

export default constants;

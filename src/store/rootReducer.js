import { combineReducers } from "redux";
import taskReducer from "./tasks.slice";
import authSlice from "./auth.slice";
import bookingSlice from "./booking.slice";
export const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authSlice,
  booking: bookingSlice,
});

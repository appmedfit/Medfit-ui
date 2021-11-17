import { combineReducers } from "redux";
import taskReducer from "./tasks.slice";
import authSlice from "./auth.slice";
import bookingSlice from "./booking.slice";
import prescribtionSlice from "./prescribtion.slice";
export const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authSlice,
  booking: bookingSlice,
  prescribtion: prescribtionSlice,
});

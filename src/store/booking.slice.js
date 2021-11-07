import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingInfo: {},
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingInfo(state, { payload }) {
      state.bookingInfo = payload;
    },
  },
});

export const { setBookingInfo } = bookingSlice.actions;
export default bookingSlice.reducer;

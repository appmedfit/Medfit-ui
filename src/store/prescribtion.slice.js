import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescribtion: [],
  error: null,
};

const prescribtionSlice = createSlice({
  name: "prescribtion",
  initialState,
  reducers: {
    setprescribtionInfo(state, { payload }) {
      state.prescribtionInfo = payload;
    },
  },
});

export const { setprescribtionInfo } = prescribtionSlice.actions;
export default prescribtionSlice.reducer;

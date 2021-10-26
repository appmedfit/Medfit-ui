import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:[],
    isAuthenticated:false,
    error:null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.currentUser=(payload);
      state.isAuthenticated=true
    },
    logout(state) {
        state.currentUser=null;
        state.isAuthenticated=false;
    }
  }
});

export const {
 login,logout
} = authSlice.actions;
export default authSlice.reducer;

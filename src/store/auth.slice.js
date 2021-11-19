import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: [],
  isAuthenticated: false,
  toggleLogin: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.currentUser = payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    handleLoginModal(state, { payload }) {
      console.log(payload);
      state.toggleLogin = payload;
    },
    setLoading(state, { payload }) {
      console.log("pay", payload);
      state.loading = payload;
    },
  },
});

export const { login, logout, handleLoginModal, setLoading } =
  authSlice.actions;
export default authSlice.reducer;

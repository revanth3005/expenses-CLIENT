import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  error: null,
  email: null,
  name: null,
  user_id: null,
  authenticating: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLogin: (state) => {
      state.loggedIn = true;
      const info = localStorage.getItem("user_log");
      const parsedInfo = JSON.parse(info);
      console.log(parsedInfo);
      state.email = parsedInfo.data.email;
      state.user_id = parsedInfo.data.user_id;
      state.name = parsedInfo.data.name;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.error = null;
      state.loggedIn = false;
      state.email = null;
      state.user_id = null;
      state.name = null;
      state.authenticating = null;
    },
    clearAuth: (state) => {
      localStorage.clear();
      state.error = null;
      state.loggedIn = false;
      state.email = null;
      state.user_id = null;
      state.name = null;
      state.authenticating = null;
    },
    preFetchUserInfo: (state) => {
      state.loggedIn = true;
      const info = localStorage.getItem("user_log");
      if (info !== null) {
        const parsedInfo = JSON.parse(info);
        state.email = parsedInfo.data.email;
        state.user_id = parsedInfo.data.user_id;
        state.name = parsedInfo.data.name;
      }
    },
  },
});

export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectUser_ID = (state) => state.auth.user_id;
export const selectEmail = (state) => state.auth.email;
export const selectName = (state) => state.auth.name;

export const { clearAuth, clearError, setLogin, setLogout, preFetchUserInfo } =
  authSlice.actions;

export default authSlice.reducer;

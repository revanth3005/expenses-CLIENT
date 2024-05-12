import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/Counter";
import globalReducer from "./features/global/globalSlice";
import authReducer from "./features/auth/authSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  globalData: globalReducer,
  auth: authReducer,
});

export default rootReducer;

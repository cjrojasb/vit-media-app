import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const reducers = combineReducers({
  users: usersReducer,
});

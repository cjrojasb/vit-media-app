import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";

export const reducers = combineReducers({
  users: usersReducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
});

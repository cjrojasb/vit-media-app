import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";

export const reducers = combineReducers({
  users: usersReducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
  [photosApi.reducerPath]: photosApi.reducer,
});

import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

export const store = configureStore({
  devTools: {
    name: "vit-media-app",
  },
  reducer: reducers,
});

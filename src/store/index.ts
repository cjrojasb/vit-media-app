import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { albumsApi } from "./apis/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
  devTools: {
    name: "vit-media-app",
  },
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./thunks/usersRequests";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";
export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from "./apis/photosApi";

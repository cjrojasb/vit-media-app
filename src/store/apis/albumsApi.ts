import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:3005";

const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Album"],
  endpoints: (builder) => ({
    fetchAlbums: builder.query({
      query: (userId: string) => ({
        url: `/albums`,
        params: {
          userId,
        },
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Album", id: arg }],
    }),
    addAlbum: builder.mutation({
      query: (userId: string) => ({
        url: `/albums`,
        method: "POST",
        body: {
          userId,
          title: faker.commerce.productName(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Album", id: arg }],
    }),
    removeAlbum: builder.mutation({
      query: (albumId: string) => ({
        url: `/albums/${albumId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Album", id: arg }],
    }),
  }),
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };

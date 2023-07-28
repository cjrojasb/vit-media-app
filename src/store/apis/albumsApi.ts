import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album } from "../../domain/Album";
import { User } from "../slices/usersSlice";

const API_URL = "http://localhost:3005";

const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Album"],
  endpoints: (builder) => ({
    fetchAlbums: builder.query({
      query: (user: User) => ({
        url: `/albums`,
        params: {
          userId: user.id,
        },
        method: "GET",
      }),
      providesTags: (result, error, user) => {
        const tags = result.map((album: Album) => ({
          type: "Album",
          id: album.id,
        }));
        tags.push({
          type: "UserAlbums",
          id: user.id,
        });
        return tags;
      },
    }),
    addAlbum: builder.mutation({
      query: (user: User) => ({
        url: `/albums`,
        method: "POST",
        body: {
          userId: user.id,
          title: faker.commerce.productName(),
        },
      }),
      invalidatesTags: (result, error, user) => [
        { type: "UserAlbums", id: user.id },
      ],
    }),
    removeAlbum: builder.mutation({
      query: (album: Album) => ({
        url: `/albums/${album.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, album) => [
        { type: "Album", id: album.id },
      ],
    }),
  }),
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };

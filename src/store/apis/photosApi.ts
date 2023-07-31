import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "./albumsApi";
import { Album } from "../../domain/Album";
import { faker } from "@faker-js/faker";
import { Photo } from "../../domain/Photo";

const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Photo"],
  endpoints: (builder) => ({
    fetchPhotos: builder.query({
      query: (album: Album) => ({
        url: `/photos`,
        params: {
          albumId: album.id,
        },
        method: "GET",
      }),
      providesTags: (result, error, album) => {
        const tags = result.map((photo: Photo) => ({
          type: "Photo",
          id: photo.id,
        }));
        tags.push({
          type: "AlbumPhoto",
          id: album.id,
        });
        return tags;
      },
    }),
    addPhoto: builder.mutation({
      query: (album: Album) => ({
        url: `/photos`,
        method: "POST",
        body: {
          albumId: album.id,
          url: faker.image.abstract(150, 150, true),
        },
      }),
      invalidatesTags: (result, error, album) => [
        { type: "AlbumPhoto", id: album.id },
      ],
    }),
    removePhoto: builder.mutation({
      query: (photo: Photo) => ({
        url: `/photos/${photo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, photo) => [
        { type: "Photo", id: photo.id },
      ],
    }),
  }),
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };

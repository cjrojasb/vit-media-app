import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

export interface User {
  id: number;
  name: string;
}

export interface UsersSliceState {
  data: User[];
  isLoading: boolean;
  error: SerializedError | null;
}

const UsersSliceStateDefault: UsersSliceState = {
  data: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState: UsersSliceStateDefault,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const usersReducer = usersSlice.reducer;

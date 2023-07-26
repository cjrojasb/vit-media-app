import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3005";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(`${API_URL}/users`);

  return response.data;
});

export { fetchUsers };

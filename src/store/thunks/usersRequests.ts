import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3005";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(`${API_URL}/users`);

  return response.data;
});

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post(`${API_URL}/users`, {
    name: faker.name.fullName(),
  });

  return response.data;
});

export { fetchUsers, addUser };

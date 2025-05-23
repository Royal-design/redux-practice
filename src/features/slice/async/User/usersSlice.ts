import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserType {
  id: string;
  name: string;
  username: string;
  email: string;
}
const BASE_URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get<UserType[]>(BASE_URL);
  return response.data;
});

interface UsersState {
  users: UserType[];
}

const initialState: UsersState = {
  users: []
};

export const asyncUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export const {} = asyncUsersSlice.actions;

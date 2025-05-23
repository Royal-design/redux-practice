import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  id: string;
  name: string;
}
const initialState: UserType[] = [
  {
    id: "0",
    name: "Ade Olaoluwa"
  },
  {
    id: "1",
    name: "Ife Ademide"
  },
  {
    id: "2",
    name: "Oreofe Inumidun"
  }
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
});

export const {} = usersSlice.actions;

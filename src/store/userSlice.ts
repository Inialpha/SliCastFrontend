// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  isStaff: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      currentState,
      action: PayloadAction<{
        id: string;
        firstName: string;
        lastName: string;
        isStaff: boolean;
      }>
    ) => {
      const {
        id,
        firstName,
        lastName,
        isStaff,
      } = action.payload;

      currentState.id = id;
      currentState.firstName = firstName;
      currentState.lastName = lastName;
      currentState.isStaff = isStaff;
    },
    logout: (state) => {
      return { ...initialState };
    },
    updateUserInfo: (
      currentState,
      action: PayloadAction<{
        firstName?: string;
        lastName?: string;
      }>
    ) => {
      const { firstName, lastName, } = action.payload;
      if (firstName) currentState.firstName = firstName;
      if (lastName) currentState.lastName = lastName;
    },
  },
});

export const { login, logout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;

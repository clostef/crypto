import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    logout(state) {
      state.userData = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

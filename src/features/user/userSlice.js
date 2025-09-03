import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const editUser = createAsyncThunk(
  "user/editUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.token;

      const response = await fetch("http://localhost:3111/edit-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to edit user");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.userData = null;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({ user: action.payload, token: state.token })
      );
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

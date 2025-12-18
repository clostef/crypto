import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api";

export const editUser = createAsyncThunk(
  "user/editUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.token;

      const response = await fetch(`${API}/edit-user`, {
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

      const data = await response.json();

      return { ...userData, ...data };
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
      localStorage.setItem(
        "user",
        JSON.stringify({ user: state.userData, token: state.token })
      );
    },
    logout(state) {
      state.userData = null;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      localStorage.setItem(
        "user",
        JSON.stringify({ user: state.userData, token: state.token })
      );
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

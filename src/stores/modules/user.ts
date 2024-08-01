import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  user: Record<string, any> | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("__token__") || null,
  user: JSON.parse(localStorage.getItem("__user__") || "null") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<{ user: Record<string, any> }>) {
      state.user = action.payload.user;
      localStorage.setItem("__user__", JSON.stringify(action.payload.user));
    },
    loginHandle(state, action: PayloadAction<{ token: string; user: Record<string, any> }>) {
      localStorage.setItem("__token__", action.payload.token);
      localStorage.setItem("__user__", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutHandle(state) {
      localStorage.removeItem("__token__");
      localStorage.removeItem("__user__");
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginHandle, logoutHandle, setInfo } = authSlice.actions;
export default authSlice.reducer;

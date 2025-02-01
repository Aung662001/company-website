import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
interface AuthState {
  user: User | undefined;
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  role: string | null;
  loading: boolean;
  error: string | null;
}

export const login = createAsyncThunk(
  "api/user/login",
  async ({ email, password }: { email: string; password: string }) => {
    let response = await fetch("api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data;
  }
);
const initialState: AuthState = {
  user: undefined,
  isLogin: false,
  accessToken: "",
  refreshToken: "",
  role: "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      (state.accessToken = action.payload.accessToken || ""),
        (state.refreshToken = action.payload.refreshToken || ""),
        (state.user = action.payload.user),
        (state.isLogin = action.payload.login);
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = undefined;
      state.isLogin = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.user.accessToken || "";
        state.refreshToken = action.payload.user.refreshToken || "";
        state.isLogin = true;
        state.role = action.payload.user.role || "admin";
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Login failed:", action.error.message);
        state.loading = false;
        state.error = action.error.message || "Login Failed";
      });
  },
});

export const { setCredential, logout } = authSlice.actions;

export default authSlice.reducer;

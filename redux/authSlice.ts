import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/authApi";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

// Helper function to decode JWT and extract user info
const getUserFromToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    console.log("decode", decoded);
    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      username: decoded.email.split("@")[0], // Extracting username from email as a fallback
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// Initialize state from localStorage if available
if (typeof window !== "undefined") {
  const token = localStorage.getItem("accessToken");
  if (token) {
    initialState.accessToken = token;
    initialState.isAuthenticated = true;
    initialState.user = getUserFromToken(token);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.user = getUserFromToken(accessToken);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

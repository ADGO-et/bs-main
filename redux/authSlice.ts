import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/authApi";
import { jwtDecode } from "jwt-decode";
import companyApi from "./api/companyApi";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

// Helper function to decode JWT and extract user info
interface DecodedToken {
  sub?: string;
  email?: string;
  role?: string;
  company?: string;
  [key: string]: unknown;
}

const getUserFromToken = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("decode", decoded);
    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      username: decoded.email.split("@")[0],
      company: decoded.company || null,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// NOTE: Do NOT read from localStorage here (module init) because this file
// executes on both server and client. Doing so makes server and client initial
// states diverge and triggers React hydration warnings. Session restoration is
// now handled in a client-only provider via useEffect.

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
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
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

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

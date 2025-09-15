import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { startupApi } from "./api/startupApi";
import { jobApi } from "./api/jobApi";
import { hiwotApi } from "./api/hiwotApi";
import { blogApi } from "./api/blogApi";
import { contactusApi } from "./api/contactusApi";
import authReducer from "@/redux/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./api/userApi";
import { companyApi } from "./api/companyApi";
import { fundingApi } from "./api/fundingApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [startupApi.reducerPath]: startupApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [hiwotApi.reducerPath]: hiwotApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [contactusApi.reducerPath]: contactusApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [fundingApi.reducerPath]: fundingApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      startupApi.middleware,
      jobApi.middleware,
      hiwotApi.middleware,
      blogApi.middleware,
      contactusApi.middleware,
      userApi.middleware,
      companyApi.middleware,
      fundingApi.middleware
    ),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import patientReducer from "../features/patientSlice";

export const store = configureStore({
  reducer: { auth: authReducer, patient: patientReducer },
});

export type RootState = ReturnType<typeof store.getState>;

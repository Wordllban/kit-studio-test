import { configureStore } from "@reduxjs/toolkit";

import start from "../pages/Start/start.slice";

export const store = configureStore({
  reducer: { start },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

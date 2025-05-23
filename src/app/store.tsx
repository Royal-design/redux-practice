import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./service/dummyData";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postSlice } from "../features/slice/postSlice";
import { usersSlice } from "@/features/slice/usersSlice";
import { asyncPostSlice } from "@/features/slice/async/postSlice";
import { asyncUsersSlice } from "@/features/slice/async/User/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    posts: postSlice.reducer,
    users: usersSlice.reducer,
    asyncposts: asyncPostSlice.reducer,
    asyncUsers: asyncUsersSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

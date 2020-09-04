import { configureStore, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk, { ThunkAction } from "redux-thunk";

import { useDispatch } from "react-redux";
import rootReducer, { RootState } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['test', 'authentication', ''], //Things u want to persist
  // blacklist: [], //Things u dont
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppDispatch = () => useDispatch<AppDispatch>();
export { store, persistor, useAppDispatch };

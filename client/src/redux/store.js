import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  version: 1,
  key: "root",
  storage,
};

const rootReducer = combineReducers({ auth: authReducer });
const persistedReducer = persistReducer( persistConfig, rootReducer );

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReduser from "./reducers/UserSlice";
import { transactionsAPI } from "./services/TransactionsService";
import { userAPI } from "./services/UserService";
import { confirmAPI } from "./services/ConfirmService";

const rootReducer = combineReducers({
  userReduser,
  [transactionsAPI.reducerPath]: transactionsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [confirmAPI.reducerPath]: confirmAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(transactionsAPI.middleware)
        .concat(userAPI.middleware)
        .concat(confirmAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

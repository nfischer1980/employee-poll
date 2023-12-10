import { configureStore } from "@reduxjs/toolkit";
import logger from "../middleware/logger";
import questions from "../reducers/questions";
import users from "../reducers/users";
import authUser from "../reducers/authUser";

const reducers = {
  questions,
  users,
  authUser,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

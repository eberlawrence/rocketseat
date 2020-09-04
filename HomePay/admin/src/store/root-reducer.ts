import { combineReducers } from "@reduxjs/toolkit";

import userInfo from "store/slices/user";
import menuInfo from "store/slices/menu";

const rootReducer = combineReducers({
  user: userInfo.reducer,
  menu: menuInfo.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

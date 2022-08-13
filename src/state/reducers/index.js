import { combineReducers } from "redux";
import UserReducers from "./user.reducer";

const combineReducer = combineReducers({
  user: UserReducers,
});

export default combineReducer;

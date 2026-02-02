import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  cartReducer,
  userReducer,
});

export default rootReducers;

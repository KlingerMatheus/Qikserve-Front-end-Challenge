import { combineReducers } from "redux";
import cartReducer from "@/reducers/slices/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;

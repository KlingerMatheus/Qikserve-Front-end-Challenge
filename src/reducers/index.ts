import { combineReducers } from "redux";
import cartReducer from "../reducers/slices/cartSlice";
import venueReducer from "../reducers/slices/venueSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  venue: venueReducer,
});

export default rootReducer;

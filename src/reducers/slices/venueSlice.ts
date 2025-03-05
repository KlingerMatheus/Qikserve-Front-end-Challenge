import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VenueData, VenueState } from "types";

const initialState: VenueState = {
  data: null,
};

const venueSlice = createSlice({
  name: "webSettings",
  initialState,
  reducers: {
    addVenueData: (state: VenueState, action: PayloadAction<VenueData>) => {
      state.data = action.payload;
    },
  },
});

export const venueActions = venueSlice.actions;

export default venueSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isPropertiesSideNavOpen: false,
};

const propertiesMapSlice = createSlice({
  name: "PropertiesaMap",
  initialState,
  reducers: {
    setIsPropertiesSideNavOpen: (state, action) => {
      state.isPropertiesSideNavOpen = action.payload;
    },
  },
});

export const { setIsPropertiesSideNavOpen } = propertiesMapSlice.actions;

export default propertiesMapSlice.reducer;

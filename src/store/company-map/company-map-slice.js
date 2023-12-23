import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isCompanySideNavOpen: false,
};

const companyMapSlice = createSlice({
  name: "CompanyMap",
  initialState,
  reducers: {
    setIsCompanySideNavOpen: (state, action) => {
      state.isCompanySideNavOpen = action.payload;
    },
  },
});

export const { setIsCompanySideNavOpen } = companyMapSlice.actions;

export default companyMapSlice.reducer;

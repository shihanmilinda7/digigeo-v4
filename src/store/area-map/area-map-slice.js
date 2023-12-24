import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAreaSideNavOpen: false,
  areaCountry: "",
  areaMiningArea: "",
  syncPropertyFeatures: undefined,
  featuredPropertyFeatures: undefined,
  syncClaimLinkPropertyFeatures: undefined,
  assetFeatures: undefined,
  areaZoomMode: "custom",
  areaFpropLayerVisible: true,
  areaAssetLayerVisible: true,
  areaSyncPropLayerVisible: true,
  areaSyncClaimLinkLayerVisible: true,
};

const areaMapSlice = createSlice({
  name: "AreaMap",
  initialState,
  reducers: {
    setIsAreaSideNavOpen: (state, action) => {
      state.isAreaSideNavOpen = action.payload;
    },
    setAreaCountry: (state, action) => {
      state.areaCountry = action.payload;
    },
    setAreaMiningArea: (state, action) => {
      state.areaMiningArea = action.payload;
    },
    setSyncPropertyFeatures: (state, action) => {
      state.syncPropertyFeatures = action.payload;
    },
    setFPropertyFeatures: (state, action) => {
      state.featuredPropertyFeatures = action.payload;
    },
    setsyncClaimLinkPropertyFeatures: (state, action) => {
      state.syncClaimLinkPropertyFeatures = action.payload;
    },
    setAssetFeatures: (state, action) => {
      state.assetFeatures = action.payload;
    },
    setAreaZoomMode: (state, action) => {
      state.areaZoomMode = action.payload;
    },
    setareaFpropLayerVisible: (state, action) => {
      state.areaFpropLayerVisible = action.payload;
    },
    setareaAssetLayerVisible: (state, action) => {
      state.areaAssetLayerVisible = action.payload;
    },
    setareaSyncPropLayerVisible: (state, action) => {
      state.areaSyncPropLayerVisible = action.payload;
    },
    setareaSyncClaimLinkLayerVisible: (state, action) => {
      state.areaSyncClaimLinkLayerVisible = action.payload;
    },
  },
});

export const {
  setAreaCountry,
  setAreaMiningArea,
  setIsAreaSideNavOpen,
  setSyncPropertyFeatures,
  setFPropertyFeatures,
  setsyncClaimLinkPropertyFeatures,
  setAssetFeatures,
  setAreaZoomMode,
  setareaFpropLayerVisible,
  setareaAssetLayerVisible,
  setareaSyncPropLayerVisible,
  setareaSyncClaimLinkLayerVisible,
} = areaMapSlice.actions;

export default areaMapSlice.reducer;

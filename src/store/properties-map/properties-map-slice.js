import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isPropertiesSideNavOpen: false,
  propertyMapPropertyAssetIdCsv: {propertyids:[],assetids:[]},
  propertyMapAssetCsv: "",
  syncPropertyFeatures: undefined,
  featuredPropertyFeatures: undefined,
  syncClaimLinkPropertyFeatures: undefined,
  assetFeatures: undefined,
  propertyMapZoomMode: "custom",
  propertyMapFpropLayerVisible: true,
  propertyMapAssetLayerVisible: true,
  propertyMapSyncPropLayerVisible: true,
  propertyMapSyncClaimLinkLayerVisible: true,
  propertyMapClaimLayerVisible: true,
  propertyMapAreaBoundaryLayerVisible: true,
  propertyMapAssetOpMineVisible: true,
  propertyMapAssetDepositsVisible: true,
  propertyMapAssetZoneVisible: true,
  propertyMapAssetHistoricalVisible: true,
  propertyMapAssetOccurrenceVisible: true,
  propertyMapFlyToLocation: [],
  clickclaimObject: undefined,
  clickfPropertyObject: undefined,
  clickassetObject: undefined,
  clicksyncPropertyObject: undefined,
};

const propertiesMapSlice = createSlice({
  name: "PropertiesaMap",
  initialState,
  reducers: {
    setIsPropertiesSideNavOpen: (state, action) => {
      state.isPropertiesSideNavOpen = action.payload;
    },
    setpropertyMapPropertyAssetIdCsv: (state, action) => {
      state.propertyMapPropertyAssetIdCsv = action.payload;
    },
    setpropertyMapAssetCsv: (state, action) => {
      state.propertyMapAssetCsv = action.payload;
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
    setpropertyMapZoomMode: (state, action) => {
      state.propertyMapZoomMode = action.payload;
    },
    //layer visibility
    setpropertyMapFpropLayerVisible: (state, action) => {
      state.propertyMapFpropLayerVisible = action.payload;
    },
    setpropertyMapAssetLayerVisible: (state, action) => {
      state.propertyMapAssetLayerVisible = action.payload;
    },
    setpropertyMapSyncPropLayerVisible: (state, action) => {
      state.propertyMapSyncPropLayerVisible = action.payload;
    },
    setpropertyMapSyncClaimLinkLayerVisible: (state, action) => {
      state.propertyMapSyncClaimLinkLayerVisible = action.payload;
    },
    setpropertyMapClaimLayerVisible: (state, action) => {
      state.propertyMapClaimLayerVisible = action.payload;
    },
    setpropertyMapAreaBoundaryLayerVisible: (state, action) => {
      state.propertyMapAreaBoundaryLayerVisible = action.payload;
    },
    //asset types
    setpropertyMapAssetOpMineVisible: (state, action) => {
      state.propertyMapAssetOpMineVisible = action.payload;
    },
    setpropertyMapAssetDepositsVisible: (state, action) => {
      state.propertyMapAssetDepositsVisible = action.payload;
    },
    setpropertyMapAssetZoneVisible: (state, action) => {
      state.propertyMapAssetZoneVisible = action.payload;
    },
    setpropertyMapAssetHistoricalVisible: (state, action) => {
      state.propertyMapAssetHistoricalVisible = action.payload;
    },
    setpropertyMapAssetOccurrenceVisible: (state, action) => {
      state.propertyMapAssetOccurrenceVisible = action.payload;
    },
    setpropertyMapFlyToLocation: (state, action) => {
      state.propertyMapFlyToLocation = action.payload;
    },
    //single click objects
    setclickclaimObject: (state, action) => {
      state.clickclaimObject = action.payload;
    },
    setclickfPropertyObject: (state, action) => {
      state.clickfPropertyObject = action.payload;
    },
    setclickassetObject: (state, action) => {
      state.clickassetObject = action.payload;
    },
    setclicksyncPropertyObject: (state, action) => {
      state.clicksyncPropertyObject = action.payload;
    },
  },
});

export const {
  setIsPropertiesSideNavOpen,
  setpropertyMapPropertyAssetIdCsv,
  setpropertyMapAssetCsv,
  setSyncPropertyFeatures,
  setFPropertyFeatures,
  setsyncClaimLinkPropertyFeatures,
  setAssetFeatures,
  setpropertyMapZoomMode,
  setpropertyMapFpropLayerVisible,
  setpropertyMapAssetLayerVisible,
  setpropertyMapSyncPropLayerVisible,
  setpropertyMapSyncClaimLinkLayerVisible,
  setpropertyMapClaimLayerVisible,
  setpropertyMapAssetOpMineVisible,
  setpropertyMapAssetDepositsVisible,
  setpropertyMapAssetZoneVisible,
  setpropertyMapAssetHistoricalVisible,
  setpropertyMapAssetOccurrenceVisible,
  setpropertyMapAreaBoundaryLayerVisible,
  setpropertyMapFlyToLocation,
  setclickclaimObject,
  setclickfPropertyObject,
  setclickassetObject,
  setclicksyncPropertyObject,
} = propertiesMapSlice.actions;

export default propertiesMapSlice.reducer;

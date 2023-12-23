// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//   selectedMap: "area",
//   isSideNavOpen: true,
//   // isAreaSideNavOpen: true,
//   // isCompanySideNavOpen: true,
//   // isCommoditySideNavOpen: true,
//   areaLyrs: "m",
//   companyLyrs: "m",
//   commodityLyrs: "m",
//   areaZoomLevel: 2,
//   companyZoomLevel: 2,
//   commodityZoomLevel: 2,
//   areaInitialCenter: [0, 0],
//   companyInitialCenter: [0, 0],
//   commodityInitialCenter: [0, 0],
//   currentSearchString: "",
// };

// const mapSelectorSlice = createSlice({
//   name: "MapSelector",
//   initialState,
//   reducers: {
//     setSelectedMap: (state, action) => {
//       state.selectedMap = action.payload;
//       switch (action.payload) {
//         case "area":
//           // console.log("state.isAreaSideNavOpen", state.isAreaSideNavOpen);
//           state.currentSearchString = `?t=${action.payload}&sn=${state.isSideNavOpen}&lyrs=${state.areaLyrs}&z=${state.areaZoomLevel}&c=${state.areaInitialCenter}`;
//           break;
//         case "company":
//           state.currentSearchString = `?t=${action.payload}&sn=${state.isSideNavOpen}`;
//           break;
//         case "commodity":
//           state.currentSearchString = `?t=${action.payload}&sn=${state.isSideNavOpen}`;
//           break;
//         default:
//           break;
//       }
//     },
//     setIsSideNavOpen: (state, action) => {
//       state.isSideNavOpen = action.payload;
//       state.currentSearchString = `?t=${state.selectedMap}&sn=${action.payload}&lyrs=${state.areaLyrs}&z=${state.areaZoomLevel}&c=${state.areaInitialCenter}`;
//     },
//     // setIsAreaSideNavOpen: (state, action) => {
//     //   state.isAreaSideNavOpen = action.payload;
//     //   state.currentSearchString = `?t=${state.selectedMap}&sn=${action.payload}&lyrs=${state.areaLyrs}&z=${state.areaZoomLevel}&c=${state.areaInitialCenter}`;
//     // },
//     // setIsCompanySideNavOpen: (state, action) => {
//     //   state.isCompanySideNavOpen = action.payload;
//     // },
//     // setIsCommoditySideNavOpen: (state, action) => {
//     //   state.isCommoditySideNavOpen = action.payload;
//     // },
//     setAreaLyrs: (state, action) => {
//       state.areaLyrs = action.payload;
//       state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isSideNavOpen}&lyrs=${action.payload}&z=${state.areaZoomLevel}&c=${state.areaInitialCenter}`;
//     },
//     setCompanyLyrs: (state, action) => {
//       state.companyLyrs = action.payload;
//     },
//     setCommodityLyrs: (state, action) => {
//       state.commodityLyrs = action.payload;
//     },
//     setAreaZoomLevel: (state, action) => {
//       state.areaZoomLevel = action.payload;
//       state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isSideNavOpen}&lyrs=${state.areaLyrs}&z=${action.payload}&c=${state.areaInitialCenter}`;
//     },
//     setCompanyZoomLevel: (state, action) => {
//       state.companyZoomLevel = action.payload;
//     },
//     setCommodityZoomLevel: (state, action) => {
//       state.commodityZoomLevel = action.payload;
//     },
//     setAreaInitialCenter: (state, action) => {
//       state.areaInitialCenter = action.payload;
//       state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isSideNavOpen}&lyrs=${state.areaLyrs}&z=${state.areaZoomLevel}&c=${action.payload}`;
//     },
//     setCompanyInitialCenter: (state, action) => {
//       state.companyInitialCenter = action.payload;
//     },
//     setCommodityInitialCenter: (state, action) => {
//       state.commodityInitialCenter = action.payload;
//     },
//     setCurrentSearchString: (state) => {
//       state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isAreaSideNavOpen}&lyrs=${state.areaLyrs}&z=${state.areaZoomLevel}&c=${state.areaInitialCenter}`;
//     },
//   },
// });

// export const {
//   setSelectedMap,
//   setIsSideNavOpen,
//   // setIsAreaSideNavOpen,
//   // setIsCompanySideNavOpen,
//   // setIsCommoditySideNavOpen,
//   setCurrentSearchString,
//   setAreaLyrs,
//   setCompanyLyrs,
//   setCommodityLyrs,
//   setAreaZoomLevel,
//   setCompanyZoomLevel,
//   setCommodityZoomLevel,
//   setAreaInitialCenter,
//   setCompanyInitialCenter,
//   setCommodityInitialCenter,
// } = mapSelectorSlice.actions;

// export default mapSelectorSlice.reducer;

import { combineReducers } from "@reduxjs/toolkit";
import mapSelectorReducer from "./map-selector/map-selector-slice";
import areaMapReducer from "./area-map/area-map-slice";
import propertiesMapReducer from "./properties-map/properties-map-slice";
import companyMapReducer from "./company-map/company-map-slice";

const rootReducer = combineReducers({
  mapSelectorReducer,
  areaMapReducer,
  propertiesMapReducer,
  companyMapReducer,
});

export default rootReducer;

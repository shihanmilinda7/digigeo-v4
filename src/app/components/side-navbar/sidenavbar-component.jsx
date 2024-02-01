"use client";

import { Button, Chip, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiTwotoneGold,
} from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSideNavOpen,
  setSelectedMap,
  setUrlUpdate,
} from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../filter-popups/area-filters";
import AreaBottomSideComp from "./bottom-components/area-bottom-side-component";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";
import AreaMapButton from "./map-button-component/area-map-button";
import PropertiesMapButton from "./map-button-component/properties-map-button";
import PropertiesBottomSideComp from "./bottom-components/properties-bottom-side-component";
import CompanyMapButton from "./map-button-component/company-map-button";
import CompanyBottomSideComp from "./bottom-components/company-bottom-side-component";

const SideNavbar = () => {
  let pathname = "";
  const dispatch = useDispatch();
  const router = useRouter();
  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

  //area map redux variables
  const isAreaSideNavOpen = useSelector(
    (state) => state.areaMapReducer.isAreaSideNavOpen
  );
  const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);
  const areaState = useSelector((state) => state.areaMapReducer.areaMiningArea);

  //properties map redux variables
  const isPropertiesSideNavOpen = useSelector(
    (state) => state.propertiesMapReducer.isPropertiesSideNavOpen
  );
  const propertiesLyrs = useSelector(
    (state) => state.mapSelectorReducer.propertiesLyrs
  );
  const propertiesZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.propertiesZoomLevel
  );
  const propertiesInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.propertiesInitialCenter
  );
  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );

  //company map redux variables
  const isCompanySideNavOpen = useSelector(
    (state) => state.companyMapReducer.isCompanySideNavOpen
  );
  const companyLyrs = useSelector(
    (state) => state.mapSelectorReducer.companyLyrs
  );
  const companyZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.companyZoomLevel
  );
  const companyInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.companyInitialCenter
  );

  const selectMapHandler = (selectedValue) => {
    dispatch(setSelectedMap(selectedValue));
    let newUrl;
    if (selectedValue == "area") {
      if (areaState == "") {
        newUrl = `${window.location.pathname}?t=${selectedValue}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
      } else {
        newUrl = `${window.location.pathname}?t=${selectedValue}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaState}`;
      }
    } else if (selectedValue == "properties") {
      newUrl = `${window.location.pathname}?t=${selectedValue}&sn=${isSideNavOpen}&sn2=${isPropertiesSideNavOpen}&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;
    } else if (selectedValue == "company") {
      newUrl = `${window.location.pathname}?t=${selectedValue}&sn=${isSideNavOpen}&sn2=${isCompanySideNavOpen}&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    }
    window.history.replaceState({}, "", newUrl);
  };

  // const openAreaNav = () => {
  //   let newUrl;
  //   if (areaState == "") {
  //     newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
  //   } else {
  //     newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaState}`;
  //   }
  //   window.history.replaceState({}, "", newUrl);
  //   dispatch(setIsAreaSideNavOpen(true));
  // };
  return (
    <section className="flex gap-6">
      <div className={`duration-500 flex w-auto`}>
        <div
          className={`
        ${
          isSideNavOpen
            ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
            : ""
        } 
        h-[90vh] ml-2 mt-2
        ${isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"} 
        duration-500`}
        >
          <div
            className={`${isSideNavOpen ? "py-0.1 flex-col justify-between h-1/2 gap-2" : "hidden"}`}
          >
              <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2">
                {/* <span className="font-bold">Overview</span> */}
              </div>
              <div className="m-2">
                {/* <Input
                  // list={list}
                  isClearable
                  type="text"
                  size={"sm"}
                  variant="flat"
                  placeholder="Search here..."
                  onClear={() => console.log("input cleared")}
                  className="w-full rounded-lg border border-blue-700"
                  startContent={<FaSearch className="h-4 w-4 text-gray-400" />}
                /> */}
              </div>
              <div className="flex flex-col gap-2 p-2 ">
                <AreaMapButton onClick={() => selectMapHandler("area")} />
                <PropertiesMapButton
                  onClick={() => selectMapHandler("properties")}
                />
                <CompanyMapButton onClick={() => selectMapHandler("company")} />
              </div>
              <div className="mt-4 mb-1 flex items-center justify-center">
                <div
                  style={{
                    display: selectedMap === "area" ? "block" : "none",
                  }}
                  className="w-full"
                >
                  <AreaBottomSideComp />
                </div>
                <div
                  style={{
                    display: selectedMap === "properties" ? "block" : "none",
                  }}
                  className="w-full"
                >
                  <PropertiesBottomSideComp />
                </div>
                <div
                  style={{
                    display: selectedMap === "company" ? "block" : "none",
                  }}
                  className="w-full"
                >
                  <CompanyBottomSideComp />
                </div>
              </div>
              <div className="w-full pb-2 pl-2 pr-2 pt-2">
                <div className="flex justify-center">
                  <button className=" flex items-center justify-center border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm hover:bg-blue-400 py-2 w-full transition duration-150 ease-in">
                    <span className="uppercase font-semibold">
                      Reset all filters
                    </span>
                  </button>
                </div>
              </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative"></div>
        </div>
      </div>
    </section>
  );
};
export default SideNavbar;

"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  AiFillAppstore,
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineCloseCircle,
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
import {
  setAssetFeatures,
  setFPropertyFeatures,
  setIsAreaSideNavOpen,
  setSyncPropertyFeatures,
} from "../../../store/area-map/area-map-slice";
import TreeView from "../common-comp/treeview";
import Accordion from "../common-comp/accordion";
import AccordionItemWithEye from "../common-comp/accordion-eye";
import AreaTreeView from "./area-map/area-tree-view";
import FeaturedCompanyDetailDiv from "./area-map/featured-company-detail-div";
import { setIsPropertiesSideNavOpen } from "../../../store/properties-map/properties-map-slice";

const PropertiesSideNavbar = () => {
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

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
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

  const isPropertiesSideNavOpen = useSelector(
    (state) => state.propertiesMapReducer.isPropertiesSideNavOpen
  );

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;

    window.history.replaceState({}, "", newUrl);
    dispatch(setIsPropertiesSideNavOpen(false));
  };

  return (
    <section className="flex gap-6">
      <div className={`duration-500 flex w-auto`}>
        <div
          className={`
        ${
          isPropertiesSideNavOpen && isSideNavOpen
            ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
            : ""
        } 
        h-[90vh] ml-2 mt-2
        ${
          isPropertiesSideNavOpen && isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"
        } 
        duration-500`}
        >
          <div
            className={`${
              isPropertiesSideNavOpen && isSideNavOpen
                ? "py-0.1 flex flex-col "
                : "hidden"
            }`}
          >
            <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2 relative">
              <span className="font-bold">Company List </span>
              <AiOutlineCloseCircle
                onClick={closeSecondNavBar}
                className="h-6 w-6 text-blue-700 cursor-pointer absolute right-0"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <Accordion>
              <div className="flex flex-col gap-6">
                <AccordionItemWithEye title="Featured Companies">
                  Company List
                </AccordionItemWithEye>
                <AccordionItemWithEye title="All Properties">
                  <div className="overflow-y-auto max-h-[25vh]">
                    Tree View
                  </div>
                </AccordionItemWithEye>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PropertiesSideNavbar;

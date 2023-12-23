"use client";

// import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
// import { setIsAreaSideNavOpen } from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import LayerVisibleDiv from "../../common-comp/layer-visible-eye";
import { AiFillAppstore } from "react-icons/ai";
import { setIsAreaSideNavOpen } from "../../../../store/area-map/area-map-slice";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../../filter-popups/area-filters";
import { FaFilter } from "react-icons/fa";
import { Chip } from "@nextui-org/react";
import PropertiesFilter from "../../filter-popups/properties-filters";

const PropertiesMapButton = ({ onClick }) => {
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

  const [isOpenIn, setIsOpenIn] = useState();

  const closePopup = () => {
    setIsOpenIn(false);
  };

  const openPropertiesNav = () => {
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsAreaSideNavOpen(true));
  };

  return (
    <div className="flex justify-center gap-1 w-full flex-col">
      <div className="flex justify-center gap-1 w-full">
        <button
          onClick={onClick}
          className={`relative flex items-center border rounded-lg border-blue-500 focus:outline-none ${
            selectedMap === "properties"
              ? " text-white bg-blue-600 w-10/12"
              : " text-blue-600 bg-white w-full"
          } text-sm sm:text-sm hover:bg-blue-200 py-2 transition duration-150 ease-in`}
        >
          <BsFillBuildingsFill className="h-6 w-6 ml-2" />
          <span className="uppercase ml-2 font-semibold">Properties</span>
        </button>
        {isOpenIn ? (
          <PropertiesFilter isOpenIn={isOpenIn} closePopup={closePopup} />
        ) : null}
        <button
          onClick={() => setIsOpenIn(true)}
          className={`relative flex items-center justify-center border rounded-lg border-blue-500 focus:outline-none ${
            selectedMap === "properties"
              ? " text-white bg-blue-600 w-2/12"
              : " hidden"
          } text-sm sm:text-sm hover:bg-blue-200 py-2 transition duration-150 ease-in`}
        >
          <FaFilter className="h-4 w-4" />
        </button>
      </div>
      {/* <div
        className={`${
          selectedMap === "area" &&
          !isAreaSideNavOpen &&
          areaCountry != "" &&
          areaState != ""
            ? "flex justify-between"
            : "hidden"
        } `}
      >
        <Chip
          color="default"
          variant="light"
          className="cursor-pointer"
          size="sm"
        >
          Reset
        </Chip>
        <Chip
          color="primary"
          variant="bordered"
          className="cursor-pointer hover:bg-gray-200"
          size="sm"
          onClick={openAreaNav}
        >
          View List
        </Chip>
      </div> */}
    </div>
  );
};
export default PropertiesMapButton;

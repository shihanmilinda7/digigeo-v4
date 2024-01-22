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
} from "../../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../../filter-popups/area-filters";
import {
  setAssetFeatures,
  setFPropertyFeatures,
  setIsPropertiesSideNavOpen,
  setSyncPropertyFeatures,
  setpropertyMapFpropLayerVisible,
  setsyncClaimLinkPropertyFeatures
} from "../../../../store/properties-map/properties-map-slice";
import TreeView from "../../common-comp/treeview";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import AreaTreeView from "../area-map/area-tree-view";
import PropertyFeaturedCompanyDetailDiv from "./property-featured-company-detail-div";
import PropertyTreeView from "./property-tree-view";







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

    const propertySearchQuery = useSelector(
    (state) => state.propertiesMapReducer.propertySearchQuery
  );

  const propertyMapPropertyAssetIdCsv = useSelector((state) => state.propertiesMapReducer.propertyMapPropertyAssetIdCsv);



  const syncPropertyFeatures = useSelector(
    (state) => state.propertiesMapReducer.syncPropertyFeatures
  );
  // const companyId = useSelector((state) => state.companyMapReducer.companyId);
  // const companyStockcode = useSelector((state) => state.companyMapReducer.companyStockcode);

   const [featuredCompanies, setFeaturedCompanies] = useState([]);

 
//data load
  useEffect(() => {
    console.log("propertyMapPropertyAssetIdCsv",propertyMapPropertyAssetIdCsv)
    if (propertySearchQuery) {
      // getFeaturedPropertyGeom();
      // getFeaturedCompanyDetails();

      getSyncPropertiesGeometry();
      getClaimLinkPropertiesGeometry();
      // getAssetsGeometry();
    }
  }, [propertySearchQuery]);

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;

    window.history.replaceState({}, "", newUrl);
    dispatch(setIsPropertiesSideNavOpen(false));
  };


      const getFeaturedPropertyGeom = async () => {
    const f = async () => {
        console.log("ppppp");
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/view_hotplay_table_with_sponsor_prop/${propertyMapPropertyAssetIdCsv.propertyids.join(",")}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
       const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      
      ///console.log("llll", d.data[0].json_build_object.features)
      dispatch(setFPropertyFeatures(gj));
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // );
    };

    f().catch(console.error);
  };

 const getFeaturedCompanyDetails = async () => {
   const f = async () => {
      console.log("propertyMapPropertyIdCsvxx",propertyMapPropertyAssetIdCsv.propertyids.join(","))
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/hotplayfcompanylist_prop/${propertyMapPropertyAssetIdCsv}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      //  console.log("fps", d.data);
      
      setFeaturedCompanies(d.data);
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // );
    };

    f().catch(console.error);
  };

  const getSyncPropertiesGeometry = async () => {
      console.log("lop")
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/propertygeomuniversal/${propertySearchQuery}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d); propertySearchQuery
       console.log("fps11", d.data);

      // setFeaturedCompanies(d.data);
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // ); setSyncPropertyFeatures

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      dispatch(setSyncPropertyFeatures(gj));
      console.log("gj-suncp", gj);
    };
    f().catch(console.error);
  };
  const getAssetsGeometry = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/assetgeomsbyarea/${areaName}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
      console.log("assets", d.data);

      // setFeaturedCompanies(d.data);
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // ); setSyncPropertyFeatures

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      dispatch(setAssetFeatures(gj));
      //console.log("gj", gj);
    };
    f().catch(console.error);
  };

  const getClaimLinkPropertiesGeometry = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/tbl_sync_claimlink_prop/${propertyMapPropertyAssetIdCsv.propertyids.join(",")}`,
        { cache: "no-store" }
      );
     const d = await res.json();
      //  console.log("fps-1", d);

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      dispatch(setsyncClaimLinkPropertyFeatures(gj));
    };

    f().catch(console.error);
  };

    const propertyMapFpropLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapFpropLayerVisible
  );

  const setareaFpropLayerVisibility = (e) => {
      console.log("zzzzzzz")
      dispatch(setpropertyMapFpropLayerVisible(!propertyMapFpropLayerVisible));
  }


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
                <AccordionItemWithEye title="Featured Companies" onClick = {setareaFpropLayerVisibility} eyeState={propertyMapFpropLayerVisible}>
                      <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh]">
                      {featuredCompanies?.map((i) => (
                        <PropertyFeaturedCompanyDetailDiv
                          key={i.colour}
                          title={i.company2}
                          companyid={i.companyid}
                          // onClick={() => console.log(featuredCompanies)}
                        >
                          <div
                            className={`w-4 h-4`}
                            style={{ backgroundColor: `${i.colour}` }}
                          ></div>
                        </PropertyFeaturedCompanyDetailDiv>
                      ))}
                    </div>
                </AccordionItemWithEye>
                <AccordionItemWithEye title="All Properties">
                  <div className="overflow-y-auto max-h-[25vh]">
                     <PropertyTreeView syncPropFeatures={syncPropertyFeatures} />
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

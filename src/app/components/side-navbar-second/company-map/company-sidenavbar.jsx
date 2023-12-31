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
  setIsCompanySideNavOpen,
  setSyncPropertyFeatures,
  setcompanyFpropLayerVisible,
  setsyncClaimLinkPropertyFeatures,
} from "../../../../store/company-map/company-map-slice";
import TreeView from "../../common-comp/treeview";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import AreaTreeView from "../area-map/area-tree-view";
import FeaturedCompanyDetailDiv from "../area-map/featured-company-detail-div";
import { setIsPropertiesSideNavOpen } from "../../../../store/properties-map/properties-map-slice";
import FeaturedPropertyDetailDiv from "./featured-property-detail-div";
import GeoJSON from "ol/format/GeoJSON";
import  Image  from 'next/image';
import CompanyTreeView from "./company-tree-view";

const CompanySideNavbar = () => {
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

    const featuredPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.featuredPropertyFeatures
  );

  const syncPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.syncPropertyFeatures
  );
  const companyName = useSelector((state) => state.companyMapReducer.companyName);
  const companyId = useSelector((state) => state.companyMapReducer.companyId);
  const companyStockcode = useSelector((state) => state.companyMapReducer.companyStockcode);


 
  const [featuredProperties, setFeaturedProperties] = useState([]);
  //data load
  useEffect(() => {
    console.log("companyId",companyId)
    if (companyId) {
      getFeaturedPropertyGeom();
      getSyncPropertiesGeometry();
      getClaimLinkPropertiesGeometry();
      getAssetsGeometry();
    }
  }, [companyId]);

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;

    window.history.replaceState({}, "", newUrl);
    dispatch(setIsCompanySideNavOpen(false));
  };


    const getFeaturedPropertyGeom = async () => {
    const f = async () => {
       console.log("companyId", companyId);
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/view_hotplay_company/${companyId}`,
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
      

      dispatch(setFPropertyFeatures(gj));
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // );
    };

    f().catch(console.error);
  };

  useEffect(() => {
    if (featuredPropertyFeatures) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures)
      setFeaturedProperties(e);

    }
  
  
  }, [featuredPropertyFeatures])
  
    const getSyncPropertiesGeometry = async () => {
      const f = async () => {
      // console.log("companyNames",companyName)
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/sync_property_bycompany/${companyName}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
      // console.log("fps", d.data);

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
      // console.log("gj", gj);
      };
      
    f().catch(console.error);
  };

   const getAssetsGeometry = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/assetgeom_bycompany/${companyName}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
      // console.log("assets", d.data);

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
        `https://atlas.ceyinfo.cloud/matlas/tbl_sync_claimlink_company/${companyName}`,
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
      dispatch(setsyncClaimLinkPropertyFeatures(gj));
    };

    f().catch(console.error);
  };

    const companyFpropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyFpropLayerVisible
  );

    const setFpropLayerVisibility = (e) => {
      dispatch(setcompanyFpropLayerVisible(!companyFpropLayerVisible));
  }
  return (
    <section className="flex gap-6">
      <div className={`duration-500 flex w-auto`}>
        <div
          className={`
        ${
          isCompanySideNavOpen && isSideNavOpen
            ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
            : ""
        } 
        h-[90vh] ml-2 mt-2
        ${
          isCompanySideNavOpen && isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"
        } 
        duration-500`}
        >
          <div
            className={`${
              isCompanySideNavOpen && isSideNavOpen
                ? "py-0.1 flex flex-col "
                : "hidden"
            }`}
          >
            <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2 relative">
              <span className="font-bold">Property Info </span>
              <AiOutlineCloseCircle
                onClick={closeSecondNavBar}
                className="h-6 w-6 text-blue-700 cursor-pointer absolute right-0"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <Accordion>
              <div className="flex flex-col gap-6">
                <AccordionItemWithEye title="Featured Properties" onClick = {setFpropLayerVisibility} eyeState={companyFpropLayerVisible}>
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh]">
                      {featuredProperties.map((i) => (
                       i.get("prop_name") && (<FeaturedPropertyDetailDiv
                          key={i.get("id")}
                          title={i.get("prop_name")}
                          propertyid={i.get("propertyid")}
                          // onClick={() => console.log(featuredCompanies)}
                          //imgRect.src = "data:image/svg+xml;utf8," + encodeURIComponent(hatch);
                        >
                           <Image
                            src= {"data:image/svg+xml;utf8," + encodeURIComponent(i.get("hatch"))}
                            className={`w-4 h-4`}
                            width={4}
                            height={4}
                            alt="prop"
                            />
                        
                        </FeaturedPropertyDetailDiv>)
                      ))}
                    </div>
                </AccordionItemWithEye>
                <AccordionItemWithEye title="All Properties">
                  <div className="overflow-y-auto max-h-[25vh]">
                     <CompanyTreeView syncPropFeatures={syncPropertyFeatures} />
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
export default CompanySideNavbar;

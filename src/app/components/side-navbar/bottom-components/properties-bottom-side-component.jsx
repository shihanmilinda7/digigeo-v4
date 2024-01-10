"use client";

// import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
// import { setIsAreaSideNavOpen } from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import LayerVisibleDiv from "../../common-comp/layer-visible-eye";
import { AiFillAppstore } from "react-icons/ai";
import {
  
  setpropertyMapAreaBoundaryLayerVisible,
  setpropertyMapAssetLayerVisible,
  setpropertyMapClaimLayerVisible,
  setpropertyMapFpropLayerVisible,
  setpropertyMapSyncClaimLinkLayerVisible,
  setpropertyMapSyncPropLayerVisible,
} from "@/store/properties-map/properties-map-slice";


const PropertiesBottomSideComp = () => {
  let pathname = "";
  const dispatch = useDispatch();
  const [property_claimLinkGroupVisible, setproperty_claimLinkGroupVisible] = useState(true)

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

  const isAreaSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isAreaSideNavOpen
  );

  const accordionItems = [
    {
      title: "Assets",
      content: "Content for Accordion Item 1",
    },
    {
      title: "Properties",
      content: "Content for Accordion Item 2",
    },
    {
      title: "Claims",
      content: "Content for Accordion Item 3",
    },
  ];


  //layer visibility redux states
  const propertyMapFpropLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapFpropLayerVisible
  );
  const propertyMapAssetLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetLayerVisible
  );
  const propertyMapSyncPropLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapSyncPropLayerVisible
  );
  const propertyMapSyncClaimLinkLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapSyncClaimLinkLayerVisible
  );
  const propertyMapClaimLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapClaimLayerVisible
  );
  const propertyMapAreaBoundaryLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAreaBoundaryLayerVisible
  );
  //layer visibility functions
  const setareaFpropLayerVisibility = (e) => {
    dispatch(setpropertyMapFpropLayerVisible(!propertyMapFpropLayerVisible));
  };
  const setpropertyMapAssetLayerVisibility = (e) => {
    dispatch(setpropertyMapAssetLayerVisible(!propertyMapAssetLayerVisible));
  };
  const setpropertyMapSyncPropLayerVisibility = (e) => {
    dispatch(setpropertyMapSyncPropLayerVisible(!propertyMapSyncPropLayerVisible));
  };
  const setpropertyMapSyncClaimLinkLayerVisibility = (e) => {
    dispatch(setpropertyMapSyncClaimLinkLayerVisible(!propertyMapSyncClaimLinkLayerVisible));
  };
  const setpropertyMapClaimLayerVisibility = (e) => {
    dispatch(setpropertyMapClaimLayerVisible(!propertyMapClaimLayerVisible));
  };
  const setpropertyMapAreaBoundaryLayerVisibility = (e) => {
    dispatch(setpropertyMapAreaBoundaryLayerVisible(!propertyMapAreaBoundaryLayerVisible));
  };



  useEffect(() => {
    if (propertyMapSyncPropLayerVisible && propertyMapSyncClaimLinkLayerVisible) {
      setproperty_claimLinkGroupVisible(true);
    } else {
      setproperty_claimLinkGroupVisible(false);
    }
  }, [propertyMapSyncPropLayerVisible, propertyMapSyncClaimLinkLayerVisible]);

    //handle Properties Group Eye
  const setPropertiesGroupEye = () => {
    if (propertyMapSyncPropLayerVisible || propertyMapSyncClaimLinkLayerVisible) {
      dispatch(setpropertyMapSyncPropLayerVisible(false));
      dispatch(setpropertyMapSyncClaimLinkLayerVisible(false));
    } else {
      dispatch(setpropertyMapSyncPropLayerVisible(true));
      dispatch(setpropertyMapSyncClaimLinkLayerVisible(true));
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2">
        <span className="font-bold">Map Layers</span>
      </div>
      <div className="overflow-y-auto max-h-[40vh]">
        <Accordion>
          <div className="flex flex-col gap-6">
            <AccordionItemWithEye title="Assets">
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Operating Mines"
                  onClick={setpropertyMapAssetLayerVisibility}
                  eyeState={propertyMapAssetLayerVisible}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Deposits"
                  onClick={() => console.log("Deposits")}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Zone"
                  onClick={() => console.log("Zone")}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv title="Historical Mines">
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv title="Occurrences">
                  <AiFillAppstore />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye
              title="Properties"
              onClick={setPropertiesGroupEye}
              eyeState={property_claimLinkGroupVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv title="Property Points"
                  onClick={setpropertyMapSyncPropLayerVisibility}
                  eyeState={propertyMapSyncPropLayerVisible}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                    onClick={setpropertyMapSyncClaimLinkLayerVisibility}
                  title="Property Outlines"
                  eyeState={propertyMapSyncClaimLinkLayerVisible}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye title="Claims"
              onClick={setpropertyMapClaimLayerVisibility}
              eyeState={propertyMapClaimLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv title="Claims"
                 onClick={setpropertyMapClaimLayerVisibility}
                  eyeState={propertyMapClaimLayerVisible}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Mining Areas"
                onClick={setpropertyMapAreaBoundaryLayerVisibility}
                  eyeState={propertyMapAreaBoundaryLayerVisible}
                >
                  <AiFillAppstore />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
          </div>
        </Accordion>
      </div>
      {/* <Accordion variant="splitted" className="w-full">
        <AccordionItem
        key="1"
          aria-label="Accordion 1"
          title="Accordion 1"
          className="w-full bg-blue-900"
          
          >
          <span className="font-bold w-full">Map Layers 1</span>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          <span className="font-bold">Map Layers 2</span>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          <span className="font-bold">Map Layers 3</span>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
};
export default PropertiesBottomSideComp;

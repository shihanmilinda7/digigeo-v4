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
import { setareaAssetLayerVisible, setareaFpropLayerVisible, setareaSyncClaimLinkLayerVisible, setareaSyncPropLayerVisible } from "@/store/area-map/area-map-slice";

const AreaBottomSideComp = () => {
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

   const areaFpropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaFpropLayerVisible
    );
   const areaAssetLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetLayerVisible
    );
   const areaSyncPropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncPropLayerVisible
    );
   const areaSyncClaimLinkLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncClaimLinkLayerVisible
    );
  const setareaFpropLayerVisibility = (e) => {
    console.log("setareaFpropLayerVisibility",e) 
      dispatch(setareaFpropLayerVisible(!areaFpropLayerVisible));
  }
  const setareaAssetLayerVisibility = (e) => {
    console.log("setareaAssetLayerVisibility",e) 
      dispatch(setareaAssetLayerVisible(!areaAssetLayerVisible));
  }
  const setareaSyncPropLayerVisibility = (e) => {
    console.log("setareaSyncPropLayerVisibility",e) 
      dispatch(setareaSyncPropLayerVisible(!areaSyncPropLayerVisible));
  }
  const setareaSyncClaimLinkLayerVisibility = (e) => {
    console.log("setareaSyncClaimLinkLayerVisibility",e) 
      dispatch(setareaSyncClaimLinkLayerVisible(!areaSyncClaimLinkLayerVisible));
  }

  useEffect(() => {

    if(areaSyncPropLayerVisible && areaSyncClaimLinkLayerVisible){
      setproperty_claimLinkGroupVisible(true)
    }else{
      setproperty_claimLinkGroupVisible(false)
    }
    
  
  
  }, [areaSyncPropLayerVisible,areaSyncClaimLinkLayerVisible])
  

  //handle Properties Eye
  const setPropertiesGroupEye = () => {

     if(areaSyncPropLayerVisible || areaSyncClaimLinkLayerVisible){

       dispatch(setareaSyncPropLayerVisible(false));
       dispatch(setareaSyncClaimLinkLayerVisible(false));
    } else {
       dispatch(setareaSyncPropLayerVisible(true));
       dispatch(setareaSyncClaimLinkLayerVisible(true));
    }
    
 
    
  }

  return (
    <div className="flex flex-col w-full">
      <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2">
        <span className="font-bold">Map Layers</span>
      </div>
      <div className="overflow-y-auto max-h-[40vh]">
        <Accordion>
          <div className="flex flex-col gap-6">
            <AccordionItemWithEye title="Assets" onClick={setareaAssetLayerVisibility}   eyeState={areaAssetLayerVisible} >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Operating Mines"
                  onClick={() => console.log("Operating Mines")}
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
            <AccordionItemWithEye title="Properties" onClick={setPropertiesGroupEye} eyeState={property_claimLinkGroupVisible}>
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv title="Property Points" onClick={setareaSyncPropLayerVisibility}   eyeState={areaSyncPropLayerVisible}>
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv onClick={setareaSyncClaimLinkLayerVisibility} title="Property Outlines" eyeState={areaSyncClaimLinkLayerVisible}>
                  <AiFillAppstore />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye title="Claims">
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv title="Claims">
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv title="Mining Areas">
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
          className="w-full bg-blue-600"
          
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
export default AreaBottomSideComp;

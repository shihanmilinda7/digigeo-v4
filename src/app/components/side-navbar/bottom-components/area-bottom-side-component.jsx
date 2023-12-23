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

const AreaBottomSideComp = () => {
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
            <AccordionItemWithEye title="Properties">
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv title="Property Points">
                  <AiFillAppstore />
                </LayerVisibleDiv>
                <LayerVisibleDiv title="Property Outlines">
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

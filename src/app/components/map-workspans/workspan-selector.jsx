"use client";

import React, { useState, useEffect } from "react";
import "ol/ol.css";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { AreaMapWorkspan } from "./area-map-workspan";
import { PropertiesMapWorkspan } from "./properties-map-workspan";

export const WorkspanSelector = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  // console.log("call 2");

  return (
    <div className="h-90">
      <div
        style={{
          display:
            selectedMap === "area" || selectedMap === "no_map"
              ? "block"
              : "none",
        }}
        className=""
      >
        <AreaMapWorkspan />
        {/* <h1>AREA</h1> */}
      </div>
      <div
        style={{ display: selectedMap === "company" ? "block" : "none" }}
        className="absolute right-0"
      >
        {/* <CompanyMapWorkspan /> */}company
      </div>
      <div
        style={{ display: selectedMap === "properties" ? "block" : "none" }}
        className="absolute right-0"
      >
        <PropertiesMapWorkspan />
      </div>
    </div>
  );
};

//map type/lyrs/nav/zoom/center/key

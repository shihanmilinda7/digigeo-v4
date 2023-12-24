"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  setAreaInitialCenter,
  setAreaLyrs,
  setAreaZoomLevel,
  setUrlUpdate,
  setIsSideNavOpen,
  setPropertiesZoomLevel,
  setPropertiesInitialCenter,
  setPropertiesLyrs,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import AreaSideNavbar from "../side-navbar-second/area-map/area-sidenavbar";
import { FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";
import GeoJSON from "ol/format/GeoJSON";

import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";
import { areaMapAssetVectorLayerStyleFunction } from "./asset-styles";
import PropertiesSideNavbar from "../side-navbar-second/properties-sidenavbar";

const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});

const areaMApPropertyVectorRendererFuncV2 = (pixelCoordinates, state) => {
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);
  //new code
  const svgtext2 = state.feature.get("hatch");
  const img = new Image();

  // img.onload = function () {
  //   feature.set("flag", img);
  // };

  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);

  //end new code
  //  const flag = state.feature.get("flag");
  const flag = img;
  // console.log("flag", flag);
  if (!flag || height < 1 || width < 1) {
    return;
  }

  context.save();
  const renderContext = toContext(context, {
    pixelRatio: 1,
  });

  renderContext.setFillStrokeStyle(fill, stroke);
  renderContext.drawGeometry(geometry);

  context.clip();

  // Fill transparent country with the flag image
  const bottomLeft = getBottomLeft(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  const hf = width / (height * 8);
  context.drawImage(flag, left, bottom, width * 20, height * hf * 20);

  context.restore();
};

export const PropertiesMap = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");

  const mapRef = useRef();
  const dispatch = useDispatch();

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

  useEffect(() => {
    mouseScrollEvent();
  }, []);

  useEffect(() => {
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isPropertiesSideNavOpen}&lyrs=${propertiesLyrs}&z=${zoom}&c=${center}`;

    window.history.replaceState({}, "", newUrl);
  }, [zoom, center]);

  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;

    // console.log("mapRef", mapRef.current?.getZoom());
    const handleMoveEnd = () => {
      // console.log("map", map);
      const tmpZoomLevel = map.getView().getZoom();
      const tmpinitialCenter = map.getView().getCenter();
      dispatch(setPropertiesZoomLevel(tmpZoomLevel));
      dispatch(setPropertiesInitialCenter(tmpinitialCenter));
      setZoom(tmpZoomLevel);
      setCenter(tmpinitialCenter);
      // router.push(
      //   `/?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`
      // );
      // console.log("tmpinitialCenter", tmpinitialCenter);
      // const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`;
      // window.history.replaceState({}, "", newUrl);
    };

    map?.on("moveend", handleMoveEnd);

    return () => {
      map?.un("moveend", handleMoveEnd);
    };
  }, []);

  const collapsibleBtnHandler = () => {
    const tmpValue = String(isSideNavOpen).toLowerCase() === "true";
    dispatch(setIsSideNavOpen(!tmpValue));
    let newUrl;
    newUrl = `${
      window.location.pathname
    }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isPropertiesSideNavOpen}&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    // dispatch(setUrlUpdate());
  };

  const setLyrs = (lyrs) => {
    dispatch(setPropertiesLyrs(lyrs));
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isPropertiesSideNavOpen}&lyrs=${lyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <div className="flex">
      <PropertiesSideNavbar />
      <div className="relative">
        <div className="w-12 absolute left-0 top-0 z-50 ml-2">
          <div className="flex flex-col gap-4 mt-2">
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <BsFillArrowLeftSquareFill
                // size={26}
                className={`cursor-pointer text-white h-6 w-6 ${
                  isSideNavOpen ? "" : "rotate-180"
                }`}
                onClick={() => collapsibleBtnHandler()}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <GiEarthAmerica className={`text-white cursor-pointer h-6 w-6`} />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <AiFillPlusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <AiFillMinusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
          </div>
        </div>
        <ButtonGroup
          variant="faded"
          className="absolute left-0 bottom-0 z-50 m-2"
          color="primary"
        >
          <Button
            onClick={() => setLyrs("m")}
            className={`${
              propertiesLyrs == "m"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } `}
          >
            Map
          </Button>
          <Button
            onClick={() => setLyrs("s")}
            className={`${
              propertiesLyrs == "s"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } `}
          >
            Satelite
          </Button>
          <Button
            onClick={() => setLyrs("p")}
            className={`${
              propertiesLyrs == "p"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } `}
          >
            Terrain
          </Button>
        </ButtonGroup>
        <Map
          ref={mapRef}
          style={{
            width: isSideNavOpen ? "80vw" : "100vw",
            height: "90vh",
          }}
          controls={[]}
        >
          <olView
            // ref={mapRef}
            initialCenter={[0, 0]}
            center={propertiesInitialCenter}
            initialZoom={2}
            zoom={propertiesZoomLevel}
          />
          <olLayerTile preload={Infinity}>
            {/* <olSourceOSM /> */}
            <olSourceXYZ
              args={{
                url: `https://mt0.google.com/vt/lyrs=${propertiesLyrs}&hl=en&x={x}&y={y}&z={z}`,
                // url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`,
              }}
            ></olSourceXYZ>
          </olLayerTile>
        </Map>
      </div>
    </div>
  );
};
{
  /* <olLayerTile>
  {/* <olSourceOSM /> */
}
//     <olSourceXYZ args={{ url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", }} > map=m terr=p satt=s
//   </olSourceXYZ>
// </olLayerTile> */}

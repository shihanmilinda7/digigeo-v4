"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  setPropertiesInitialCenter,
  setPropertiesZoomLevel,
  setIsSideNavOpen,
  setPropertiesLyrs,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";



import AreaSideNavbar from "../side-navbar-second/area-map/area-sidenavbar";
import { FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";
import GeoJSON from "ol/format/GeoJSON";
 
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Circle,
  Text,
} from "ol/style";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";
import { areaMapAssetVectorLayerStyleFunction } from "./asset-styles";
import PropertiesSideNavbar from "../side-navbar-second/property-map/properties-sidenavbar";
import { flyTo } from "./fly"



const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});

const propertyMApFPropertyVectorRendererFuncV2 = (pixelCoordinates, state) => {
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


const propertyMap_tbl_sync_claimlink_VectorLayerStyleFunction = (
  feature,
  resolution
) => {
  //console.log("feature:", feature);
  //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim1.textContent = "visibility";
  // const r = Math.random() * 255;
  // const g = Math.random() * 255;
  // const b = Math.random() * 255;
  //console.log("fill", feature.values_.hatch);
  const colour = "#0000FF"; //feature.values_.colour;
  //console.log("colour", colour);
  // const fill = new Fill({
  //   color: `rgba(${r},${g},${b},1)`,
  //   opacity:1,
  // });
  // const fill = new Fill({
  //   // color: `rgba(${r},${g},${b},1)`,

  //   color:colour,
  //   opacity: 1,
  // });
  const fill = new Fill({
    // color: `rgba(${r},${g},${b},1)`,

    color: colour,
    opacity: 0.3,
  });

  const stroke = new Stroke({
    color: "darkblue",
    width: 1.25,
  });
  //console.log("res22", resolution);

  // let svgScale = 0;
  // let radius = 0;
  //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim.textContent = "visibility_off";
  // if (resolution > 1000) {
  //   svgScale = 0.5;
  //   radius = 2;
  // } else if (resolution > 937.5) {
  //   svgScale = 0.562;
  //   radius = 5;
  // } else if (resolution > 875) {
  //   svgScale = 0.625;
  //   radius = 5;
  // } else if (resolution > 750) {
  //   svgScale = 0.75;
  //   radius = 5;
  // } else if (resolution > 625) {
  //   svgScale = 0.875;
  //   radius = 5;
  // } else if (resolution > 500) {
  //   svgScale = 1;
  //   radius = 5;
  // } else if (resolution > 375) {
  //   svgScale = 1.125;
  //   radius = 5;
  // } else if (resolution > 250) {
  //   svgScale = 1.25;
  //   radius = 5;
  // } else if (resolution > 125) {
  //   svgScale = 1.375;
  //   radius = 5;
  //   // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //   // spanClaim.textContent = "visibility";
  // } else {
  //   svgScale = 1.5;
  //   radius = 10;
  // }
  let image;
  let text;

  // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[0].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[2].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[3].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[5].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[6].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[7].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
  //     scale: svgScale,
  //   });
  // } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
  //     scale: svgScale,
  //   });
  // }
  // else {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: "pink" }),
  //     stroke: new Stroke({ color: "pink", width: 3 }),
  //   });
  // }

  //set text Style

  // text = createTextStyle(feature, resolution);
  image = new Circle({
    radius: 2,
    fill: new Fill({ color: colour }),
    stroke: new Stroke({ color: colour, width: 1 }),
  });
  const st = new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    image,
    // text,
    fill,
  });
  // console.log("st", st);
  return st;
};




export const PropertiesMap = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");
  const [claimObject, setclaimObject] = useState(undefined);
  
  

  const [clickDataLoaded, setclickDataLoaded] = useState(false);

  const mapRef = useRef();
  const mapViewRef = useRef();
 
  const dispatch = useDispatch();

    const propertyFlyToLocation = useSelector(
    (state) => state.propertiesMapReducer.propertyMapFlyToLocation
  );

 const [coordinates, setCoordinates] = useState(undefined);
 const [popup, setPopup] = useState();
 const onSingleclick = useCallback((evt) => {
 const { coordinate } = evt;
    setCoordinates(coordinate);
  }, []);


  useEffect(() => {
    if (propertyFlyToLocation?.length > 0)
      flyTo(mapViewRef?.current, propertyFlyToLocation, () => {});
  }, [propertyFlyToLocation]);

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );




    const propertiesLyrs = useSelector(
    (state) => state.mapSelectorReducer.propertiesLyrs
  );
  const isPropertiesSideNavOpen = useSelector(
    (state) => state.propertiesMapReducer.isPropertiesSideNavOpen
  );
  const propertiesZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.propertiesZoomLevel
  );
  const propertiesInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.propertiesInitialCenter
  );

   const syncPropSourceRef = useRef(null);
  const syncPropVectorLayerRef = useRef(null);
  const fPropSourceRef = useRef(null);
  const fPropVectorLayerRef = useRef(null);
  const assetSourceRef = useRef(null);
  const assetLayerRef = useRef(null);
  const claimLinkSourceRef = useRef(null);
  const claimLinkVectorLayerRef = useRef(null);
  const claimVectorImgSourceRef = useRef(null);
  const claimVectorImgLayerRef = useRef(null);
  const areaBoundaryImgSourceRef = useRef(null);
  const areaBoundaryImgLayerRef = useRef(null);

  const syncPropertyFeatures = useSelector(
    (state) => state.propertiesMapReducer.syncPropertyFeatures
  );
  const featuredPropertyFeatures = useSelector(
    (state) => state.propertiesMapReducer.featuredPropertyFeatures
  );
  const syncClaimLinkPropertyFeatures = useSelector(
    (state) => state.propertiesMapReducer.syncClaimLinkPropertyFeatures
  );
  const assetFeatures = useSelector(
    (state) => state.propertiesMapReducer.assetFeatures
  );

    useEffect(() => {
     console.log("ue2",)
    //set style
    const style = new Style({});
    style.setRenderer(propertyMApFPropertyVectorRendererFuncV2);

    fPropVectorLayerRef.current?.setStyle(style);
    }, [fPropVectorLayerRef.current]);
  

    useEffect(() => {
      
      if (featuredPropertyFeatures) {
      
      fPropSourceRef?.current?.clear();
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);
 console.log("featuredPropertyFeatures",e.length)
      fPropSourceRef?.current?.addFeatures(e);
    }

    //  if (fPropSourceRef.current) {
    //    const p1= fPropSourceRef.current?.getExtent()[0]
    //    if (p1 != Infinity) {
    //      mapRef.current?.getView()?.fit(fPropSourceRef.current?.getExtent(), {
    //        padding: [200, 200, 200, 200],
    //        duration: 3000,
    //      });
    //    }

    //  }
  }, [featuredPropertyFeatures]);


  useEffect(() => {
   
    if (syncPropertyFeatures) {
      syncPropSourceRef?.current?.clear();
      const e = new GeoJSON().readFeatures(syncPropertyFeatures);
 console.log("oioi",e.length)
      syncPropSourceRef?.current?.addFeatures(e);
    }

    if (syncPropSourceRef.current) {
      const p1 = syncPropSourceRef.current?.getExtent()[0];
      if (p1 != Infinity) {
        mapRef.current?.getView()?.fit(syncPropSourceRef.current?.getExtent(), {
          padding: [200, 200, 200, 200],
          duration: 3000,
        });
      }
    }
  }, [syncPropertyFeatures]);


  useEffect(() => {
    mouseScrollEvent();
  }, []);

    useEffect(() => {
    fPropVectorLayerRef?.current
      ?.getSource()
      .on("addfeature", function (event) {
        const feature = event.feature;
        const svgtext2 = feature.get("hatch");
        const img = new Image();

        img.onload = function () {
          feature.set("flag", img);
        };

        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);
      });
  }, [fPropVectorLayerRef?.current]);
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

   const image = new Icon({
    src: "./sync-prop.svg",
    scale: 1,
  });
    const styleFunctionSyncProperties = (feature) => {
    // console.log("s");
    const s = new Style({
      image,
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(255,23,0,0.2)",
      }),
    });

    return s;
  };

 


 
  
  return (
    <div className="flex">
      <PropertiesSideNavbar />
      <div className="relative">
        <div className="w-12 absolute left-0 top-0 z-50 ml-2">
          <div className="flex flex-col gap-4 mt-2">
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <BsFillArrowLeftSquareFill
                // size={26}
                className={`cursor-pointer text-white h-6 w-6 ${
                  isSideNavOpen ? "" : "rotate-180"
                }`}
                onClick={() => collapsibleBtnHandler()}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <GiEarthAmerica className={`text-white cursor-pointer h-6 w-6`} />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillPlusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
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
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Map
          </Button>
          <Button
            onClick={() => setLyrs("s")}
            className={`${
              propertiesLyrs == "s"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Satelite
          </Button>
          <Button
            onClick={() => setLyrs("p")}
            className={`${
              propertiesLyrs == "p"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
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
           <olLayerVector ref={fPropVectorLayerRef}>
            <olSourceVector ref={fPropSourceRef}></olSourceVector>
          </olLayerVector>
           <olLayerVector
            ref={syncPropVectorLayerRef}
            style={styleFunctionSyncProperties}
          >
            <olSourceVector ref={syncPropSourceRef}></olSourceVector>
          </olLayerVector>
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

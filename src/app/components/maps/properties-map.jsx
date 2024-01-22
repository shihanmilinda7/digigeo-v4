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
import { all, bbox,  bbox as bboxStrategy } from "ol/loadingstrategy";



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
    console.log("aaaa")
    if (propertyFlyToLocation?.length > 0) {
      flyTo(mapViewRef?.current, propertyFlyToLocation, () => { });
    }
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
       console.log("featuredPropertyFeatures1",featuredPropertyFeatures)
       fPropSourceRef?.current?.clear();
      if (featuredPropertyFeatures?.features) {
       console.log("featuredPropertyFeatures",featuredPropertyFeatures)
      // fPropSourceRef?.current?.clear();
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
 console.log("eee1",syncClaimLinkPropertyFeatures )
    claimLinkSourceRef?.current?.clear();
    if (syncClaimLinkPropertyFeatures?.features) {
      
      const e = new GeoJSON().readFeatures(syncClaimLinkPropertyFeatures);
      console.log("eee",e )
      claimLinkSourceRef?.current?.addFeatures(e);
    }
    // if (claimLinkSourceRef.current) {
    //   const p1 = claimLinkSourceRef.current?.getExtent()[0]
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(claimLinkSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [syncClaimLinkPropertyFeatures]);
  useEffect(() => {
    console.log("PPP")
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
    console.log("assetFeatures", assetFeatures,)
    if (assetFeatures?.features) {
      assetSourceRef?.current?.clear()
      const e = new GeoJSON().readFeatures(assetFeatures)
        console.log("assetFeatures added" )
      assetSourceRef?.current?.addFeatures(e);
    }
        
     
    // if (assetSourceRef.current) {
    //   const p1 = assetSourceRef.current?.getExtent()[0]
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(assetSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }
       
    // }
  }, [assetFeatures]);


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
    claimLinkVectorLayerRef.current?.setOpacity(0.2)
    claimLinkVectorLayerRef.current?.setStyle(propertyMap_tbl_sync_claimlink_VectorLayerStyleFunction);
  }, [claimLinkVectorLayerRef.current]);



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

  const styleFunctionSyncProperties = (feature, resolution) => {
      //console.log("resolution",resolution)
      let t=""
      if( resolution< 1850)
       t = (feature.get("prop_name") +  (feature.get("prop_alias") ? "/" + feature.get("prop_alias") : "")) ?? ""
      const s = new Style({
      text:new Text({
        text: t.toString(),
        // text: feature.get("propertyid") ??"", prop_name, prop_alias
        offsetX: 0,
        offsetY: -10,
        font :  "14px serif",
      }),
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

     const styleFunctionSyncClaimLinkProperties = (feature) => {
     console.log("sqw");
    const s = new Style({
     
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
 
const propertyMap_tbl_sync_claimlink_VectorLayerStyleFunction = (
  feature,
  resolution
) => {
  // console.log("featurexd:", feature);
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
    
  });

  // const stroke = new Stroke({
  //   color: "darkblue",
  //   width: 1.25,
  // });
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
// const getText = function (feature, resolution) {
//   // const type = dom.text.value;
//   const maxResolution = 1000;
//   let text = feature.get("propertyid");
  //console.log(text);
  // if (text == undefined) {
  //   //console.log("asset_name is und");
  //   text = feature.get("howner_ref");
  //   //console.log("owner ref hot p", text);
  // }
  // if (resolution > maxResolution) {
  //   text = "";
  // }
  // else if (type == "hide") {

  //   text = "";
  // } else if (type == "shorten") {
  //   text = text.trunc(12);
  // } else if (
  //   type == "wrap" &&
  //   (!dom.placement || dom.placement.value != "line")
  // ) {
  //   text = stringDivider(text, 16, "\n");
  // }

//   return text;
// };
 

  // const createTextStyle = function (feature, resolution) {
  //   console.log("qqq",feature.get("propertyid"))
  // const font = 500 + " " + 25 + "/" + 25 + " " + "Sans Serif";
 

  // return new Text({
     
  //   font: font,
  //   text: (feature.get("propertyid") ?? "").toString(),
  //   offsetX: 0,
  //   offsetY: -20,
   
  // });
  // };
  //   text = createTextStyle(feature, resolution);
  // image = new Circle({
  //   radius: 2,
  //   fill: new Fill({ color: colour }),
  //   stroke: new Stroke({ color: colour, width: 1 }),
  // });
  const st = new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    
      
    fill,
  });
  // console.log("st", st);
  return st;
};

 
  
  
  
  //layer visibilty redux states
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

  //layer visibility useEffects
  useEffect(() => {
   
    fPropVectorLayerRef?.current?.setVisible(propertyMapFpropLayerVisible);
  }, [propertyMapFpropLayerVisible]);
  useEffect(() => {
    claimLinkVectorLayerRef?.current?.setVisible(propertyMapSyncClaimLinkLayerVisible);
  }, [propertyMapSyncClaimLinkLayerVisible]);
  useEffect(() => {
     console.log("asdf",)
    syncPropVectorLayerRef?.current?.setVisible(propertyMapSyncPropLayerVisible);
  }, [propertyMapSyncPropLayerVisible]);
  useEffect(() => {
    assetLayerRef?.current?.setVisible(propertyMapAssetLayerVisible);
  }, [propertyMapAssetLayerVisible]);
  useEffect(() => {
    claimVectorImgLayerRef?.current?.setVisible(propertyMapClaimLayerVisible);
  }, [propertyMapClaimLayerVisible]);
  useEffect(() => {
    areaBoundaryImgLayerRef?.current?.setVisible(propertyMapAreaBoundaryLayerVisible);
  }, [propertyMapAreaBoundaryLayerVisible]);

    //asset type visibilty redux states
    const propertyMapAssetOpMineVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetOpMineVisible
    );
    const propertyMapAssetDepositsVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetDepositsVisible
    );
    const propertyMapAssetZoneVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetZoneVisible
    );
    const propertyMapAssetHistoricalVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetHistoricalVisible
    );
    const propertyMapAssetOccurrenceVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetOccurrenceVisible
    );
      //asset type visibility useEffects
  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (propertyMapAssetOpMineVisible) {
        fs.forEach(f => {
          if (f.get("asset_type") == "Operating Mine") {
           f.setStyle(null)
          }
        })
      } else {
        fs.forEach(f => {
          if (f.get("asset_type") == "Operating Mine") {
           
              f.setStyle(new Style({}))
          }
        })
      }
    }
  }, [propertyMapAssetOpMineVisible]);

    useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (propertyMapAssetDepositsVisible) {
        fs.forEach(f => {
          if (f.get("asset_type") == "Deposit") {
           f.setStyle(null)
          }
        })
      } else {
        fs.forEach(f => {
          if (f.get("asset_type") == "Deposit") {
            
             f.setStyle(new Style({}))
          }
        })
      }
    }
  }, [propertyMapAssetDepositsVisible]);

      useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (propertyMapAssetZoneVisible) {
        fs.forEach(f => {
          if (f.get("asset_type") == "Zone") {
             f.setStyle(null)
          }
        })
      } else {
        fs.forEach(f => {
          if (f.get("asset_type") == "Zone") {
           f.setStyle(new Style({}))
            
          }
        })
      }
    }
  }, [propertyMapAssetZoneVisible]);

        useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (propertyMapAssetHistoricalVisible) {
        fs.forEach(f => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(null)
          }
        })
      } else {
        fs.forEach(f => {
          if (f.get("asset_type") == "Historical Mine") {
           
             f.setStyle(new Style({}))
          }
        })
      }
    }
  }, [propertyMapAssetHistoricalVisible]);

    useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (propertyMapAssetOccurrenceVisible) {
        fs.forEach(f => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(null)
          }
        })
      } else {
        fs.forEach(f => {
          if (f.get("asset_type") == "Occurrence") {
           
             f.setStyle(new Style({}))
          }
        })
      }
    }
  }, [propertyMapAssetOccurrenceVisible]);


  const styleFunctionAreaBoundary = (feature) => {
    console.log("sf");
    const s = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 1,
      }),
    });

    return s;
  };
  const areaLoaderFunc = useCallback((extent, resolution, projection) => {
    const url = `https://atlas.ceyinfo.cloud/matlas/view_tbl40mapareas`;
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data[0].json_build_object.features) {
          const features = new GeoJSON().readFeatures(
            json.data[0].json_build_object
          );

          areaBoundaryImgSourceRef.current.addFeatures(features);

          // console.log("mapCommodityTbl40Source", features );
        } else {
          console.log("else area map area boundry not loading ");
        }
      });
  }, []);


    const claimLoaderFunc = useCallback((extent, resolution, projection) => {
    console.log("hit claims", extent);
    const url =
      `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
      `/${extent.join("/")}`;
    // console.log("url", url);
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("hit claims2.0", json);
        if (json.data) {
          console.log("hit claims2.1");
          if (json.data[0].json_build_object.features) {
            const features = new GeoJSON().readFeatures(
              json.data[0].json_build_object
            );
            //console.log("hit claims3")
            claimVectorImgSourceRef.current.addFeatures(features);

            //console.log("bbsync uni tbl01_claims   features count", features.count);
          }
        }
      });
    }, []);
  
      const styleFunctionClaim = (feature, resolution) => {
    // console.log("sf claims")
    const colour = "#D3D3D3"; //feature.values_.colour;
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
    let fill = new Fill({
      // color: `rgba(${r},${g},${b},1)`,

      color: colour,
      opacity: 1,
    });

    // const stroke = new Stroke({
    //   color: "#8B4513",
    //   width: 1.25,
    // });

    // let image;
    // let text;

    // image = new Circle({
    //   radius: 9,
    //   fill: new Fill({ color: colour }),
    //   // stroke: new Stroke({ color: "#8B4513", width: 3 }),
    // });

    let textObj;

    const claimno = feature.get("claimno");
    textObj = new Text({
      //       // textAlign: align == "" ? undefined : align,
      //       // textBaseline: baseline,
      font: "10px serif",
      text: claimno,
      // fill: new Fill({ color: fillColor }),
      // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
      offsetX: 2,
      offsetY: -13,
      // placement: placement,
      // maxAngle: maxAngle,
      // overflow: overflow,
      // rotation: rotation,
    });

    const style = new Style({
      stroke: new Stroke({
        color: "#707070",
        width: 1,
      }),

      text: textObj,
      fill,
    });

    return style;
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
             ref={mapViewRef}
            initialCenter={[0, 0]}
            center={propertiesInitialCenter}
            initialZoom={2}
            zoom={propertiesZoomLevel}
          />
          <olLayerTile preload={Infinity}>
           
            <olSourceXYZ
              args={{
                url: `https://mt0.google.com/vt/lyrs=${propertiesLyrs}&hl=en&x={x}&y={y}&z={z}`,
                // url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`,
              }}
            ></olSourceXYZ>
          </olLayerTile>
          <olLayerVectorImage
            ref={areaBoundaryImgLayerRef}
            style={styleFunctionAreaBoundary}
          >
            <olSourceVector
              ref={areaBoundaryImgSourceRef}
              // format={new GeoJSON()}
              strategy={all}
              loader={areaLoaderFunc}
            ></olSourceVector>
          </olLayerVectorImage>
           <olLayerVector ref={claimLinkVectorLayerRef}>
            {syncClaimLinkPropertyFeatures && (
              <olSourceVector
                ref={claimLinkSourceRef}
              ></olSourceVector>
            )}
          </olLayerVector>
           <olLayerVectorImage
            ref={claimVectorImgLayerRef}
            style={styleFunctionClaim}
            minResolution={0}
            maxResolution={150}
          >
            <olSourceVector
              ref={claimVectorImgSourceRef}
              // format={new GeoJSON()}
              strategy={bbox}
              loader={claimLoaderFunc}
            ></olSourceVector>
          </olLayerVectorImage>
          
           <olLayerVector ref={fPropVectorLayerRef}>
            <olSourceVector ref={fPropSourceRef}></olSourceVector>
          </olLayerVector>
          <olLayerVector
            ref={assetLayerRef}
            style={areaMapAssetVectorLayerStyleFunction}
             minResolution={0}
            maxResolution={150}
          >
            
              <olSourceVector
                ref={assetSourceRef}
                 
              >
               
              </olSourceVector>
            
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

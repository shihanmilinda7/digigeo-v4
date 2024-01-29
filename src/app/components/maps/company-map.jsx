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
  setCompanyZoomLevel,
  setCompanyInitialCenter,
  setCompanyLyrs,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import AreaSideNavbar from "../side-navbar-second/area-map/area-sidenavbar";
import { FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";
import GeoJSON from "ol/format/GeoJSON";

import { Circle as CircleStyle, Fill, Stroke, Style, Icon,Text } from "ol/style";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";
import { areaMapAssetVectorLayerStyleFunction } from "./asset-styles";
import PropertiesSideNavbar from "../side-navbar-second/property-map/properties-sidenavbar";
import CompanySideNavbar from "../side-navbar-second/company-map/company-sidenavbar";
import { flyTo } from "./fly"
import { setclickassetObject, setclickclaimObject, setclickfPropertyObject, setclicksyncPropertyObject } from "@/store/company-map/company-map-slice";
import CompanyMapClickPopup from "./company-map-popup/company-map-click-popup";
import { all, bbox,  bbox as bboxStrategy } from "ol/loadingstrategy";


const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});

    const companyMApPropertyVectorRendererFuncV2 = (
  pixelCoordinates,
  state
) => {
  //  console.log("sssss", state);
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
     const height = getHeight(extent);
     //new code
 const svgtext2 = state.feature.get("hatch");
  //  const img = new Image();

    // img.onload = function () {
    //   feature.set("flag", img);
    // };
    
   // img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);

     //end new code
      const flag = state.feature.get("flag");
    // const flag = img
    //   console.log("flag",flag)
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
  context.drawImage(flag,  left, bottom, width *20, height*hf*20);
 
  context.restore();
};

 const companyMap_tbl_sync_claimlink_VectorLayerStyleFunction = (
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














export const CompanyMap = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");
  const [claimObject, setclaimObject] = useState(undefined);

  const [clickDataLoaded, setclickDataLoaded] = useState(false);
  const [clickedOnFeature, setclickedOnFeature] = useState(false);






  const mapRef = useRef();
  const mapViewRef = useRef();

  const dispatch = useDispatch();

    const companyFlyToLocation = useSelector(
    (state) => state.companyMapReducer.companyFlyToLocation
  );


 const [coordinates, setCoordinates] = useState(undefined);
  const [popup, setPopup] = useState();
  const onSingleclick = useCallback((evt) => {
    const { coordinate } = evt;
    setCoordinates(coordinate);
  }, []);


    useEffect(() => {
    if(companyFlyToLocation?.length>0)
    flyTo(mapViewRef?.current,companyFlyToLocation,()=>{})
    
  }, [companyFlyToLocation])

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
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

    const isCompanySideNavOpen = useSelector(
    (state) => state.companyMapReducer.isCompanySideNavOpen
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
    (state) => state.companyMapReducer.syncPropertyFeatures
  );
  const featuredPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.featuredPropertyFeatures
  );
  const syncClaimLinkPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.syncClaimLinkPropertyFeatures
  );
  const assetFeatures = useSelector(
    (state) => state.companyMapReducer.assetFeatures
  );


  const companyName = useSelector((state) => state.companyMapReducer.companyName);
  const companyId = useSelector((state) => state.companyMapReducer.companyId);
  const companyStockcode = useSelector((state) => state.companyMapReducer.companyStockcode);





  useEffect(() => {
    // console.log("ue2")
    //set style
    const style = new Style({});
    style.setRenderer(companyMApPropertyVectorRendererFuncV2);

    fPropVectorLayerRef.current?.setStyle(style);
  }, [fPropVectorLayerRef.current])
  
  useEffect(() => {
    claimVectorImgLayerRef.current?.setOpacity(0.6);
  }, [claimVectorImgLayerRef.current])


    useEffect(() => {
       syncPropSourceRef?.current?.clear()
    if (syncPropertyFeatures?.features?.length>0) {
     
      const e = new GeoJSON().readFeatures(syncPropertyFeatures)
       
      syncPropSourceRef?.current?.addFeatures(e);
    }
        
     
    if (syncPropSourceRef.current) {
      const p1 = syncPropSourceRef.current?.getExtent()[0]
      if (p1 != Infinity) {
        mapRef.current?.getView()?.fit(syncPropSourceRef.current?.getExtent(), {
          padding: [200, 200, 200, 200],
          duration: 3000,
        });
      }
       
    }
    }, [syncPropertyFeatures]);
  
    useEffect(() => {
       fPropSourceRef?.current?.clear()
    if (featuredPropertyFeatures?.features) {
      
     
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures)
       
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
      claimLinkSourceRef?.current?.clear()
    if (syncClaimLinkPropertyFeatures?.features) {
      
      const e = new GeoJSON().readFeatures(syncClaimLinkPropertyFeatures)
       
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
    assetSourceRef?.current?.clear()
    if (assetFeatures?.features) {
      
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
     
    fPropVectorLayerRef?.current?.getSource().on("addfeature", function (event) {
   
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
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isCompanySideNavOpen}&lyrs=${companyLyrs}&z=${zoom}&c=${center}`;

    window.history.replaceState({}, "", newUrl);
  }, [zoom, center]);




  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;

    // console.log("mapRef", mapRef.current?.getZoom());
    const handleMoveEnd = () => {
      // console.log("map", map);
      const tmpZoomLevel = map.getView().getZoom();
      const tmpinitialCenter = map.getView().getCenter();
      dispatch(setCompanyZoomLevel(tmpZoomLevel));
      dispatch(setCompanyInitialCenter(tmpinitialCenter));
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
    }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isCompanySideNavOpen}&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    // dispatch(setUrlUpdate());
  };






    const setLyrs = (lyrs) => {
    dispatch(setCompanyLyrs(lyrs));
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isCompanySideNavOpen}&lyrs=${lyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
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




  
  //layer visibilty redux states
    const companyFpropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyFpropLayerVisible
    );
    const companyAssetLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetLayerVisible
    );
    const companySyncPropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companySyncPropLayerVisible
    );
    const companySyncClaimLinkLayerVisible = useSelector(
    (state) => state.companyMapReducer.companySyncClaimLinkLayerVisible
  );
    const companyClaimLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyClaimLayerVisible
  );
    const companyAreaBoundaryLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyAreaBoundaryLayerVisible
  );

    //asset type visibilty redux states
    const companyAssetOpMineVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetOpMineVisible
    );
    const companyAssetDepositsVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetDepositsVisible
    );
    const companyAssetZoneVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetZoneVisible
    );
    const companyAssetHistoricalVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetHistoricalVisible
    );
    const companyAssetOccurrenceVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetOccurrenceVisible
    );
  
  //layer visibility useEffects
  useEffect(() => {
    fPropVectorLayerRef?.current?.setVisible(companyFpropLayerVisible)
  }, [companyFpropLayerVisible]);
  useEffect(() => {
    claimLinkVectorLayerRef?.current?.setVisible(companySyncClaimLinkLayerVisible)
  }, [companySyncClaimLinkLayerVisible]);
  useEffect(() => {
    syncPropVectorLayerRef?.current?.setVisible(companySyncPropLayerVisible)
  }, [companySyncPropLayerVisible]);
  useEffect(() => {
    assetLayerRef?.current?.setVisible(companyAssetLayerVisible)
  }, [companyAssetLayerVisible]);
  useEffect(() => {
    claimVectorImgLayerRef?.current?.setVisible(companyClaimLayerVisible)
  }, [companyClaimLayerVisible]);
  useEffect(() => {
    areaBoundaryImgLayerRef?.current?.setVisible(companyAreaBoundaryLayerVisible)
  }, [companyAreaBoundaryLayerVisible]);

    //asset type visibility useEffects
  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetOpMineVisible) {
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
  }, [companyAssetOpMineVisible]);

    useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetDepositsVisible) {
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
  }, [companyAssetDepositsVisible]);

      useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetZoneVisible) {
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
  }, [companyAssetZoneVisible]);

        useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetHistoricalVisible) {
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
  }, [companyAssetHistoricalVisible]);

    useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetOccurrenceVisible) {
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
  }, [companyAssetOccurrenceVisible]);

  //claim loader
  // const claimLoaderFunc1 = (extent, resolution, projection)=> {
  //  // console.log("hit claims",extent)
  //   const url =
  //     `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
  //     `/${extent.join("/")}`;
  //  // console.log("url", url);
  //   fetch(url, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //         console.log("hit claims2.0",json)
  //       if (json.data) {
  //            //console.log("hit claims2.1")
  //         if (json.data[0].json_build_object.features) {
  //           const features = new GeoJSON().readFeatures(
  //             json.data[0].json_build_object
  //           );
  //             //console.log("hit claims3")
  //           claimVectorImgSourceRef.current.addFeatures(features);

  //           //console.log("bbsync uni tbl01_claims   features count", features.count);
  //         }
  //       }
  //     });
  // }

    const styleFunctionAreaBoundary =   (feature) => {
     console.log("sf");
    const s = new Style({
       
      stroke: new Stroke({
        color: "blue",
        width: 1,
      }),
      
    });

    return s;
  }

  const areaLoaderFunc =  useCallback((extent, resolution, projection) =>{
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
  },[])

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
    // opacity: 1,
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
}

  
    const claimLoaderFunc = useCallback((extent, resolution, projection) =>  {
    console.log("hit claims",extent)
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
          console.log("hit claims2.0",json)
        if (json.data) {
             console.log("hit claims2.1")
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
  
  useEffect( () => {
 let clickedOnFeatureTmp = false;
    const fetchData = async()=>{
       setclickedOnFeature(false)
     let assetObject, fPropertyObject,syncPropertyObject,claimObject
    // console.log("coordinates",coordinates,)
    
  let extentDim;
  const viewResolution = mapViewRef?.current?.getResolution()
  if (viewResolution < 15) {
    extentDim = 100;
  } else if (viewResolution < 50) {
    extentDim = 500;
  } else if (viewResolution < 150) {
    extentDim = 1000;
  } else if (viewResolution < 250) {
    extentDim = 1500;
  } else if (viewResolution < 400) {
    extentDim = 2500;
  } else {
    extentDim = 3000;
    }
    
    const ext = [
    coordinates[0] - extentDim,
    coordinates[1] - extentDim,
    coordinates[0] + extentDim,
    coordinates[1] + extentDim,
    ];
  //first look for asset features
    const selAssetFeatures = assetSourceRef?.current?.getFeaturesInExtent(ext) ?? [];
  
    if (selAssetFeatures.length > 0) {
       clickedOnFeatureTmp = true
      let asset_name = selAssetFeatures?.[0]?.get("asset_name") ?? "";
      let assetalias = selAssetFeatures?.[0]?.get("assetalias") ?? "";
      let asset_type = selAssetFeatures?.[0]?.get("asset_type") ?? "";
      let commodities = selAssetFeatures?.[0]?.get("commodities") ?? "";
      let area = selAssetFeatures?.[0]?.get("area") ?? "";
      let stateProv = selAssetFeatures?.[0]?.get("state_prov") ?? "";
      let country = selAssetFeatures?.[0]?.get("country") ?? "";
      let region = selAssetFeatures?.[0]?.get("region") ?? "";
      assetObject = {
        asset_name,
        assetalias,
        asset_type,
        commodities,
        area,
        stateProv,
        country,
        region,
      }

       dispatch(setclickassetObject(assetObject))
    } else {
       dispatch(setclickassetObject(undefined))
    }
  const selFPropertyFeatures =
    fPropSourceRef?.current?.getFeaturesAtCoordinate(coordinates) ?? [];
    if(selFPropertyFeatures.length>0){
      clickedOnFeatureTmp = true
        console.log("selFPropertyFeatures",selFPropertyFeatures)
  let prop_name = selFPropertyFeatures?.[0]?.get("prop_name") ?? "";
  let commo_ref = selFPropertyFeatures?.[0]?.get("commo_ref") ?? "";
  let assets = selFPropertyFeatures?.[0]?.get("assets") ?? "";
  let resources = selFPropertyFeatures?.[0]?.get("resources") ?? "";
  let map_area = selFPropertyFeatures?.[0]?.get("map_area") ?? "";
  let owners = selFPropertyFeatures?.[0]?.get("owners") ?? "";
  let prop_exturl = selFPropertyFeatures?.[0]?.get("prop_exturl") ?? "";
  let sale_name = selFPropertyFeatures?.[0]?.get("sale_name") ?? "";
  let propertyid = selFPropertyFeatures?.[0]?.get("propertyid") ?? "";
  let hotplayid = selFPropertyFeatures?.[0]?.get("id") ?? 0;

  // const sponsoredowners = await getSponsorListFromRESTAPI(
  //   features[0].get("id")
      // );

      const getData = async (hotplayid) => {
        const url = "https://atlas.ceyinfo.cloud/matlas/getownersbyhotplayid/" + hotplayid;
        //load data from api - changed to return array

        let sponsors = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            // let sponsors = "";
            // res.data.forEach((element) => {
            //   sponsors += element.sponsor + "/";
            // });
            return res.data;
          });

        // sponsors = sponsors.slice(0, -1);
        // console.log("sponsors", sponsors);
        return sponsors;
      }
      

  const sponsoredowners = (await getData(hotplayid).data?.[0]?.sponsor) ?? ""
   fPropertyObject =  {
    sponsoredowners,
    prop_name,
    commo_ref,
    assets,
    resources,
    map_area,
    owners,
    prop_exturl,
    sale_name,
    propertyid,
      }
      
  dispatch(setclickfPropertyObject(fPropertyObject))

    }else{
      dispatch(setclickfPropertyObject(undefined))
    }
  // const selBoundaryFeatures =
  //   boundarySource?.getFeaturesAtCoordinate(evt.coordinate) ?? [];

  const selSyncPropFeatures =
      syncPropSourceRef?.current?.getFeaturesInExtent(ext) ?? [];

      console.log("selSyncPropFeatures?.[0]",selSyncPropFeatures?.[0])
    if(selSyncPropFeatures.length>0){ 
      clickedOnFeatureTmp = true
     const prop_name = selSyncPropFeatures?.[0]?.get("prop_name") ?? "";
    const owners = selSyncPropFeatures?.[0]?.get("owners") ?? "";
    let name1 = selSyncPropFeatures?.[0]?.get("name") ?? "";
    const stateProv = selSyncPropFeatures?.[0]?.get("state_prov") ?? "";
    const country = selSyncPropFeatures?.[0]?.get("country") ?? "";
    const area = selSyncPropFeatures?.[0]?.get("area") ?? "";
  // const selSynClaimLinkFeatures =
  //   sync_claimLinkLayerSource?.getFeaturesAtCoordinate(evt.coordinate) ?? [];
    syncPropertyObject ={prop_name,owners,name:name1,stateProv,country,area}
    
    dispatch(setclicksyncPropertyObject(syncPropertyObject))
    }else{
    dispatch(setclicksyncPropertyObject(undefined))
    }
  const claimFeatures =
      claimVectorImgSourceRef?.current?.getFeaturesAtCoordinate(coordinates) ?? [];
     if(claimFeatures.length>0){ 
      clickedOnFeatureTmp = true
     let ownerref = claimFeatures?.[0]?.get("ownerref") ?? "";
    const claimno = claimFeatures?.[0]?.get("claimno") ?? "";
    claimObject = {ownerref,claimno}
   
    dispatch(setclickclaimObject(claimObject))
     }else{
       dispatch(setclickclaimObject(undefined))
     }
    
     console.log("111")
  //  return (<AreaMapClickPopup claimObj={claimObject} fpropObj={fPropertyObject} assetObj={assetObject} syncPropObj={syncPropertyObject } />)
    }

    if(coordinates){
      fetchData();
      setclickedOnFeature(clickedOnFeatureTmp)
       if( clickedOnFeatureTmp){
          setclickDataLoaded(true);
       }
    //  console.log("222")
    }
     
  }, [coordinates])
  

  // const handleClickPopup = useCallback(   (coordinates) =>  {
   
  // },[coordinates])




  return (
    <div className="flex">
      <CompanySideNavbar />
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
              companyLyrs == "m"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Map
          </Button>
          <Button
            onClick={() => setLyrs("s")}
            className={`${
              companyLyrs == "s"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Satelite
          </Button>






          <Button
            onClick={() => setLyrs("p")}
            className={`${
              companyLyrs == "p"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Terrain
          </Button>
        </ButtonGroup>
        
       <div
        ref={setPopup}
        style={{
            textDecoration: "none",
            position: "absolute",
            top: "2px",
            right: "8px",
            backgroundColor: "white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
             padding: "15px",
            borderRadius: "10px",
            border: "1px solid #cccccc",
            minWidth: "280px",
            color: "black",
          // backgroundColor: "white",
          // boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          // padding: "15px",
          // borderRadius: "10px",
          // border: "1px solid #cccccc",
          // minWidth: "280px",
          // color: "black",
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            setCoordinates(undefined);
            e.target.blur();
            return false;
          }}
          style={{
            textDecoration: "none",
            position: "absolute",
            top: "2px",
            right: "8px",
          }}
        >
          ✖
        </button>
        <div id="popup-contentc">
          {/* <p>Info:</p> */}
          { clickDataLoaded && (<CompanyMapClickPopup  />)}
        
        </div>
        </div>  
               
        <Map
          ref={mapRef}
          style={{
            width: isSideNavOpen ? "80vw" : "100vw",
            height: "90vh",
          }}
          controls={[]}
           onSingleclick={onSingleclick}
        >

            {(popup && clickedOnFeature ) ? (
          <olOverlay
            element={popup}
            position={coordinates}
            autoPan
            autoPanAnimation={{
              duration: 250,
            }}
          />
        ) : null}
          <olView
             ref={mapViewRef}
            initialCenter={[0, 0]}
            center={companyInitialCenter}
            initialZoom={2}
            zoom={companyZoomLevel}
          />
          <olLayerTile preload={Infinity}>
            {/* <olSourceOSM /> */}
            <olSourceXYZ
              args={{
                url: `https://mt0.google.com/vt/lyrs=${companyLyrs}&hl=en&x={x}&y={y}&z={z}`,
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
              >
              </olSourceVector>
           
          </olLayerVectorImage>
              <olLayerVector
            ref={claimLinkVectorLayerRef}
            >
            {syncClaimLinkPropertyFeatures  && (
              <olSourceVector
                ref={claimLinkSourceRef}
                 style={companyMap_tbl_sync_claimlink_VectorLayerStyleFunction}
              >
              
              </olSourceVector>
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
              >
              </olSourceVector>
           
          </olLayerVectorImage>

             <olLayerVector ref={fPropVectorLayerRef}>
             
              <olSourceVector
                ref={fPropSourceRef}
              >
              </olSourceVector>
             
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
            
              <olSourceVector
                ref={syncPropSourceRef}
            
              >
              </olSourceVector>
           
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

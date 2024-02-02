"use client"

import Image from "next/image";
import { useEffect, useState,useRef,useCallback,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoJSON from "ol/format/GeoJSON";

import { setareaFlyToLocation } from "@/store/area-map/area-map-slice";
import { radioGroup } from "@nextui-org/react";

const AreaFCompanyFProperties = ({ companyid }) => {
  const [featureObjects, setfeaturesObjects] = useState([]);
  const [unNamedFeatureObjects, setunNamedFeatureObjects] = useState([]);
  const  blocknoRef   = useRef(0)
  const  pidRef   = useRef(0)

  const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
  );

  const dispatch = useDispatch();

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  useEffect(()=>{
    setunNamedFeatureObjects([])
     console.log("qqq1-mounted")
    return ()=>{
      setunNamedFeatureObjects([])
    }
  },[])

  useEffect(() => {
    // console.log("companyida",companyid)
    setunNamedFeatureObjects([]);
    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);
      let b=0
      for (let index = 0; index < e.length; index++) {
        const element = e[index];
        if(!element.get("prop_name") ){
          if( companyid == element.get("companyid")){
            b++
            element.set("prop_name_empty", "Block" + b)  
            setunNamedFeatureObjects((p)=> [...p,element])
            // console.log("b",b)
          }
        }
      }
      console.log("ww12" )
      setfeaturesObjects(e);
    }

    return ()=>{
      setunNamedFeatureObjects([])
    }

  }, [featuredPropertyFeatures]);

  //flyto

  const flytoHandler = (feature) => {
     console.log("feature", feature,)

    const polygon = feature.getGeometry();
    let loc = [];
    if (polygon) {
      const extent = polygon.getExtent();
      loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    }
    //flyTo
    dispatch(setareaFlyToLocation(loc));
  };

   
  const getDomElements = useMemo(() => {
     console.log("qqq1",unNamedFeatureObjects)
    // console.log("qwe", featureObjects);
    const r = featureObjects.map((fp) => {
      if (!fp.get("propertyid")) {
        pidRef.current = pidRef.current - 1;
      }
      console.log("pid", fp.get("propertyid"));
      if (companyid == fp.get("companyid") && fp.get("prop_name")) {
        // if (!fp.get("prop_name")) {
        //   console.log("blocknoRef1", blocknoRef.current);
        //   blocknoRef.current = blocknoRef.current + 1;
        //   console.log("blocknoRef2", blocknoRef.current);
        // }

        // console.log("companyid",companyid,"pname",fp.properties )
        return (
          <div
            key={fp.get("propertyid") ?? pidRef.current}
            className="hover:bg-blue-200 odd:bg-slate-200   cursor-pointer px-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            onClick={(e) => {
              flytoHandler(fp);
            }}
          >
            <div className="flex">
              <Image src="./sync-prop.svg" width={25} height={10} alt="prop" />
              <div> {fp.get("prop_name") ?? "Block" + blocknoRef.current}</div>
            </div>
            <Image src="./navigation.svg" width={15} height={15} alt="prop" />
          </div>
        );
      }
    });
    
    const unNamedProps = unNamedFeatureObjects.map((fp) => {
        //   console.log("blocknoRef1", blocknoRef.current);
        //   blocknoRef.current = blocknoRef.current + 1;
        //   console.log("blocknoRef2", blocknoRef.current);
        // }

        // console.log("companyid",companyid,"pname",fp.properties )
        return (
          <div
            key={fp.get("propertyid") }
            className="hover:bg-blue-200 odd:bg-slate-200   cursor-pointer px-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            onClick={(e) => {
              flytoHandler(fp);
            }}
          >
            <div className="flex">
              <Image src="./sync-prop.svg" width={25} height={10} alt="prop" />
              <div> {fp.get("prop_name_empty") }</div>
            </div>
            <Image src="./navigation.svg" width={15} height={15} alt="prop" />
          </div>
        );
      
    });

    //heading un named

    const h = (
      <div
        key={"unnamed"}
        className="   bg-blue-600  text-white cursor-pointer px-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="flex">
          {unNamedProps.length > 0 ?  <div>{"Unnamed Properties"}</div> : null}
        </div>
      </div>
    );

    return [...r,h,...unNamedProps];
  }, [featureObjects]);
  


  return (
    < div style={{ height:"20rem", display:"flex", flexDirection:"column",justifyContent:"start", alignItems:"center"}} > 
      <div style={{ fontWeight: 700,   }}>{ areaName}</div>
      <div style={{ fontWeight: 600,   }}>{"Featured Properties" }</div>
      <div className="bg-slate-100"
      style={{
      display: "flex",
      flexDirection: "column",
      justify: "center",
      alignItems: "flex-start", 
      overflowY: "auto",
      maxHeight:"18.5rem",
      width: "14rem",
      margin:"1rem",
      }}>
       
        {
           getDomElements
          
        
        }
          
      </div>
    </div>
  );
};

export default AreaFCompanyFProperties;

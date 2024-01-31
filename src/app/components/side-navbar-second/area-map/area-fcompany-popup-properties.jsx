import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoJSON from "ol/format/GeoJSON";

import { setareaFlyToLocation } from "@/store/area-map/area-map-slice";

const AreaFCompanyFProperties = ({ companyid }) => {
  const [featureObjects, setfeaturesObjects] = useState([]);

  const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
  );

  const dispatch = useDispatch();

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  useEffect(() => {
    console.log("companyida",companyid)
    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);
      setfeaturesObjects(e);
    }
  }, [featuredPropertyFeatures]);

  //flyto

  const flytoHandler = (feature) => {
    // console.log("feature", feature,)

    const polygon = feature.getGeometry();
    let loc = [];
    if (polygon) {
      const extent = polygon.getExtent();
      loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    }
    //flyTo
    dispatch(setareaFlyToLocation(loc));
  };

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
     
              {  featureObjects.map(fp => {
                if (companyid == fp.get("companyid") && fp.get("prop_name") ) {
                    // console.log("companyid",companyid,"pname",fp.properties )
                    return (
                      <div key={fp.get("propertyid")} className="hover:bg-blue-200 odd:bg-slate-200   cursor-pointer px-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
                          onClick={(e) => {
                          flytoHandler(fp)
                      }}>
                        <div className="flex">
                              <Image
                            src="./sync-prop.svg"
                            width={25}
                            height={10}
                            alt="prop"
                          />
                        <div > {fp.get("prop_name")}</div>
                         </div>
                          <Image
                          src="./navigation.svg"
                          width={15}
                          height={15}
                          alt="prop"
                         
                        />
                      </div>
                    
                    )
                  }
              
              })}
          
      </div>
    </div>
  );
};

export default AreaFCompanyFProperties;

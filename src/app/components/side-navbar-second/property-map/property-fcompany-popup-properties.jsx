import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoJSON from "ol/format/GeoJSON";

import { setpropertyMapFlyToLocation } from "@/store/properties-map/properties-map-slice";

const PropertyFCompanyFProperties = ({ companyid }) => {
  const [featureObjects, setfeaturesObjects] = useState([]);
  const [featuredPropertyFeatures, setfeaturedPropertyFeatures] = useState();

  // const featuredPropertyFeatures = useSelector(
  //   (state) => state.propertiesMapReducer.featuredPropertyFeatures
  // );

  const dispatch = useDispatch();

  useEffect(()=>{
    getCompanyHotPlayProperties();



  },[])
  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  useEffect(() => {
    console.log("featuredPropertyFeatures",featuredPropertyFeatures)
    if(featuredPropertyFeatures?.features){
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
    dispatch(setpropertyMapFlyToLocation(loc));
  };

   const getCompanyHotPlayProperties = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/view_hotplay_company/${companyid}`,
        { cache: "no-store" }
      );
      const d = await res.json();
         const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      setfeaturedPropertyFeatures(gj)


    };
    f().catch(console.error);
  };

  return (
    <div
      style={{
        height: "20rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: 600 }}>{"Featured Properties"}</div>
      <div
        className="bg-slate-100"
        style={{
          display: "flex",
          flexDirection: "column",
          justify: "center",
          alignItems: "flex-start",
          maxHeight: "18.5rem",
          overflowY: "auto",
          width: "14rem",
          margin:"1rem",
        }}
      >
        {featureObjects.map((fp) => {
          console.log("prop_name", fp);

          // if (companyid == fp.get("companyid") && fp.get("prop_name") ) {
          // console.log("companyid",companyid,"pname",fp.properties )
          return (
            <div
              key={fp.get("propertyid")}
              className="hover:bg-blue-200 odd:bg-slate-200  cursor-pointer px-2"
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
                <Image
                  src="./sync-prop.svg"
                  width={25}
                  height={10}
                  alt="prop"
                />
                <div> {fp.get("prop_name")}</div>
              </div>
              <Image src="./navigation.svg" width={15} height={10} alt="prop" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyFCompanyFProperties;

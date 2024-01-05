"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Checkbox, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import {
  setAreaCountry,
  setAreaMiningArea,
  setAreaZoomMode,
  setIsAreaSideNavOpen,
} from "../../../store/area-map/area-map-slice";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import CheckboxGroup from "../common-comp/checkboxgroup";
import CheckboxGroupWithFilter from "../common-comp/checkboxgroup-with-filter";
import { setIsPropertiesSideNavOpen } from "@/store/properties-map/properties-map-slice";
import useDebounce from "./useDebounce";
import PropertyFilterItemBrowser from "./property-filter-item-browser";

import {Badge, Avatar} from "@nextui-org/react";
 
import {CheckIcon} from "../icons/checkicon";


const buildSqlWhereClause = (conditions) => {
// const propName = {columnName:"propsearchcol" ,searchValue:propNameLikeParam,dataType:"string", matchType:"like",stringCompareFunc:"lower" , wildcard:"%", wildcardPosition:"both"}
  // console.log("conditions",conditions)
  const q = conditions.reduce((acc, cur) => {
    const quotes= cur.dataType=="string" ? "'":"";
    const stringCompareFunc = cur.stringCompareFunc ? cur.stringCompareFunc :""
    const openBracket = stringCompareFunc? "(" :""
    const closeBracket = stringCompareFunc? ")" :""
    const wildcard = cur.wildcard ? (cur.wildcard =="%" ? "%25":cur.wildcard) :""
    let startWildCard = ""
    let endWildCard = ""
    if(cur.wildcardPosition){
      if(cur.wildcardPosition=="both"){
        startWildCard=wildcard
        endWildCard=wildcard
      } else if(cur.wildcardPosition=="start"){
        startWildCard=wildcard
        endWildCard=""
      }else if(cur.wildcardPosition=="end"){
        startWildCard=""
        endWildCard=wildcard
      }
    } 
    let inList
    if (cur.matchType == "in") {
       inList = cur.searchValue.reduce((acc,cur) => { return (acc ? acc +",":"")  + "'" + cur +"'"},"")
    }else if(cur.matchType == "~*"){
       inList = cur.searchValue.reduce((acc,cur) => { return (acc ? cur+"|"+acc:cur)} ,"" )
    }
    console.log("inList",inList)
    let clause = ""
    if (cur.matchType == "in") {
      clause = cur.searchValue?.length>0 ?  ` ${stringCompareFunc}${openBracket}${cur.columnName}${closeBracket} ${cur.matchType} (${inList})` : "";
       
    }else if  (cur.matchType == "~*") {
      clause = cur.searchValue?.length>0 ?  ` ${stringCompareFunc}${openBracket}${cur.columnName}${closeBracket} ${cur.matchType} '${inList}'` : "";
       
    }
    else {
 
      // clause = cur.searchValue ?  ` ${stringCompareFunc}${openBracket}${cur.columnName}${closeBracket} ${cur.matchType} ${stringCompareFunc}${openBracket}${quotes}${startWildCard}${cur.searchValue}${endWildCard}${quotes}${closeBracket}` : "";
      clause = cur.searchValue ?  ` ${stringCompareFunc}${openBracket}${cur.columnName}${closeBracket} ${cur.matchType} ${stringCompareFunc}${openBracket}${quotes}${startWildCard}${cur.searchValue}${endWildCard}${quotes}${closeBracket}` : "";
    }
    

    return acc ? (acc + (clause ? " and " + clause: "")): clause 

  },"")
 console.log("q",q,)
return q


}

const PropertiesFilter = ({ isOpenIn, closePopup }) => {

  const [searchPropertyName, setSearchPropertyName] = useState('')
  const debouncedSearchPropertyName = useDebounce(searchPropertyName, 500)
  const [propertyName, setpropertyName] = useState("");
  const [propertyNameList, setpropertyNameList] = useState([]);
  // const [propertyMasterNameList, setpropertyMasterNameList] = useState([]);
  const [propertyId, setpropertyId] = useState(0);
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateProvList, setstateProvList] = useState([]);
  const [stateProv, setstateProv] = useState("");
  const [areaList, setareaList] = useState([]);
  const [area, setarea] = useState(""); 
  const [searchQuery, setsearchQuery] = useState(""); 
  const [totalResultCount, settotalResultCount] = useState(0); 
  const [currentPage, setCurrentPage] =  useState(1);
  const [itemsPerPage, setitemsPerPage] =  useState(10);
  const [assetTypeList, setassetTypeList] =  useState([]);
  const [commodityList, setcommodityList] =  useState([]);

  const [searchAssetName, setSearchAssetName] = useState('')
  const debouncedSearchAssetName = useDebounce(searchAssetName, 500)
  



  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // const [selectedTypes, setSelectedTypes] = useState([]);
  // const [selectedCommodity, setSelectedCommodity] = useState([]);

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
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

  //on init
  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/countrylist`,
        {
          cache: "no-store",
        }
      );
      const d = await res.json();
      setCountryList(d.data);
    };

    f().catch(console.error);
  }, []);

  //fetch results when search query changed
  useEffect(() => {

    const f =async  () => {
        // console.log("currentPage2",currentPage)
        // console.log("searchQuery2",searchQuery)
        const res = await fetch(
          `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/${searchQuery}/${itemsPerPage}/${(currentPage-1)*itemsPerPage}`,
          {
            cache: "no-store",
          }
        );
        const d = await res.json();
           console.log("d.data",d.data.length,)
        setpropertyNameList(d.data);
        settotalResultCount(d.count)
         
    }

    if (searchQuery) {
          f().catch(console.error);
      } else {
        setpropertyNameList([]);
      }
  }, [searchQuery,currentPage])

  //current page
  

    // useEffect(() => {
    // const f = async () => {
    //   const res = await fetch(
    //     `https://atlas.ceyinfo.cloud/matlas/countrylist`,
    //     {
    //       cache: "force-cache",
    //     }
    //   );
    //   const d = await res.json();
    //   setCountryList(d.data);
    // };

    // f().catch(console.error);
    // }, [stateProv]);


  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
       
    },
  };

  useEffect(() => {
    setIsOpen(isOpenIn);
  }, [isOpenIn]);

  const filterByTypeOptions = [
    "Operating Mine",
    "Deposit",
    "Zone",
    "Historical Mine",
    "Occurrence",
  ];
  const filterByCommodityOptions = [
    "Gold",
    "Silver",
    "Copper",
    "Zinc",
    "Nickel",
  ];

  const handleFilterByAssetTypeChange = (selectedOptions) => {
    console.log("selectedOptions1",selectedOptions)
    setassetTypeList(selectedOptions);
  };
  const handleFilterByCommodityChange = (selectedOptions) => {
    console.log("selectedOptions2",selectedOptions)
    setcommodityList(selectedOptions);
  };
 

  const searchAction = async () => {
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsPropertiesSideNavOpen(true));
    closePopup();
  };

  //debounced prop name
  useEffect(() => {
 
    
    
      
    // const fall = async () => {
     
        //  if(q){
        //       const res = await fetch(
        //         `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/${q}/10/0`,
        //         {
        //           cache: "no-store",
        //         }
        //       );
        //    const d = await res.json();
        //    console.log("d.data",d.data.length,)
        //       setpropertyNameList(d.data);
        //  }else{
        //   setpropertyNameList([]);
        //  }
        //};
    if (searchPropertyName?.length > 2) {
       const q =  buildSearchQuery(searchPropertyName, "", country, stateProv, area,assetTypeList,commodityList)
        setsearchQuery(q)

    } else {
       const q =  buildSearchQuery("", "", country, stateProv, area,assetTypeList,commodityList)
        setsearchQuery(q)
    }

      //propno, prop_name, prop_alias,area, state_prov, country, region, propertyid
    //   const res = await fetch(
    //     `https://atlas.ceyinfo.cloud/matlas/propertylist/${searchPropertyName}`,
    //     {
    //       cache: "no-store",
    //     }
    //   );
    //   const d = await res.json();
    //   console.log("length",d.data.length)
    //   setpropertyMasterNameList(d.data);
      
      
    // };
    // if (searchPropertyName?.length>2) {
    //   f().catch(console.error);
    // }else{
    //   setpropertyMasterNameList([]);
    // }
  }, [debouncedSearchPropertyName]);

  useEffect(()=>{
    const q =  buildSearchQuery(searchPropertyName, "", country, stateProv, area,assetTypeList,commodityList)
    setsearchQuery(q)
    
  },[assetTypeList])

  
  useEffect(()=>{
    const q =  buildSearchQuery(searchPropertyName, "", country, stateProv, area,assetTypeList,commodityList)
    setsearchQuery(q)
    
  },[commodityList])

  const buildSearchQuery = (propNameLikeParam="",assetNameLikeParam="",countryParam="",stProvParam="",areaParam="",assetTypeListParam=[],commodityListParam=[]) => {
    
    const propName = {columnName:"propsearchcol" ,searchValue:propNameLikeParam,dataType:"string", matchType:"like",stringCompareFunc:"" , wildcard:"%", wildcardPosition:"both"}
    const assetName = {columnName:"assetsearchcol", searchValue: assetNameLikeParam, dataType: "string", matchType: "like" ,stringCompareFunc:""}
    const countryName = {columnName:"country", searchValue: countryParam, dataType: "string", matchType: "="  }
    const stProvName = {columnName:"state_prov", searchValue: stProvParam, dataType: "string", matchType: "=" }
    const areaName = {columnName:"area", searchValue: areaParam, dataType: "string", matchType: "=" }
    const assetTypeList= {columnName:"asset_type", searchValue: assetTypeListParam, dataType: "string", matchType: "in", stringCompareFunc:"" }
    const commodityList= {columnName:"commodities", searchValue: commodityListParam, dataType: "string", matchType: "~*", stringCompareFunc:"" }
    
    // const pro= propNameLikeParam ?? ""
    // const ass= assetNameLikeParam ?? ""
    // const cou= countryParam ?? ""
    // const stp= stProvParam ?? ""
    // const are= areaParam ?? ""
    // const ast= assetTypesParam ?? ""
    // const com= commoditiesParam ?? ""

    // const pro1 = pro ?  `lower(propsearchcol) like lower('%${pro}%')`: "" 
    // const ass1 = ass ? (pro1 ? " and ": "" + `lower(assetsearchcol) like lower('%${ass}%')`): "" 
    
    const q = buildSqlWhereClause([propName, countryName,stProvName,areaName,assetTypeList,commodityList])
    setCurrentPage(1)
    console.log("query",q)
    return q
  }
  //country changed
  useEffect(() => {

    //set search Query
    
 
       const q =  buildSearchQuery(searchPropertyName, "", country, stateProv, area,assetTypeList,commodityList)
       setsearchQuery(q)

    if(country){
       
      //load results from api


      //load state prov 
      const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/stateprovlist/${country}`,
        {
          cache: "no-store",
        }
      );
      const d = await res.json();
      setstateProvList(d.data);
    };

    f().catch(console.error);
    //load  areas
        const farea = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/arealist/${country}`,
        {
          cache: "force-cache",
        }
      );
      const d1 = await res.json();
      setareaList(d1.data);
    };

    farea().catch(console.error);

    }else{
      //console.log("empty country loaded")
      // setpropertyNameList(propertyMasterNameList)
      setstateProvList([])
      setareaList([])
    }

  }, [country])


  // useEffect(() => {
  //   if(country && !stateProv && !area){
  //     // console.log("filtered")
  //     const t =  propertyMasterNameList?.filter(c=> c.country==country)
  //     setpropertyNameList(t)
  //   } else if (country && stateProv && !area) {
  //     const t =  propertyMasterNameList?.filter(c=> c.country==country && c.state_prov==stateProv)
  //     setpropertyNameList(t)
  //   }else if (country && stateProv && area) {
  //     const t =  propertyMasterNameList?.filter(c=> c.country==country && c.state_prov==stateProv && c.area==area)
  //     setpropertyNameList(t)
  //   }
  //   else{
  //     setpropertyNameList(propertyMasterNameList)
  //   }
  
    
  // }, [propertyMasterNameList])
  

  useEffect(() => {
   const q =  buildSearchQuery(searchPropertyName, "", country, stateProv, area,assetTypeList,commodityList)
       setsearchQuery(q)

    //   const fall = async () => {
    //      if(q){
    //         const res = await fetch(
    //           `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/${q}/10/0`,
    //           {
    //             cache: "force-cache",
    //           }
    //         );
    //         const d = await res.json();
    //         setpropertyNameList(d.data);
    //     }else{
    //       setpropertyNameList([]);
    //      }
    // };

    // fall().catch(console.error);
    //   if(country && !stateProv && !area){
    //   // console.log("filtered")
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country)
    //   setpropertyNameList(t)
    // } else if (country && stateProv && !area) {
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country && c.state_prov==stateProv)
    //   setpropertyNameList(t)
    // }else if (country && stateProv && area) {
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country && c.state_prov==stateProv && c.area==area)
    //   setpropertyNameList(t)
    // } else if (country && !stateProv && area) {
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country && c.area==area)
    //   setpropertyNameList(t)
    // }
    // else{
    //   setpropertyNameList(propertyMasterNameList)
    // }
  
   
  }, [stateProv])
  
  
  useEffect(() => {
  //  buildSearchQuery(debouncedSearchPropertyName,"",country,stateProv,area)

     const q =  buildSearchQuery(searchPropertyName, "", country, stateProv, area,assetTypeList,commodityList)
       setsearchQuery(q)

    // const fall = async () => {
    //      if(q){
    //         const res = await fetch(
    //           `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/${q}/10/0`,
    //           {
    //             cache: "force-cache",
    //           }
    //         );
    //         const d = await res.json();
    //         setpropertyNameList(d.data);
    //    }else{
    //         setpropertyNameList([]);
    //      }
    // };

    // fall().catch(console.error);

    //   if(country && !stateProv && !area){
    //   // console.log("filtered")
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country)
    //   setpropertyNameList(t)
    // } else if (country && stateProv && !area) {
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country && c.state_prov==stateProv)
    //   setpropertyNameList(t)
    // }else if (country && stateProv && area) {
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country && c.state_prov==stateProv && c.area==area)
    //   setpropertyNameList(t)
    // }
    // else if (country && !stateProv && area) {
    //   const t =  propertyMasterNameList?.filter(c=> c.country==country && c.area==area)
    //   setpropertyNameList(t)
    // }
    // else{
    //   setpropertyNameList(propertyMasterNameList)
    // }
  
   
  }, [area])


  return (
    
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        style={customStyles}
        ariaHideApp={false}
        
    >
      <div className="flex-col justify-start bg-white rounded-lg">
        <section  className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              Filters  
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
        </section>
        <div className="rounded-lg flex items-start">
         
          <div className="flex items-start justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap ">
                <div className="w-full px-3 flex flex-col gap-3">
                  <div className="flex gap-2 border-b-2 w-full">
                      <span className="flex  ">
                       {searchPropertyName && <Badge
                          isOneChar
                          content={<CheckIcon />}
                          color="danger"
                          placement="top-left"
                           
                        >
                            </span>
                           </Badge> }
                    <Autocomplete
                      allowsCustomValue
                      size={"sm"}
                      label="Property Name"
                      className="w-1/2"
                       selectedKey={propertyId}
                      onInputChange={(e) => {
                        setSearchPropertyName(e)
                      }}
                        onSelectionChange={(e) => {
                         setpropertyId(e)
                      
                      }}
                      defaultSelectedKey={propertyId}
                    >
                      {propertyNameList?.map((prop) => (
                        <AutocompleteItem
                          key={prop.propertyid}
                          value={prop.prop_name}
                        >
                          {prop.prop_name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  
                     <Autocomplete
                      size={"sm"}
                      label="Asset Name"
                      className="w-1/2 mb-4"
                      onInputChange={(e) => {
                        setCountry(e);
                      }}
                      defaultSelectedKey={propertyId}
                    >
                     {propertyNameList?.map((prop) => (
                        <AutocompleteItem
                          key={prop.propertyid}
                          value={prop.asset_name}
                        >
                          {prop.asset_name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete> 
                  </div>
                  <div className="border-b-2 flex w-full max-h-[250px]">
                    <div className="flex flex-col gap-2 w-1/2">
                      <span className="flex gap-2">
                       {assetTypeList.length>0 && <Badge
                          isOneChar
                          content={<CheckIcon />}
                          color="danger"
                          placement="top-left"
                        >
                           </Badge> }
                      <span className="text-sm font-semibold">
                        Filter By Mine Type
                      </span>
                      </span>
                      <div className="mb-4">
                        <CheckboxGroup
                          options={filterByTypeOptions}
                          onChange={handleFilterByAssetTypeChange}
                        />
                      </div>

                      {/* <div>
                        <strong>Selected Colors:</strong>
                        <ul>
                          {selectedColors.map((color) => (
                            <li key={color}>{color}</li>
                          ))}
                        </ul>
                      </div> */}
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                       <span className="flex gap-2">
                       {commodityList.length>0 && <Badge
                          isOneChar
                          content={<CheckIcon />}
                          color="danger"
                          placement="top-left"
                        >
                           </Badge> }
                      <span className="text-sm font-semibold">
                        Filter By Commodity
                      </span>
                      </span>
                      <div className="mb-4 max-h-[210px] overflow-y-auto">
                        <CheckboxGroupWithFilter
                          options={filterByCommodityOptions}
                          onChange={handleFilterByCommodityChange}
                        />
                      </div>

                      {/* <div>
                        <strong>Selected Colors:</strong>
                        <ul>
                          {selectedColors.map((color) => (
                            <li key={color}>{color}</li>
                          ))}
                        </ul>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="flex gap-2">
                       {country && <Badge
                          isOneChar
                          content={<CheckIcon />}
                          color="danger"
                          placement="top-left"
                           
                        >
                           </Badge> }
                    <span className="text-sm font-semibold">
                      Filter By Location
                    </span>
                    </span>
                    <div className="flex gap-2">
                   
                     <Autocomplete
                        size={"sm"}
                        label="Country"
                        className="w-1/2"
                        onSelectionChange={(e) => {
                          setCountry(e);
                        }}
                        defaultSelectedKey={country}
                      >
                        {countryList.map((countryObj) => (
                          <AutocompleteItem
                            key={countryObj.country}
                            value={countryObj.country}
                          >
                            {countryObj.country}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                      {stateProv && <Badge
                          isOneChar
                          content={<CheckIcon />}
                          color="danger"
                          placement="top-left"
                           
                        >
                           </Badge> }
                   <Autocomplete
                        size={"sm"}
                        label="State / Province"
                        className="w-1/2"
                        onInputChange={(e) => {
                          setstateProv(e);
                        }}
                        defaultSelectedKey={stateProv}
                      >
                        {stateProvList.map((spObj) => (
                          <AutocompleteItem
                            key={spObj.state_prov}
                            value={spObj.state_prov}
                          >
                            {spObj.state_prov}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete> 
                    </div>
                  </div>
                  <div className="flex">
                    {area && <Badge
                          isOneChar
                          content={<CheckIcon />}
                          color="danger"
                          placement="top-left"
                           
                        >
                           </Badge> }
                     <Autocomplete
                      size={"sm"}
                      label="Mining Area"
                      className="w-1/2"
                      onInputChange={(e) => {
                        setarea(e);
                      }}
                      defaultSelectedKey={area}
                    >
                      {areaList.map((ao) => (
                        <AutocompleteItem
                          key={ao.area}
                          value={ao.area}
                        >
                          {ao.area}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete> 
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 border-t-2 border-gray-300 min-w-[550px] mb-4">
                {/* <div className="flex items-center justify-between mt-3 fixed bottom-8 border-t-2 border-gray-300 min-w-[550px]"> */}
                <div className="mt-2">
                  <Chip
                    color="default"
                    variant="light"
                    className="cursor-pointer"
                  >
                    Reset
                  </Chip>
                </div>
                <div className="mt-2">
                  <Chip
                    color="primary"
                    className="cursor-pointer hover:bg-blue-600 custom-button-1 bg-blue-700"
                    onClick={searchAction}
                    isDisabled={propertyNameList.length== 0 }
                  >
                    Show on Map
                  </Chip>
                </div>
              </div>
            </div>

          </div>
                      { 
            ( <div className="flex-col gap-32">
             
              <div className="border-solid border  h-[625px]  w-[250px]   bg-white     rounded-lg m-2 ">
                <PropertyFilterItemBrowser  properties={propertyNameList} totalResultCount={totalResultCount} curPageHandler={setCurrentPage} itemsPerPage={itemsPerPage}  />
              </div>
               {/* <div > 
                 <span className="ml-2 "  >{`Selected Properties- ${totalResultCount}`} </span>
              </div> */}
              </div>
            )}  
          {/* {(propertyNameList?.length ? true:null) &&
            ( <div className="flex-col">
              <div > 
                 <span  >{`Selected Properties- ${propertyNameList.length} Nos. `} </span>
              </div>
              <div className="min-w-[550px]  h-[465px]    bg-white overflow-y-auto   rounded-lg  ">
                <PropertyFilterItemBrowser  properties={propertyNameList}  />
              </div>
              </div>
            )} */}
        </div>
       
          {/* {propertyNameList?.length && (<div className="min-w-[550px]   h-[400px] bg-white overflow-scroll transition-all duration-1000 ease-linear">
          <PropertyFilterItemBrowser  properties={propertyNameList}  />
        </div>)} */}
     </div>
     
      </Modal>

      
    
  );
};
export default PropertiesFilter;

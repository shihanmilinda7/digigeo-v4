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

const PropertiesFilter = ({ isOpenIn, closePopup }) => {

  const [searchPropertyName, setSearchPropertyName] = useState('')
  const debouncedSearchPropertyName = useDebounce(searchPropertyName, 500)
  const [propertyName, setpropertyName] = useState("");
  const [propertyNameList, setpropertyNameList] = useState([]);
  const [propertyId, setpropertyId] = useState(0);

  const [searchAssetName, setSearchAssetName] = useState('')
  // const debouncedSearchAssetName = useDebounce(searchSAssetName, 500)
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState([]);

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
    "Operating Mines",
    "Deposits",
    "Zones",
    "Historical Mines",
    "Occurrences",
  ];
  const filterByCommodityOptions = [
    "Gold",
    "Silver",
    "Copper",
    "Zinc",
    "Nickel",
  ];

  const handleFilterByTypeChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
  };
  const handleFilterByCommodityChange = (selectedOptions) => {
    setSelectedCommodity(selectedOptions);
  };
 

  const searchAction = async () => {
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsPropertiesSideNavOpen(true));
    closePopup();
  };

  useEffect(() => {
    console.log("lll")
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/propertylist/${searchPropertyName}`,
        {
          cache: "force-cache",
        }
      );
      const d = await res.json();
      console.log("length",d.data.length)
      setpropertyNameList(d.data);
      
      
    };
    if (searchPropertyName?.length>2) {
      f().catch(console.error);
    }
  }, [debouncedSearchPropertyName]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg ">
          <div className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              Filters {propertyId} name-{propertyName}
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div>
          <div className="flex items-center justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap mt-8">
                <div className="w-full px-3 flex flex-col gap-3">
                  <div className="flex gap-2 border-b-2 w-full">
                    <Autocomplete
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
                      {propertyNameList.map((prop) => (
                        <AutocompleteItem
                          key={prop.propertyid}
                          value={prop.prop_name}
                        >
                          {prop.prop_name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    {/* <Autocomplete
                      size={"sm"}
                      label="Asset Name"
                      className="w-1/2 mb-4"
                      onInputChange={(e) => {
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
                    </Autocomplete> */}
                  </div>
                  <div className="border-b-2 flex w-full max-h-[250px]">
                    <div className="flex flex-col gap-2 w-1/2">
                      <span className="text-sm font-semibold">
                        Filter By Type
                      </span>
                      <div className="mb-4">
                        <CheckboxGroup
                          options={filterByTypeOptions}
                          onChange={handleFilterByTypeChange}
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
                      <span className="text-sm font-semibold">
                        Filter By Commodity
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
                    <span className="text-sm font-semibold">
                      Filter By Location
                    </span>
                    <div className="flex gap-2">
                      {/* <Autocomplete
                        size={"sm"}
                        label="Country"
                        className="w-1/2"
                        onInputChange={(e) => {
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
                      </Autocomplete> */}
                      {/* <Autocomplete
                        size={"sm"}
                        label="State / Province"
                        className="w-1/2"
                        onInputChange={(e) => {
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
                      </Autocomplete> */}
                    </div>
                  </div>
                  <div className="flex">
                    {/* <Autocomplete
                      size={"sm"}
                      label="Mining Area"
                      className="w-1/2"
                      onInputChange={(e) => {
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
                    </Autocomplete> */}
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
                  >
                    Search
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default PropertiesFilter;

"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
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

const AreaFilter = ({ isOpenIn, closePopup }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  // const [country, setCountry] = useState("");
  const [country, setCountry] = useState("Canada");
  const [countryList, setCountryList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  // const [miningArea, setMiningArea] = useState("");
  const [miningArea, setMiningArea] = useState("Timmins");

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );
  // const areaCountry = "Test";
  // const areaState = "Test";

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "40%",
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

  useEffect(() => {
    setCountry(areaCountry);
    setMiningArea(areaName);
  }, [areaName, areaCountry]);
  //areal load
  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/areas/${country}`,
        { cache: "force-cache" }
      );
      const d = await res.json();
      console.log("areas", d.data);
      setAreaList(d.data);
    };

    f().catch(console.error);
  }, [country]);

  const searchAction = async () => {
    if (country && miningArea) {
      dispatch(setAreaZoomMode("extent"));
      const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${country}&ma=${miningArea}`;
      window.history.replaceState({}, "", newUrl);
      dispatch(setIsAreaSideNavOpen(true));
      // dispatch(setAreaCountry("Canada"));
      // dispatch(setAreaMiningArea("Timmins"));
      dispatch(setAreaCountry(country));
      dispatch(setAreaMiningArea(miningArea));
      closePopup();
    }
    // dispatch(setAreaState("Canada"));
  };
  //const animals = [{value:"qqq", label:"q1"},{value:"qqq2", label:"q2"},{value:"qqq3", label:"q3"}]

  useEffect(() => {
    const f = async () => {
      const res = await fetch(`https://atlas.ceyinfo.cloud/matlas/countrylist`, {
        cache: "force-cache",
      });
      const d = await res.json();
      console.log("w2", d.data);
      setCountryList(d.data);
    };

    f().catch(console.error);
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg ">
          <div className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              Filters
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
                  <span className="text-base font-semibold leading-none text-gray-900 mt-3 border-b-2 border-gray-900 w-fit">
                    Exploration Areas
                  </span>
                  <div className="flex gap-2">
                    <Autocomplete
                      label="Select a country"
                      className="max-w-xs"
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
                    </Autocomplete>

                    <Autocomplete
                      label="Select a mining area"
                      className="max-w-xs"
                      defaultSelectedKey={miningArea}
                      onInputChange={(e) => {
                        setMiningArea(e);
                      }}
                    >
                      {areaList.map((areaObj) => (
                        <AutocompleteItem
                          key={areaObj.area_name}
                          value={areaObj.area_name}
                        >
                          {areaObj.area_name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    {/* <NextTextInputField
                      label="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-lg border border-blue-500"
                      variant="bordered"bbb
                    /> */}
                    {/* <NextTextInputField
                      label="Mining Area"
                      value={miningArea}
                      onChange={(e) => setMiningArea(e.target.value)}
                      className="w-full rounded-lg border border-blue-500"
                      variant="bordered"
                    /> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 fixed bottom-8 border-t-2 border-gray-300 min-w-[550px]">
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
                    className="cursor-pointer hover:bg-blue-500 custom-button-1"
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
export default AreaFilter;

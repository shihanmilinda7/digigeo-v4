// components/Accordion.js
import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import AreaFCompanyPopup from "./area-fcompany-popup";




const FeaturedCompanyDetailDiv = ({ companyid, title, children, onClick }) => {
  // const [isPopupOpen, setIsPopup]
 // console.log("companyid",companyid)
  const [isOpenIn, setIsOpenIn] = useState();

  const closePopup = () => {
    setIsOpenIn(false);
  };

  return (
    <div>
      <div
        className="relative items-center flex pl-4 border rounded-lg border-blue-700 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in"
      >
        <span className="mr-2">{children}</span>
        <h3
          style={{
            margin: 0,
            marginRight: "5px",
            overflow: "hidden",
            fontSize: "0.75rem",
          }}
        >
          {title}
        </h3>
        <div className="flex absolute right-0 mr-2 gap-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          <span className="">
            <MdInfoOutline
              className="cursor-pointer h-4 w-4"
              onClick={() => setIsOpenIn(true)}
              // onClick={() => console.log("title", title)}
            />
          </span>
          {isOpenIn ? (
            <AreaFCompanyPopup
              isOpenIn={isOpenIn}
              closePopup={closePopup}
              titleIn={title}
              companyid={companyid}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanyDetailDiv;

//select working br

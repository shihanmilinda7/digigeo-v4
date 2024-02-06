// components/Accordion.js
import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import AreaFCompanyPopup from "./area-fcompany-popup";




const FeaturedCompanyDetailDiv = ({ companyid, title, children, onClick }) => {
  // const [isPopupOpen, setIsPopup]
 // console.log("companyid",companyid)
  const [isOpenIn, setIsOpenIn] = useState();
  const [dialogRef, setdialogRef] = useState();

  // const closePopup = () => {
  //   setIsOpenIn("n");
  // };

    const dialogStateCallBack = () => {
     setIsOpenIn("n");
  }

  const getDialogRef = (dialogRef) => {
    setdialogRef(dialogRef)
      console.log("polk",dialogRef)
    //  dialogRef?.close();
    //  setIsOpenIn("n");
    //  onClose();
    //  dialogStateCallBack();
   };

  return (
    <div>
      <div className="relative items-center flex pl-4 border rounded-lg border-blue-700 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in">
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
              className="cursor-pointer h-4 w-4 hover:scale-125"
              onClick={() => {
                console.log("lok",dialogRef)
                 dialogRef?.close();
                setIsOpenIn("y")}}
              // onClick={() => console.log("title", title)}
            />
          </span>
          {isOpenIn=="y" ? (
            <AreaFCompanyPopup
              isOpenIn={isOpenIn}
              // closePopup={closeDialog}
              titleIn={title}
              companyid={companyid}
               dialogStateCallBack={dialogStateCallBack}
              getDialogRef={getDialogRef}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanyDetailDiv;

//select working br

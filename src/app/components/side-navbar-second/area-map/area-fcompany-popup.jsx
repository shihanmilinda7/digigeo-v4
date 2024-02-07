"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image'
import Link from "next/link";
import AreaFCompanyFProperties from "./area-fcompany-popup-properties";
import AMapDialogComponent from './area-fcompany-dialog';


const formatUrl = (url) => {
  //remove https:
  let res = url;
  let urlPrefix = "https://";
  let a = res.search("https://");
  if (a != -1) {
    res = res.substring(8);
  }

  a = res.search("http://");
  if (a != -1) {
    res = res.substring(7);
    urlPrefix = "http://";
  }
  //rem trailling /
  if (res[res.length - 1] == "/") {
    res = res.substring(0, res.length - 1);
  }
  //check for www
  //  a = res.search("www");
  //  if (a == -1) {
  //    res = "www." + res
  //  }

  return { url: res, urlPrefix };
};

const getStyledTexts = (name) => {
  //console.log("name",name,)
  const stBracketIndex = name.indexOf("(");
  if (stBracketIndex == -1) {
    // const sp = document.createElement("SPAN");
    // const sptext = document.createTextNode(name ?? "");
    // sp.appendChild(sptext);
    return [{ text:  "", style: {} }];
  }
  const compName = name.substr(0, stBracketIndex);
  const addends = name.substr(stBracketIndex, name.length - stBracketIndex);

  const parts = addends.split(",");
  const spans = [];
  const contents = []
  //add comp name
  const sp = document.createElement("SPAN");
  const sptext = document.createTextNode(compName);
  sp.appendChild(sptext);
  sp.style.display = "block";
  sp.style.fontSize = "1.5rem"
  spans.push(sp);
  //contents.push({text:compName,style:{} });
  let i = 0;
  let c = parts.length;
  parts.forEach((str) => {
    //find :
    const indexColon = str.indexOf(":");
    if (indexColon == -1) {
      const sp = document.createElement("SPAN");
      const sptext = document.createTextNode(str + ",");
      sp.appendChild(sptext);
      spans.push(sp);
       contents.push({text:str + ",",style:{} });
    } else {
      const stockEx = str.substr(1, indexColon - 1);
      const stockVal = str.substr(indexColon, str.length - indexColon - 1);
      //add 1
      const sp = document.createElement("SPAN");
      const sptext = document.createTextNode(stockEx);
      sp.style.marginLeft = "0.25rem";
      sp.appendChild(sptext);
      spans.push(sp);
      contents.push({text:stockEx  ,style:{marginLeft : "0.25rem"} });

      //add 2
      const sp2 = document.createElement("SPAN");
      let trailingComma = ",";
      if (i + 1 == c) {
        trailingComma = "";
      }
      const sptext2 = document.createTextNode(stockVal + trailingComma);
      sp2.style.color = "blue";
      sp2.style.fontWeight = 600;
      sp2.appendChild(sptext2);
      spans.push(sp2);
      contents.push({text:stockVal + trailingComma,style:{color: "blue",fontWeight : 600} });
    }

    i++;
  });
  return contents;
};


const AreaFCompanyPopup = ({ isOpenIn, closePopup, titleIn,companyid,dialogStateCallBack,getDialogRef }) => {
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState("n");
  const [title, setTitle] = useState("");
  const [logoPath, setlogoPath] = useState("");
  const [sponsorData, setsponsorData] = useState([]);
  const [profile, setprofile] = useState("");
  const [url, seturl] = useState("");
  const [urlPrefix, seturlPrefix] = useState("");
  const [showDlg, setshowDlg] = useState("");
  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  // const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);


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
      overflowY:"hidden" ,
    },
  };

  useEffect(() => {
    setIsOpen(isOpenIn);
  }, [isOpenIn]);
  useEffect(() => {
  }, [sponsorData]);

  useEffect(() => {
    setTitle(titleIn);
    getCompanyDetails();
    getSponsorDetails();
  }, [titleIn]);

 const getSponsorDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/sponsor_details/${companyid}`,
        { cache: "no-store" }
      );
      const d = await res.json();
       console.log("bbb1" ); 
      if(d?.data?.length>0){
         console.log("bbb2",d.data[0]?.company ); 
      const sponsorData = getStyledTexts(d.data[0]?.company ?? "");
       console.log("bbb2-1",sponsorData ); 
      setsponsorData(sponsorData)
      console.log("sponsorData",sponsorData)
      setprofile(d.data[0]?.profile ?? "")
      }else{
         console.log("bbb3" ); 
        setprofile("")
        setsponsorData("")
      }
       console.log("bbb4" ); 
    };
    f().catch(console.error);
  };
 const getCompanyDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/company_details/${companyid}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      console.log("aaa1" ); 
          if(d?.data?.length>0){  
               console.log("aaa2" ); 
                let { url, urlPrefix } = formatUrl(d.data[0]?.url ?? "");
              seturl(url)
            seturlPrefix(urlPrefix);
              const logo = d.data[0]?.logo;
               console.log("aaa3",logo ); 
              if(logo){
              const logoext = d.data[0]?.logoext ?? "png";
              console.log("logoext",logoext) 
              console.log("aaa4" ); 
              let urlimg =
              `data:image/${logoext};base64,` +
              btoa(String.fromCharCode.apply(null, new Uint8Array(logo.data)));
                
              setlogoPath(urlimg)
              }else{
                console.log("aaa5" ); 
                 setlogoPath("")
                 seturl("")
                   
              }
         }else{
          console.log("aaa6" ); 
             setlogoPath("")
             seturl("")
         }

    };
    f().catch(console.error);
  };




  return (
    <div>
      {/* <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false} [220px]
        style={customStyles}
        ariaHideApp={false}
      > */}
      <AMapDialogComponent
        title=""
        // onClose={closePopup}
        //onOk={() => console.log("ok")}
        showDialog={isOpen}
        dialogStateCallBack={dialogStateCallBack}
        getDialogRef={getDialogRef}
      >
        <div className="bg-white rounded-lg min-w-[400px] flex-col justify-center items-center select-none">
          {/* <div className="flex items-center justify-center   h-8 rounded-lg">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mr-6"
            />
          </div> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justify: "center",
              alignItems: "center",
              // padding: "1rem",
              gap: "1rem",
            }}
          >
            <div>
              {" "}
              {logoPath && (
                <Image src={logoPath} width={200} height={100} alt="Logo" />
              )}
            </div>
            <span className="font-bold">{title}</span>
            <span>
              {sponsorData.length > 0 &&
                sponsorData.map((sd) => (
                  <span key={sd.text} style={sd.style}>
                    {sd.text}
                  </span>
                ))}
            </span>

            {url && (
              <Link
                href={urlPrefix + url}
                target="_blank"
                className="font-bold  rounded-lg border border-solid underline hover:text-blue-600"
              >
                {url}
              </Link>
            )}
            {profile && (
              <Link
                href={profile}
                target="_blank"
                className="rounded-full border border-solid border-black p-2 underline hover:text-blue-600"
              >
                {"Read More"}
              </Link>
            )}
            <AreaFCompanyFProperties companyid={companyid} />
          </div>
        </div>
      </AMapDialogComponent>
    </div>
  );
};
export default AreaFCompanyPopup;

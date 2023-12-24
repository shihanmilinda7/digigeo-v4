// import React from "react";

import Image from "next/image";
import React, { useState } from "react";

const AreaPropertyNode = ({ propertyName }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex hover:bg-slate-200 cursor-pointer"    style={{ marginLeft: "20px" }}>
       
         {/* {hasChildren && <span>{isOpen ? "[-]" : "[+]"}</span>} */}
          <Image
      src="./sync-prop.svg"
      width={25}
      height={10}
      alt="prop"
    />
        {propertyName}
      </div>
       
      {/* {isOpen && hasChildren && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode key={child.label} node={child} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default AreaPropertyNode;

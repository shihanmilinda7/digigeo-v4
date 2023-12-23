"use client";
import { Chip } from "@nextui-org/react";
// components/CheckboxGroup.js
import React, { useState } from "react";

const CheckboxGroup = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const handleSelectAll = () => {
    setSelectedOptions(options);
    onChange(options);
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <div>
      <div className="flex gap-2">
        <span className="text-sm">Select All : </span>
        <div className="flex gap-2">
          <Chip
            size="sm"
            color="primary"
            className="cursor-pointer hover:bg-blue-500 custom-button-1"
            onClick={handleClearSelection}
          >
            No
          </Chip>
          <Chip
            size="sm"
            color="primary"
            className="cursor-pointer hover:bg-blue-500 custom-button-1"
            onClick={handleSelectAll}
          >
            Yes
          </Chip>
        </div>
      </div>
      {/* <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleClearSelection}>Clear Selection</button> */}

      {options.map((option) => (
        <div key={option}>
          <label class="inline-flex items-center mt-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <span class="ml-2 text-gray-700">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;

// import React, { useState } from "react";

// const CheckboxGroup = ({ options, onChange }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleCheckboxChange = (option) => {
//     const updatedOptions = selectedOptions.includes(option)
//       ? selectedOptions.filter((selectedOption) => selectedOption !== option)
//       : [...selectedOptions, option];

//     setSelectedOptions(updatedOptions);
//     onChange(updatedOptions);
//   };

//   return (
//     <div>
//       {options.map((option) => (
//         <div key={option}>
//           <label class="inline-flex items-center mt-2">
//             <input
//               type="checkbox"
//               className="form-checkbox h-5 w-5 text-gray-600"
//               value={option}
//               checked={selectedOptions.includes(option)}
//               onChange={() => handleCheckboxChange(option)}
//             />
//             <span class="ml-2 text-gray-700">{option}</span>
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckboxGroup;

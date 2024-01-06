"use client";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";

const CheckboxGroupWithFilter = ({ options, onChange,selectedValues }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isYesButton, setIsYesButton] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
       
      if(selectedValues){
        
        setSelectedOptions(selectedValues)
      }
   }, [selectedValues]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const handleSelectAll = () => {
    setSelectedOptions(filteredOptions);
    onChange(filteredOptions);
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
    onChange([]);
  };

  useEffect(() => {
    // Apply the filter when the filter state changes
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredOptions(filtered);

    // Update the 'isYesButton' state based on the selected options
    setIsYesButton(selectedOptions.length === filtered.length);
  }, [filter, options, selectedOptions]);

  return (
    <div>
      <div className="flex gap-2">
        <span className="text-sm">Select All : </span>
        <div className="flex gap-2">
          <Chip
            size="sm"
            color="primary"
            className={`cursor-pointer custom-button-1 ${
              isYesButton ? "bg-white text-blue-700" : "bg-blue-700 text-white"
            }`}
            onClick={handleClearSelection}
          >
            No
          </Chip>
          <Chip
            size="sm"
            color="primary"
            className={`cursor-pointer custom-button-1 ${
              isYesButton ? "bg-blue-700 text-white" : "bg-white text-blue-700"
            }`}
            onClick={handleSelectAll}
          >
            Yes
          </Chip>
        </div>
      </div>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-1 rounded-md"
        />
      </div>

      {filteredOptions.map((option) => (
        <div key={option}>
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="ml-2 text-gray-700">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroupWithFilter;

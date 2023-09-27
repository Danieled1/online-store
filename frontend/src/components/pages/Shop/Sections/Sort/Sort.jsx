// Sort.jsx

import React from "react";
import { Select } from "@chakra-ui/react";

const Sort = ({ onSortChange }) => {
  // Define sorting options
  const sortingOptions = [
    { label: "New to Old", value: "new-to-old" },
    { label: "Old to New", value: "old-to-new" },
    { label: "Low Price to High Price", value: "low-price" },
    { label: "High Price to Low Price", value: "high-price" },
  ];

  return (
    <Select
      placeholder='Sort by'
      onChange={(e) => onSortChange(e.target.value)}
      w={"320px"}
      bg={"blue.50"}
    >
      {sortingOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default Sort;

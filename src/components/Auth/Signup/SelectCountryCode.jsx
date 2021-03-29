import React, { useState, useEffect } from "react";

const SelectCountryCode = ({ handleOnChange }) => {
  const [callingCountries, setCallingCountries] = useState([]);

  useEffect(() => {
    const _callingCountries = require("country-data").callingCodes;
    setCallingCountries(_callingCountries.all);
  }, []);

  return (
    <select
      name="country"
      id="country"
      placeholder="select"
      defaultValue=""
      onChange={handleOnChange}
      style={{
        height: "28px",
        border: "1.2px solid #909090",
        color: "#909090",
        borderRadius: "5px",
        width: "90px"
      }}
    >
      <option value="" disabled></option>
      {callingCountries.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectCountryCode;

import React, { useState, useEffect } from "react";

const SelectCountryCode = ({ value, handleOnChange }) => {
  const [callingCountries, setCallingCountries] = useState([]);

  useEffect(() => {
    const _callingCountries = require("country-data").callingCodes;
    setCallingCountries(_callingCountries.all);
  }, []);

  return (
    <select
      name="country"
      id="country"
      value={value}
      onChange={handleOnChange}
    >
      <option value=""></option>
      {callingCountries.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectCountryCode;

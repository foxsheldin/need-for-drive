import React, { useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import "./styles.scss";

const InputAutocomplete = ({
  name,
  placeholder,
  arrayData,
  searchValues,
  searchValue,
  setSearchValues,
  setSearchValue,
  handleSet,
  disabled,
}) => {
  const [displayAutocomplete, setDisplayAutocomplete] = useState(false);

  const handleClickInput = () => {
    setDisplayAutocomplete(!displayAutocomplete);
  };

  const handleChangeInput = (evt) => {
    setDisplayAutocomplete(true);
    const regExpValue = new RegExp(evt.target.value, "i");
    if (name === "city")
      setSearchValues(
        arrayData?.filter((city) => city.name.match(regExpValue))
      );
    if (name === "address")
      setSearchValues(
        arrayData.filter(
          (point) => point.address.match(regExpValue) && point.coordinates
        )
      );
    setSearchValue(evt.target.value);
  };

  const handleBlurInput = () => {
    setTimeout(() => {
      setDisplayAutocomplete(false);
    }, 300);
  };

  return (
    <div className="search">
      <input
        type="search"
        name={name}
        id={name}
        className="input"
        placeholder={placeholder}
        value={searchValue}
        onClick={handleClickInput}
        onBlur={handleBlurInput}
        onChange={handleChangeInput}
        disabled={disabled}
      />
      {displayAutocomplete && (
        <Autocomplete arrayData={searchValues} handleSet={handleSet} />
      )}
    </div>
  );
};

export default InputAutocomplete;

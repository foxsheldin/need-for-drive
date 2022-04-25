import React, { useEffect, useState } from "react";
import "./styles.scss";

const InputAutocomplete = ({
  name,
  placeholder,
  arrayData,
  handleSet,
  selectedValue,
  disabled,
}) => {
  const [displayAutocomplete, setDisplayAutocomplete] = useState(false);
  const [searchValues, setSearchValues] = useState(arrayData);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValues(arrayData);
    if (!arrayData) setSearchValue("");
  }, [arrayData]);

  useEffect(() => {
    setSearchValue(selectedValue ?? "");
  }, [selectedValue]);

  const handleClickInput = () => {
    setDisplayAutocomplete(!displayAutocomplete);
  };

  const handleClickAutocomplete = (item) => {
    setSearchValue(item);
    handleSet(item);
  };

  const handleChangeInput = (evt) => {
    if (evt.target.value === "") handleSet(null);
    setDisplayAutocomplete(true);
    const regExpValue = new RegExp(evt.target.value, "i");
    setSearchValues(arrayData.filter((item) => item.match(regExpValue)));
    setSearchValue(evt.target.value);
  };

  const handleBlurInput = () => {
    setTimeout(() => {
      setDisplayAutocomplete(false);
    }, 300);
  };

  const handleKeyDownAutocomplete = (evt, item) => {
    if (evt.code === "Enter") handleSet(item);
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
        disabled={disabled ?? false}
      />
      {displayAutocomplete && (
        <div className="autocomplete">
          {searchValues?.map((item) => {
            return (
              <div
                className="autocomplete__item"
                onClick={() => handleClickAutocomplete(item)}
                key={item}
                tabIndex="0"
                onKeyDown={(evt) => handleKeyDownAutocomplete(evt, item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputAutocomplete;

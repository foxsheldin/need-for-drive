import React from "react";
import "./styles.scss";

const Autocomplete = ({ arrayData, handleSet }) => {
  const handleKeyDown = (evt, item) => {
    if (evt.code === "Enter") handleSet(item);
  };

  return (
    <div className="autocomplete">
      {arrayData?.map((item) => {
        return (
          <div
            className="autocomplete__item"
            onClick={() => handleSet(item)}
            key={item.id}
            tabIndex="0"
            onKeyDown={(evt) => handleKeyDown(evt, item)}
          >
            {item.address ?? item.name}
          </div>
        );
      })}
    </div>
  );
};

export default Autocomplete;

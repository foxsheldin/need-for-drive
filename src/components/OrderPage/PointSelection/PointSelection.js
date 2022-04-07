import React, { useRef } from "react";
import MapContent from "./Map/MapContent";
import "./styles.scss";

const PointSelection = ({
  citiesData,
  pointsData,
  searchCities,
  searchPoints,
  displayCities,
  displayPoints,
  selectedCity,
  selectedPoint,
  searchCity,
  searchPoint,
  handleSetCity,
  handleSetPoint,
  handleClickCities,
  handleClickPoints,
  handleChangeCities,
  handleChangeAddresses,
  handleKeyDownCity,
  handleKeyDownAddress,
}) => {
  const citiesInputRef = useRef(null);
  const pointsInputRef = useRef(null);

  return (
    <>
      <div className="content__point point">
        <div className="point__city">
          <label htmlFor="city" className="label">
            Город
          </label>
          <div className="point__search">
            <input
              ref={citiesInputRef}
              type="search"
              name="city"
              id="city"
              className="input"
              placeholder="Начните вводить город..."
              value={searchCity}
              onClick={handleClickCities}
              onChange={handleChangeCities}
            />
            {displayCities && (
              <div className="autocomplete">
                {searchCities.map((city, index) => {
                  return (
                    <div
                      className="autocomplete__item"
                      onClick={() => handleSetCity(city)}
                      key={index}
                      tabIndex="0"
                      onKeyDown={(evt) => handleKeyDownCity(evt, city)}
                    >
                      {city.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="point__address">
          <label htmlFor="address" className="label">
            Пункт выдачи
          </label>
          <div className="point__search">
            <input
              ref={pointsInputRef}
              type="search"
              name="address"
              id="address"
              className="input"
              placeholder={
                searchPoints?.length > 0
                  ? "Начните вводить пункт..."
                  : "Нет адресов"
              }
              value={searchPoint}
              onClick={handleClickPoints}
              onChange={handleChangeAddresses}
              disabled={!searchPoints && true}
            />
            {displayPoints && (
              <div className="autocomplete">
                {searchPoints?.map((point, index) => {
                  return (
                    <div
                      className="autocomplete__item"
                      onClick={() => handleSetPoint(point)}
                      onKeyDown={(evt) => handleKeyDownAddress(evt, point)}
                      key={index}
                      tabIndex="0"
                    >
                      {point.address}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="content__map map">
        <div className="map__information">Выбрать на карте:</div>
        <MapContent
          handleSetCity={handleSetCity}
          handleSetPoint={handleSetPoint}
          selectedCity={selectedCity}
          selectedPoint={selectedPoint}
          citiesData={citiesData}
          pointsData={pointsData}
        />
      </div>
    </>
  );
};

export default PointSelection;

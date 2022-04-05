import React, { useRef } from "react";
import MapContent from "./Map/MapContent";
import "./styles.scss";

const PointSelection = ({
  pointsData,
  cities,
  points,
  displayCities,
  displayPoints,
  setDisplayCities,
  setDisplayPoints,
  selectCity,
  selectPoint,
  searchCity,
  searchPoint,
  setCityOnClick,
  setPointOnClick,
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
              onClick={() => setDisplayCities(!displayCities)}
              onChange={handleChangeCities}
            />
            {displayCities && (
              <div className="autocomplete">
                {cities.map((city, index) => {
                  return (
                    <div
                      className="autocomplete__item"
                      onClick={() => setCityOnClick(city.name)}
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
                points?.length > 0 ? "Начните вводить пункт..." : "Нет адресов"
              }
              value={searchPoint}
              onClick={() => setDisplayPoints(!displayPoints)}
              onChange={handleChangeAddresses}
              disabled={!points && true}
            />
            {displayPoints && (
              <div className="autocomplete">
                {points.map((point, index) => {
                  return (
                    <div
                      className="autocomplete__item"
                      onClick={() => setPointOnClick(point.address)}
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
          setCity={setCityOnClick}
          setPoint={setPointOnClick}
          selectCity={selectCity}
          selectPoint={selectPoint}
          pointsData={pointsData}
        />
      </div>
    </>
  );
};

export default PointSelection;

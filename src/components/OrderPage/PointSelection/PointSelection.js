import React, { useEffect, useState } from "react";
import {
  getCities,
  getPoints,
  setSelectedCity,
  setSelectedPoint,
} from "../../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import MapContent from "./Map/MapContent";
import "./styles.scss";
import Autocomplete from "../../common/Autocomplete/Autocomplete";

const PointSelection = () => {
  const { citiesData, pointsData, selectedCity, selectedPoint } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const [displayCities, setDisplayCities] = useState(false);
  const [displayPoints, setDisplayPoints] = useState(false);
  const [searchCities, setSearchCities] = useState(citiesData);
  const [searchPoints, setSearchPoints] = useState(null);
  const [searchCity, setSearchCity] = useState(selectedCity?.name ?? "");
  const [searchPoint, setSearchPoint] = useState(selectedPoint?.address ?? "");

  useEffect(() => {
    dispatch(getCities());
    dispatch(getPoints());
  }, [dispatch]);

  useEffect(() => {
    setSearchCities(citiesData);
  }, [citiesData]);

  useEffect(() => {
    if (!selectedCity || !searchCity) {
      setSearchPoints(null);
      setSearchPoint("");
      dispatch(setSelectedCity(null));
      dispatch(setSelectedPoint(null));
    }
  }, [selectedCity, searchCity]);

  useEffect(() => {
    if (!searchPoint) {
      dispatch(setSelectedPoint(null));
    }
  }, [searchPoint]);

  const handleSetCity = (city) => {
    dispatch(setSelectedCity(city));
    setSearchCity(city.name);
    setDisplayCities(false);
    setSearchPoints(
      pointsData.filter((point) => point.cityId?.name === city.name)
    );
  };

  const handleSetPoint = (point) => {
    setSearchPoint(point.address);
    dispatch(setSelectedPoint(point));
    setDisplayPoints(false);
  };

  const handleClickInput = (evt) => {
    switch (evt.target.name) {
      case "city":
        {
          setDisplayPoints(false);
          setDisplayCities(!displayCities);
        }
        break;
      case "address":
        {
          setDisplayCities(false);
          setDisplayPoints(!displayPoints);
        }
        break;
    }
  };

  const handleChangeInput = (evt) => {
    console.log(evt);
    const regExpValue = new RegExp(evt.target.value, "i");
    switch (evt.target.name) {
      case "city":
        {
          setDisplayCities(true);
          setSearchCities(
            citiesData?.filter((city) => city.name.match(regExpValue))
          );
          setSearchCity(evt.target.value);
        }
        break;
      case "address":
        {
          setDisplayPoints(true);
          setSearchPoints(
            pointsData
              .filter((point) => point.cityId?.name === searchCity)
              .filter(
                (point) => point.address.match(regExpValue) && point.coordinates
              )
          );
          setSearchPoint(evt.target.value);
        }
        break;
    }
  };

  const handleBlurInput = () => {
    setTimeout(() => {
      setDisplayCities(false);
      setDisplayPoints(false);
    }, 300);
  };

  return (
    <>
      <div className="content__point point">
        <div className="point__city">
          <label htmlFor="city" className="label">
            Город
          </label>
          <div className="point__search">
            <input
              type="search"
              name="city"
              id="city"
              className="input"
              placeholder="Начните вводить город..."
              value={searchCity}
              onClick={handleClickInput}
              onBlur={handleBlurInput}
              onChange={handleChangeInput}
            />
            {displayCities && (
              <Autocomplete
                arrayData={searchCities}
                handleSet={handleSetCity}
              />
            )}
          </div>
        </div>
        <div className="point__address">
          <label htmlFor="address" className="label">
            Пункт выдачи
          </label>
          <div className="point__search">
            <input
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
              onClick={handleClickInput}
              onBlur={handleBlurInput}
              onChange={handleChangeInput}
              disabled={!searchPoints && true}
            />
            {displayPoints && (
              <Autocomplete
                arrayData={searchPoints}
                handleSet={handleSetPoint}
              />
            )}
          </div>
        </div>
      </div>
      <div className="content__map map">
        <div className="map__information">Выбрать на карте:</div>
        <MapContent
          handleSetCity={handleSetCity}
          handleSetPoint={handleSetPoint}
        />
      </div>
    </>
  );
};

export default PointSelection;

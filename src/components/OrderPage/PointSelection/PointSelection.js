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
import InputAutocomplete from "../../common/InputAutocomplete/InputAutocomplete";

const PointSelection = () => {
  const { citiesData, pointsData, selectedCity, selectedPoint } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
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
    } else {
      setSearchPoints(
        pointsData.filter((point) => point.cityId?.name === selectedCity.name)
      );
    }
  }, [selectedCity, searchCity]);

  useEffect(() => {
    if (!searchPoint) {
      dispatch(setSelectedPoint(null));
    }
  }, [searchPoint]);

  const handleSetCity = (city) => {
    setSearchCity(city.name);
    dispatch(setSelectedCity(city));
    setSearchPoint("");
  };

  const handleSetPoint = (point) => {
    setSearchPoint(point.address);
    dispatch(setSelectedPoint(point));
  };

  return (
    <>
      <div className="content__point point">
        <div className="point__city">
          <label htmlFor="city" className="label">
            Город
          </label>
          <InputAutocomplete
            name={"city"}
            placeholder={"Начните вводить город"}
            arrayData={citiesData}
            searchValues={searchCities}
            searchValue={searchCity}
            setSearchValues={setSearchCities}
            setSearchValue={setSearchCity}
            handleSet={handleSetCity}
            disabled={false}
          />
        </div>
        <div className="point__address">
          <label htmlFor="address" className="label">
            Пункт выдачи
          </label>
          <InputAutocomplete
            name={"address"}
            placeholder={
              searchPoints?.length > 0
                ? "Начните вводить пункт..."
                : "Нет адресов"
            }
            arrayData={pointsData.filter(
              (point) => point.cityId?.name === searchCity
            )}
            searchValues={searchPoints}
            searchValue={searchPoint}
            setSearchValues={setSearchPoints}
            setSearchValue={setSearchPoint}
            handleSet={handleSetPoint}
            disabled={!searchPoints && true}
          />
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

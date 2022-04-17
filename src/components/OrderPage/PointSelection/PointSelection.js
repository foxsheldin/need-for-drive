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
  const [searchArrayCities, setSearchArrayCities] = useState(
    citiesData.map((city) => city.name)
  );
  const [searchArrayPoints, setSearchArrayPoints] = useState(
    selectedCity
      ? pointsData
          .filter((point) => point.cityId?.name === selectedCity?.name)
          .map((point) => point.address)
      : null
  );

  useEffect(() => {
    dispatch(getCities());
    dispatch(getPoints());
  }, [dispatch]);

  useEffect(() => {
    setSearchArrayCities(citiesData.map((city) => city.name));
  }, [citiesData]);

  useEffect(() => {
    if (!selectedCity) {
      setSearchArrayPoints(null);
      dispatch(setSelectedCity(null));
      dispatch(setSelectedPoint(null));
    } else {
      setSearchArrayPoints(
        selectedCity
          ? pointsData
              .filter((point) => point.cityId?.name === selectedCity?.name)
              .map((point) => point.address)
          : null
      );
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedPoint) {
      dispatch(setSelectedPoint(null));
    }
  }, [selectedPoint]);

  const handleSetCity = (selectCity) => {
    if (selectCity) {
      const cityObject = citiesData.find((city) => city.name === selectCity);
      dispatch(setSelectedCity(cityObject));
    } else {
      dispatch(setSelectedCity(null));
      dispatch(setSelectedPoint(null));
    }
  };

  const handleSetPoint = (selectPoint) => {
    if (selectPoint) {
      const pointObject = pointsData
        .filter(
          (point) =>
            point.cityId?.name === selectedCity.name && point.coordinates
        )
        .find((point) => point.address === selectPoint);
      dispatch(setSelectedPoint(pointObject));
    } else {
      dispatch(setSelectedPoint(null));
    }
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
            arrayData={searchArrayCities}
            handleSet={handleSetCity}
            selectedValue={selectedCity?.name ?? null}
          />
        </div>
        <div className="point__address">
          <label htmlFor="address" className="label">
            Пункт выдачи
          </label>
          <InputAutocomplete
            name={"address"}
            placeholder={
              searchArrayPoints?.length > 0
                ? "Начните вводить пункт..."
                : "Нет адресов"
            }
            arrayData={searchArrayPoints}
            handleSet={handleSetPoint}
            selectedValue={selectedPoint?.address ?? null}
            disabled={!searchArrayPoints && true}
          />
        </div>
      </div>
      <div className="content__map map">
        <div className="map__information">Выбрать на карте:</div>
        <MapContent />
      </div>
    </>
  );
};

export default PointSelection;

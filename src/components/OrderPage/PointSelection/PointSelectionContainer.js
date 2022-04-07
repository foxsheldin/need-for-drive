import React, { useEffect, useState } from "react";
import {
  getCities,
  getPoints,
  setSelectedCity,
  setSelectedPoint,
} from "../../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import PointSelection from "./PointSelection";

const PointSelectionContainer = () => {
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
      setDisplayPoints(false);
      setSearchPoint("");
      dispatch(setSelectedCity(null));
      dispatch(setSelectedPoint(null));
      setSearchPoints(null);
    } else {
      setSearchPoints(
        pointsData.filter((point) => point.cityId?.name === selectedCity.name)
      );
    }
  }, [selectedCity, searchCity]);

  useEffect(() => {
    if (!searchPoint) {
      dispatch(setSelectedPoint(null));
      setSearchPoints(null);
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

  const handleClickCities = () => {
    setDisplayPoints(false);
    setDisplayCities(!displayCities);
  };

  const handleClickPoints = () => {
    setDisplayCities(false);
    setDisplayPoints(!displayPoints);
  };

  const handleChangeCities = (evt) => {
    setDisplayCities(true);
    const regExpValue = new RegExp(evt.target.value, "i");
    setSearchCities(citiesData?.filter((city) => city.name.match(regExpValue)));
    setSearchCity(evt.target.value);
  };
  const handleChangeAddresses = (evt) => {
    setDisplayPoints(true);
    const regExpValue = new RegExp(evt.target.value, "i");
    setSearchPoints(
      pointsData
        .filter((point) => point.cityId?.name === searchCity)
        .filter(
          (point) => point.address.match(regExpValue) && point.coordinates
        )
    );
    setSearchPoint(evt.target.value);
  };
  const handleKeyDownCity = (evt, city) => {
    if (evt.code == "Enter") handleSetCity(city);
  };
  const handleKeyDownAddress = (evt, point) => {
    if (evt.code == "Enter") handleSetPoint(point);
  };

  return (
    <PointSelection
      citiesData={citiesData}
      pointsData={pointsData}
      searchCities={searchCities}
      searchPoints={searchPoints}
      displayCities={displayCities}
      displayPoints={displayPoints}
      handleClickCities={handleClickCities}
      handleClickPoints={handleClickPoints}
      selectedCity={selectedCity}
      selectedPoint={selectedPoint}
      searchCity={searchCity}
      searchPoint={searchPoint}
      handleSetCity={handleSetCity}
      handleSetPoint={handleSetPoint}
      handleChangeCities={handleChangeCities}
      handleChangeAddresses={handleChangeAddresses}
      handleKeyDownCity={handleKeyDownCity}
      handleKeyDownAddress={handleKeyDownAddress}
    />
  );
};

export default PointSelectionContainer;

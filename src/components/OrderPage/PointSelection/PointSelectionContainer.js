import React, { useEffect, useState } from "react";
import PointSelection from "./PointSelection";
import { connect } from "react-redux";
import {
  getCities,
  getPoints,
  setSelectedCity,
  setSelectedPoint,
} from "../../../redux/order-reducer";

const PointSelectionContainer = ({
  citiesData,
  pointsData,
  getCities,
  getPoints,
  setSelectedCity,
  selectedCity,
  setSelectedPoint,
  selectedPoint,
}) => {
  const [displayCities, setDisplayCities] = useState(false);
  const [displayPoints, setDisplayPoints] = useState(false);
  const [searchCities, setSearchCities] = useState(citiesData);
  const [searchPoints, setSearchPoints] = useState(null);
  const [searchCity, setSearchCity] = useState(selectedCity?.name ?? "");
  const [searchPoint, setSearchPoint] = useState(selectedPoint?.address ?? "");

  useEffect(() => {
    getCities();
    getPoints();
  }, []);

  useEffect(() => {
    setSearchCities(citiesData);
  }, [citiesData]);

  useEffect(() => {
    if (!selectedCity || !searchCity) {
      setDisplayPoints(false);
      setSearchPoint("");
      setSelectedCity(null);
      setSelectedPoint(null);
      setSearchPoints(null);
    } else {
      setSearchPoints(
        pointsData.filter((point) => point.cityId?.name === selectedCity.name)
      );
    }
  }, [selectedCity, searchCity]);

  useEffect(() => {
    if (!searchPoint) {
      setSelectedPoint(null);
      setSearchPoints(null);
    }
  }, [searchPoint]);

  const handleSetCity = (city) => {
    setSelectedCity(city);
    setSearchCity(city.name);
    setDisplayCities(false);
    setSearchPoints(
      pointsData.filter((point) => point.cityId?.name === city.name)
    );
  };

  const handleSetPoint = (point) => {
    setSearchPoint(point.address);
    setSelectedPoint(point);
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

const mapStateToProps = (state) => ({
  citiesData: state.order.cities,
  pointsData: state.order.points,
  selectedCity: state.order.selectedCity,
  selectedPoint: state.order.selectedPoint,
});

export default connect(mapStateToProps, {
  getCities,
  getPoints,
  setSelectedCity,
  setSelectedPoint,
})(PointSelectionContainer);

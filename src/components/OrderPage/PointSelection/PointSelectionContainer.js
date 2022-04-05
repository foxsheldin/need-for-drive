import React, { useEffect, useState } from "react";
import PointSelection from "./PointSelection";
import { citiesData, pointsData } from "./constants";

const PointSelectionContainer = () => {
  const [displayCities, setDisplayCities] = useState(false);
  const [displayPoints, setDisplayPoints] = useState(false);
  const [cities, setCities] = useState(citiesData);
  const [points, setPoints] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [searchPoint, setSearchPoint] = useState("");
  const selectCity = citiesData.find((city) => city.name === searchCity);
  const selectPoint = pointsData.find(
    (point) => point.address === searchPoint && point.coordinates
  );

  useEffect(() => {
    if (!searchCity) {
      setDisplayPoints(false);
      setSearchPoint("");
      setPoints(null);
    }
  }, [searchCity]);

  const setCityOnClick = (city) => {
    setSearchCity(city);
    setDisplayCities(false);
    setPoints(pointsData.filter((point) => point.cityId?.name === city));
  };

  const setPointOnClick = (point) => {
    setSearchPoint(point);
    setDisplayPoints(false);
  };

  const handleChangeCities = (evt) => {
    setDisplayCities(true);
    setDisplayPoints(false);
    const regExpValue = new RegExp(evt.target.value, "i");
    setCities(citiesData.filter((city) => city.name.match(regExpValue)));
    setSearchCity(evt.target.value);
  };
  const handleChangeAddresses = (evt) => {
    setDisplayCities(false);
    setDisplayPoints(true);
    const regExpValue = new RegExp(evt.target.value, "i");
    setPoints(
      pointsData
        .filter((point) => point.cityId?.name === searchCity)
        .filter(
          (point) => point.address.match(regExpValue) && point.coordinates
        )
    );
    setSearchPoint(evt.target.value);
  };
  const handleKeyDownCity = (evt, city) => {
    if (evt.code == "Enter") setCityOnClick(city.name);
  };
  const handleKeyDownAddress = (evt, point) => {
    if (evt.code == "Enter") setPointOnClick(point.address);
  };

  return (
    <PointSelection
      citiesData={citiesData}
      pointsData={pointsData}
      cities={cities}
      points={points}
      displayCities={displayCities}
      displayPoints={displayPoints}
      setDisplayCities={setDisplayCities}
      setDisplayPoints={setDisplayPoints}
      selectCity={selectCity}
      selectPoint={selectPoint}
      searchCity={searchCity}
      searchPoint={searchPoint}
      setCityOnClick={setCityOnClick}
      setPointOnClick={setPointOnClick}
      handleChangeCities={handleChangeCities}
      handleChangeAddresses={handleChangeAddresses}
      handleKeyDownCity={handleKeyDownCity}
      handleKeyDownAddress={handleKeyDownAddress}
    />
  );
};

export default PointSelectionContainer;

import React, { useEffect, useMemo, useRef, useState } from "react";
import placemarkIcon from "../../../../assets/images/placemark.svg";
import "./styles.scss";
import { Map, Placemark, YMaps, ZoomControl } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getPoints,
  setSelectedCity,
  setSelectedPoint,
} from "../../../../redux/orderSlice";

const MapContent = () => {
  const dispatch = useDispatch();
  const { citiesData, pointsData, selectedCity, selectedPoint } = useSelector(
    (state) => state.order
  );
  const [centerMap, setCenterMap] = useState([54.337458, 48.382399]);
  const [pointZoom, setPointZoom] = useState(9.5);
  const mapRef = useRef();

  useEffect(() => {
    dispatch(getCities());
    dispatch(getPoints());
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const coordinates = selectedCity.coordinates;
      onSelectPoint(coordinates, 9.5);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedPoint) onSelectPoint(selectedPoint.coordinates, 15);
  }, [selectedPoint]);

  const handleClickPlacemark = (point) => {
    const cityData = citiesData.find((city) => city.name === point.cityId.name);
    dispatch(setSelectedCity(cityData));
    dispatch(setSelectedPoint(point));
  };

  const onSelectPoint = async (center, zoom) => {
    await mapRef.current?.panTo(center, {
      flying: false,
    });
    setCenterMap(center);
    setPointZoom(zoom);
  };

  const pins = useMemo(
    () =>
      pointsData
        .filter((point) => point.coordinates)
        .map((point) => {
          return (
            <Placemark
              key={point.coordinates}
              geometry={point.coordinates}
              options={{
                iconLayout: "default#image",
                iconImageHref: placemarkIcon,
                iconImageSize: [18, 18],
                iconImageOffset: [-9, -9],
              }}
              onClick={() => handleClickPlacemark(point)}
            />
          );
        }),
    [pointsData]
  );

  return (
    <div className="map__config">
      <YMaps>
        <Map
          instanceRef={mapRef}
          state={{
            center: centerMap,
            zoom: pointZoom,
          }}
          width={"100%"}
          height={"100%"}
        >
          {pins}

          <ZoomControl options={{ float: "left" }} />
        </Map>
      </YMaps>
    </div>
  );
};

export default MapContent;

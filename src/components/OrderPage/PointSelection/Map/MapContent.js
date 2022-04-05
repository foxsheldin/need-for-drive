import React, { useEffect, useMemo, useRef, useState } from "react";
import placemarkIcon from "../../../../assets/images/placemark.svg";
import "./styles.scss";
import {
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";

const MapContent = ({
  setCity,
  setPoint,
  selectCity,
  selectPoint,
  pointsData,
}) => {
  const [selectedPoint, setSelectedPoint] = useState([54.337458, 48.382399]);
  const [pointZoom, setPointZoom] = useState(9.5);
  const mapRef = useRef();

  useEffect(() => {
    if (selectCity) {
      const coordinates = selectCity.coordinates;
      onSelectPoint(coordinates, 9.5);
    }
  }, [selectCity]);

  useEffect(() => {
    if (selectPoint) onSelectPoint(selectPoint.coordinates, 15);
  }, [selectPoint]);

  const handleClickPlacemark = (point) => {
    setCity(point.cityId.name);
    setPoint(point.address);
    onSelectPoint(point.coordinates, 15.5);
  };

  const onSelectPoint = async (center, zoom) => {
    await mapRef.current.panTo(center, {
      flying: false,
    });
    await setSelectedPoint(center);
    await setSelectedPoint(null);
    await setPointZoom(zoom);
    await setPointZoom(null);
  };

  const pins = useMemo(
    () =>
      pointsData
        .filter((point) => point.coordinates)
        .map((point) => (
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
        )),
    []
  );

  return (
    <div className="map__config">
      <YMaps
        query={{
          lang: "ru_RU",
          apikey: process.env.REACT_APP_YANDEX_API_KEY,
        }}
      >
        <Map
          instanceRef={mapRef}
          state={{
            center: selectedPoint,
            zoom: pointZoom,
          }}
          width={"100%"}
          height={"100%"}
        >
          {pins}

          <GeolocationControl options={{ float: "left" }} />
          <ZoomControl options={{ float: "left" }} />
        </Map>
      </YMaps>
    </div>
  );
};

export default MapContent;

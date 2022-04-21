import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar } from "../../../../redux/orderSlice";
import plugImage from "../../../../assets/images/plugImage.jpg";
import "./styles.scss";

const CarList = ({ carsItems }) => {
  const dispatch = useDispatch();
  const { selectedCar } = useSelector((state) => state.order);
  const [currentCar, setCurrentCar] = useState(selectedCar?.id ?? null);

  useEffect(() => {
    setCurrentCar(selectedCar?.id);
  }, [selectedCar]);

  const handleSetSelectedCar = (car) => {
    dispatch(setSelectedCar(car));
  };

  return (
    <div className="car-list">
      {carsItems.map((car) => (
        <div
          className={
            currentCar === car.id
              ? "car-list__item car-list__item_active"
              : "car-list__item"
          }
          key={car.id}
          onClick={() => handleSetSelectedCar(car)}
        >
          <div className="car-name">{car.name}</div>
          <div className="car-price">
            {car.priceMin} - {car.priceMax} ₽
          </div>
          <img
            className="car-image"
            crossOrigin="anonymous"
            referrerPolicy="origin"
            src={car.thumbnail.path}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = plugImage;
            }}
            width="200"
            height="133"
            alt="car"
          />
        </div>
      ))}
    </div>
  );
};

export default CarList;

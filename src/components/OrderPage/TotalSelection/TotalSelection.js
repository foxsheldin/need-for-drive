import React from "react";
import { useSelector } from "react-redux";
import plugImage from "../../../assets/images/plugImage.jpg";
import "./styles.scss";

const TotalSelection = () => {
  const { orderId, orderStatus, selectedCar, startDateRate } = useSelector(
    (state) => state.order
  );

  let avalibaleDate = new Date(startDateRate);
  avalibaleDate =
    avalibaleDate.toLocaleDateString() +
    " " +
    avalibaleDate.toLocaleTimeString().slice(0, 5);

  const formatCarNumber = () => {
    const reg = /\d{1,}/g;
    return selectedCar?.number?.replace(reg, ` $& `).toUpperCase();
  };

  const getOrderStatusString = () => {
    switch (orderStatus?.name) {
      case "Новые":
        return "Ваш заказ обрабатывается";
      case "Подтвержденные":
        return "Ваш заказ подтвержден";
      case "Отмененые":
        return "Ваш заказ отменен";
      case "Временные ":
        return "Ваш временный заказ";
    }
  };

  return (
    <div className="total">
      <div className="total__car-info">
        {orderId && (
          <div className="order-status">{getOrderStatusString()}</div>
        )}
        <div className="car-name">{selectedCar?.name}</div>
        {selectedCar?.number && (
          <div className="car-number">{formatCarNumber()}</div>
        )}
        {selectedCar?.tank && (
          <div className="tank">
            <span className="text-bold">Топливо </span>
            {selectedCar.tank}%
          </div>
        )}
        <div className="avalibale">
          <span className="text-bold">Доступна с </span>
          {avalibaleDate}
        </div>
      </div>
      <img
        className="total__car-image"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={selectedCar?.thumbnail.path}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = plugImage;
        }}
        width="200"
        height="133"
        alt="car"
      />
    </div>
  );
};

export default TotalSelection;

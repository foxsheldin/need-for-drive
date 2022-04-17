import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./styles.scss";

const OrderItem = ({ name, value }) => {
  return (
    <div className="order__item">
      <div className="order__name-item">{name}</div>
      <div className="order__dotted" />
      <div className="order__value-item">{value}</div>
    </div>
  );
};

const OrderDetails = () => {
  const { selectedCity, selectedPoint, selectedCar } = useSelector(
    (state) => state.order
  );
  const { stepOrder } = useParams();
  const [buttonAction, setButtonAction] = useState({
    name: "",
    linkTo: "link",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (selectedCity && selectedPoint && stepOrder === "point")
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [selectedCity, selectedPoint]);

  useEffect(() => {
    if (selectedCar && stepOrder === "model") setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [selectedCar]);

  useEffect(() => {
    switch (stepOrder) {
      case "point":
        setButtonAction({
          name: "Выбрать модель",
          linkTo: "/order/model",
        });
        if (selectedCity && selectedPoint) setButtonDisabled(false);
        else setButtonDisabled(true);
        break;
      case "model":
        setButtonAction({
          name: "Дополнительно",
          linkTo: "/order/additionally",
        });
        if (selectedCar) setButtonDisabled(false);
        else setButtonDisabled(true);
        break;
    }
  }, [stepOrder]);

  return (
    <div className="content__order order">
      {selectedCity && selectedPoint && (
        <>
          <div className="order__header">Ваш заказ:</div>
          <OrderItem
            name={"Пункт выдачи"}
            value={selectedCity.name + ", " + selectedPoint.address}
          />

          {selectedCar && (
            <OrderItem name={"Модель"} value={selectedCar.name} />
          )}

          {selectedCar && (
            <div className="order__price">
              <span className="order__price-name">Цена: </span>
              <span className="order__amount-money">
                от {selectedCar.priceMin} до {selectedCar.priceMax} ₽
              </span>
            </div>
          )}
        </>
      )}

      <Link
        to={buttonAction.linkTo}
        className={
          buttonDisabled
            ? "order__action button disabled"
            : "order__action button"
        }
      >
        {buttonAction.name}
      </Link>
    </div>
  );
};

export default OrderDetails;

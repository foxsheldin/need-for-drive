import React from "react";
import { Link } from "react-router-dom";
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

const OrderDetails = ({
  selectedCity,
  selectedPoint,
  price,
  buttonAction,
  buttonDisabled,
}) => {
  return (
    <div className="content__order order">
      {selectedPoint && (
        <>
          <div className="order__header">Ваш заказ:</div>
          <OrderItem
            name={"Пункт выдачи"}
            value={selectedCity.name + ", " + selectedPoint.address}
          />
          {price && (
            <div className="order__price">
              <span className="order__price-name">Цена: </span>
              <span className="order__amount-money">от 10000 до 32000 ₽</span>
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

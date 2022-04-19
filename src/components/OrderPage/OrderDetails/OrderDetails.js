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
  const { selectedCity, selectedPoint, selectedCar, stepsOrderBreadcrumbs } =
    useSelector((state) => state.order);
  const { stepOrder } = useParams();
  const [buttonAction, setButtonAction] = useState({
    nameOrderButton: "",
    linkToNextStep: "link",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [stepsOrder, setStepsOrder] = useState(stepsOrderBreadcrumbs);

  useEffect(() => {
    setStepsOrder(stepsOrderBreadcrumbs);
  }, [stepsOrderBreadcrumbs]);

  useEffect(() => {
    switch (stepOrder) {
      case "point":
        setButtonAction({ ...stepsOrder[0] });
        setButtonDisabled(stepsOrder[0]?.disabledOrderButton);
        break;
      case "model":
        setButtonAction({ ...stepsOrder[1] });
        setButtonDisabled(stepsOrder[1]?.disabledOrderButton);
        break;
    }
  }, [stepOrder, stepsOrder]);

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
        to={buttonAction?.linkToNextStep}
        className={
          buttonDisabled
            ? "order__action button disabled"
            : "order__action button"
        }
      >
        {buttonAction?.nameOrderButton}
      </Link>
    </div>
  );
};

export default OrderDetails;

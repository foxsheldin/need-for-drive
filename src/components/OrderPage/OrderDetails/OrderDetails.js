import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  cancelOrder,
  getOrder,
  setError,
  setTotalPrice,
} from "../../../redux/orderSlice";
import { databaseAPI } from "../../../api/api";
import "./styles.scss";
import { generateMoneyAndTimeInfo } from "./utils/generate-money-and-time-info";
import { useGenerateButtonActions } from "./hooks/use-generate-button-actions";

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
  const dispatch = useDispatch();
  const {
    orderId,
    selectedCity,
    selectedPoint,
    selectedCar,
    selectedColor,
    startDateRate,
    endDateRate,
    selectedRate,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    totalPrice,
    stepsOrderBreadcrumbs,
  } = useSelector((state) => state.order);
  const { stepOrder } = useParams();
  const [displayConfirmOrder, setDisplayConfirmOrder] = useState(false);
  const [countTimeRate, setCountTimeRate] = useState(null);
  const [price, setPrice] = useState(totalPrice);
  const navigate = useNavigate();

  const setTotalPriceRate = () => {
    if (startDateRate && endDateRate) {
      const { amountMoney, timeText } = generateMoneyAndTimeInfo({
        selectedCar,
        selectedRate,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
        startDateRate,
        endDateRate,
      });

      if (selectedRate) dispatch(setTotalPrice(amountMoney));
      else dispatch(setTotalPrice(null));

      setCountTimeRate(timeText);
    } else {
      setCountTimeRate(null);
      dispatch(setTotalPrice(null));
    }
  };

  useEffect(() => {
    setTotalPriceRate();
  }, [
    startDateRate,
    endDateRate,
    selectedRate,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  ]);

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice]);

  const handleOrderClick = () => {
    setDisplayConfirmOrder(!displayConfirmOrder);
  };

  const { buttonAction, buttonDisabled } = useGenerateButtonActions({
    handleOrderClick,
    stepOrder,
    stepsOrderBreadcrumbs,
    selectedCar,
    selectedColor,
  });

  const handleConfirmOrderClick = async () => {
    if (!orderId) {
      const response = await databaseAPI.createOrder(
        selectedCity,
        selectedPoint,
        selectedCar,
        selectedColor,
        startDateRate,
        endDateRate,
        selectedRate,
        totalPrice,
        isFullTank,
        isNeedChildChair,
        isRightWheel
      );

      if (response.status !== 200) dispatch(setError("Ошибка создания заказа"));

      navigate(`/order/confirm/${response.data.data.id}`);
    } else {
      dispatch(cancelOrder(orderId));
      dispatch(getOrder(orderId));
    }
    setDisplayConfirmOrder(false);
  };

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
          {selectedColor && <OrderItem name={"Цвет"} value={selectedColor} />}
          {countTimeRate && (
            <OrderItem name={"Длительность аренды"} value={countTimeRate} />
          )}
          {selectedRate && (
            <OrderItem name={"Тариф"} value={selectedRate.rateTypeId.name} />
          )}
          {isFullTank.value && (
            <OrderItem name={isFullTank.name} value={"Есть"} />
          )}
          {isNeedChildChair.value && (
            <OrderItem name={isNeedChildChair.name} value={"Есть"} />
          )}
          {isRightWheel.value && (
            <OrderItem name={isRightWheel.name} value={"Есть"} />
          )}

          {selectedCar && !price ? (
            <div className="order__price">
              <span className="order__price-name">Цена: </span>
              <span className="order__amount-money">
                от {selectedCar.priceMin} до {selectedCar.priceMax} ₽
              </span>
            </div>
          ) : price ? (
            <div className="order__price">
              <span className="order__price-name">Цена: </span>
              <span className="order__amount-money">{price}₽</span>
            </div>
          ) : null}
        </>
      )}

      <Link
        to={buttonAction?.linkToNextStep}
        className={
          buttonDisabled
            ? "order__action button disabled"
            : buttonAction?.styleButton
            ? "order__action button " + buttonAction?.styleButton
            : "order__action button"
        }
        onClick={buttonAction?.onClick}
      >
        {buttonAction?.nameOrderButton}
      </Link>

      {displayConfirmOrder && (
        <div className="confirm-order">
          <div className="confirm-order__label">
            {orderId ? "Отменить заказ" : "Подтвердить заказ"}
          </div>
          <div className="confirm-order__actions">
            <button className="button" onClick={handleConfirmOrderClick}>
              Подтвердить
            </button>
            <button className="button button_orange" onClick={handleOrderClick}>
              Вернуться
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;

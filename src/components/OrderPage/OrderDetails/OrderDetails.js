import React from "react";
import "./styles.scss";

const OrderDetails = () => {
  return (
    <div className="content__order order">
      <div className="order__header">Ваш заказ:</div>
      <div className="order__list">
        <div className="order__item">
          <div className="order__name-item">Пункт выдачи</div>
          <div className="order__dotted" />
          <div className="order__value-item">
            Ульяновск,
            <br />
            Нариманова 42
          </div>
        </div>
        <div className="order__item">
          <div className="order__name-item">Модель</div>
          <div className="order__dotted" />
          <div className="order__value-item">Hyndai I30 N</div>
        </div>
      </div>
      <div className="order__price">
        <span className="order__price-name">Цена: </span>
        <span className="order__amount-money">от 10000 до 32000 ₽</span>
      </div>
      <a href="#" className="order__action button">
        Выбрать модель
      </a>
    </div>
  );
};

export default OrderDetails;

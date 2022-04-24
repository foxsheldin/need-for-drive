import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFullTank,
  setNeedChildChair,
  setRightWheel,
  setSelectedColor,
  setSelectedRate,
  getRates,
} from "../../../redux/orderSlice";
import Radiobutton from "../../common/Radiobutton/Radiobutton";
import Rental from "./Rental/Rental";
import Checkbox from "../../common/Checkbox/Checkbox";

const AdditionallySelection = () => {
  const dispatch = useDispatch();
  const {
    ratesData,
    selectedCar,
    selectedColor,
    selectedRate,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  } = useSelector((state) => state.order);
  const [rates, setRates] = useState(ratesData ?? null);
  const [additionallyServiceData, setAdditionallyServiceData] = useState([
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  ]);
  const colors = selectedCar ? ["Любой", ...selectedCar.colors] : null;

  useEffect(() => {
    dispatch(getRates());
  }, []);

  useEffect(() => {
    setRates(ratesData);
    if (!selectedColor) dispatch(setSelectedColor("Любой"));
    if (!selectedRate) dispatch(setSelectedRate(ratesData[0]));
  }, [ratesData]);

  useEffect(() => {
    setAdditionallyServiceData([isFullTank, isNeedChildChair, isRightWheel]);
  }, [isFullTank, isNeedChildChair, isRightWheel]);

  const handleChangeAddService = (item) => {
    switch (item.name) {
      case isFullTank.name:
        dispatch(setFullTank(!item.value));
        break;
      case isNeedChildChair.name:
        dispatch(setNeedChildChair(!item.value));
        break;
      case isRightWheel.name:
        dispatch(setRightWheel(!item.value));
        break;
    }
  };

  return (
    <>
      <div className="color-car">
        <label className="label">Цвет</label>
        <ul className="radio-list">
          {colors?.map((color, index) => (
            <Radiobutton
              name={color}
              nameInput={"color"}
              textLabel={color}
              onClick={() => dispatch(setSelectedColor(color))}
              compare={selectedColor ?? "Любой"}
              key={index}
            />
          ))}
        </ul>
      </div>
      <Rental />
      <div className="rate">
        <label className="label">Тариф</label>
        <ul className="radio-list">
          {rates.map((rate) => (
            <Radiobutton
              name={rate.rateTypeId.unit}
              textLabel={
                rate.rateTypeId.name +
                ", " +
                rate.price +
                "₽/" +
                rate.rateTypeId.unit
              }
              nameInput={"rate"}
              onClick={() => dispatch(setSelectedRate(rate))}
              compare={
                selectedRate?.rateTypeId.unit ?? ratesData[0].rateTypeId.unit
              }
              key={rate.id}
            />
          ))}
        </ul>
      </div>
      <div className="add-service">
        <label className="label">Доп услуги</label>
        <ul className="checkbox-list">
          {additionallyServiceData.map((item, index) => (
            <Checkbox
              id={item.name}
              onChange={() => handleChangeAddService(item)}
              checked={item.value}
              textLabel={item.name + ", " + item.price + "₽"}
              key={index}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdditionallySelection;

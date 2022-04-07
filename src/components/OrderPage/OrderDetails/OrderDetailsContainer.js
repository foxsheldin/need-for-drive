import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import OrderDetails from "./OrderDetails";

const OrderDetailsContainer = ({ selectedCity, selectedPoint }) => {
  const { stepOrder } = useParams();
  const [buttonAction, setButtonAction] = useState({
    name: "",
    linkTo: "link",
  });
  const [price, setPrice] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (selectedCity && selectedPoint) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [selectedCity, selectedPoint]);

  useEffect(() => {
    switch (stepOrder) {
      case "point":
        setButtonAction({
          name: "Выбрать модель",
          linkTo: "/order/model",
        });
        break;
      case "model":
        setButtonAction({
          name: "Дополнительно",
          linkTo: "/order/additionally",
        });
        break;
    }
  }, [stepOrder]);

  return (
    <OrderDetails
      selectedCity={selectedCity}
      selectedPoint={selectedPoint}
      price={price}
      buttonAction={buttonAction}
      buttonDisabled={buttonDisabled}
    />
  );
};

const mapStateToProps = (state) => ({
  selectedCity: state.order.selectedCity,
  selectedPoint: state.order.selectedPoint,
});

export default connect(mapStateToProps)(OrderDetailsContainer);

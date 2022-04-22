import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedColor } from "../../../../redux/orderSlice";

export function useGenerateButtonActions({
  handleOrderClick,
  stepOrder,
  stepsOrderBreadcrumbs,
  selectedCar,
  selectedColor,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const regexOrderConfirm = new RegExp("order/confirm", "g");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonAction, setButtonAction] = useState({
    nameOrderButton: "",
    linkToNextStep: "link",
  });
  useEffect(() => {
    switch (stepOrder) {
      case "point":
        setButtonAction({ ...stepsOrderBreadcrumbs[0] });
        setButtonDisabled(stepsOrderBreadcrumbs[0]?.disabledOrderButton);
        break;
      case "model":
        setButtonAction({ ...stepsOrderBreadcrumbs[1] });
        setButtonDisabled(stepsOrderBreadcrumbs[1]?.disabledOrderButton);
        break;
      case "additionally":
        setButtonAction({ ...stepsOrderBreadcrumbs[2] });
        setButtonDisabled(stepsOrderBreadcrumbs[2]?.disabledOrderButton);
        break;
      case "total":
        if (selectedColor === "Любой" && selectedCar.colors.length) {
          const colors = selectedCar.colors;
          dispatch(
            setSelectedColor(colors[Math.floor(Math.random() * colors.length)])
          );
        }
        setButtonAction({
          nameOrderButton: "Заказать",
          linkToNextStep: "#",
          onClick: handleOrderClick,
          disabledOrderButton: false,
        });
        break;
      default: {
        if (location.pathname.match(regexOrderConfirm)) {
          setButtonAction({
            nameOrderButton: "Отменить",
            linkToNextStep: "#",
            onClick: handleOrderClick,
            styleButton: "button_orange",
            disabledOrderButton: false,
          });
          setButtonDisabled(stepsOrderBreadcrumbs[3]?.disabledOrderButton);
        }
      }
    }
  }, [stepOrder, stepsOrderBreadcrumbs]);

  return { buttonDisabled, buttonAction };
}

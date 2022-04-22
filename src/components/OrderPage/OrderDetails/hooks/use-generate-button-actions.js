import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useGenerateButtonActions({
  handleOrderClick,
  stepOrder,
  stepsOrderBreadcrumbs,
}) {
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

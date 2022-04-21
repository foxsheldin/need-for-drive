import { useEffect, useState } from "react";

export function useGenerateButtonActions({ stepOrder, stepsOrderBreadcrumbs }) {
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
    }
  }, [stepOrder, stepsOrderBreadcrumbs]);

  return { buttonDisabled, buttonAction };
}

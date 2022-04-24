export const generateMoneyAndTimeInfo = ({
  selectedCar,
  selectedRate,
  isFullTank,
  isNeedChildChair,
  isRightWheel,
  endDateRate,
  startDateRate,
}) => {
  let timeText = "";
  let minutes = Math.ceil(Math.abs(endDateRate - startDateRate) / (1000 * 60));
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let amountMoney = selectedCar.priceMin;

  if (selectedRate) {
    switch (selectedRate.rateTypeId.unit) {
      case "мин":
        amountMoney += minutes * selectedRate.price;
        break;
      case "сутки":
        amountMoney += Math.ceil(minutes / (60 * 24)) * selectedRate.price;
        break;
      case "7 дней":
        amountMoney += Math.ceil(minutes / (60 * 24 * 7)) * selectedRate.price;
        break;
      case "30 дней":
        amountMoney += Math.ceil(minutes / (60 * 24 * 30)) * selectedRate.price;
        break;
      case "90 дней":
        amountMoney += Math.ceil(minutes / (60 * 24 * 90)) * selectedRate.price;
        break;
      case "365 дней":
        amountMoney +=
          Math.ceil(minutes / (60 * 24 * 365)) * selectedRate.price;
        break;
    }
    if (isFullTank.value) amountMoney += isFullTank.price;
    if (isNeedChildChair.value) amountMoney += isNeedChildChair.price;
    if (isRightWheel.value) amountMoney += isRightWheel.price;
  }

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  if (days !== 0) timeText += days + "д ";
  if (hours !== 0) timeText += hours + "ч ";
  if (minutes !== 0) timeText += minutes + "мин";
  return { amountMoney, timeText };
};

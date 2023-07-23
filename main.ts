const rangeValues: string[] = ["10K", "50K", "100K", "500K", "1M"];

const inputRange = document.getElementById(
  "inputRange"
) as HTMLInputElement | null;
const outputRange = document.getElementById(
  "outputRange"
) as HTMLSpanElement | null;

if (inputRange && outputRange) {
  const changeRangeSliderSize = () => {
    const maxVal = +inputRange.max;
    const actualVal = +inputRange.value;

    const newRangeSize = (actualVal / maxVal) * 100;

    inputRange.style.backgroundSize = `${newRangeSize}% 100%`;
  };

  const inputChangeHandler = () => {
    const newValue = +inputRange.value;
    outputRange.innerHTML = rangeValues[newValue];

    changeRangeSliderSize();
  };

  inputRange.addEventListener("input", inputChangeHandler);

  inputRange.value = Math.floor(+inputRange.max / 2).toString();
}

interface IData {
  views: string;
  price: number;
}

const rawData: IData[] = [
  { views: "10K", price: 8 },
  { views: "50K", price: 12 },
  { views: "100K", price: 16 },
  { views: "500K", price: 24 },
  { views: "1M", price: 36 },
];

const discountInPercent = 25;

const updatedData = rawData.map((obj) => ({
  ...obj,
  pricePerYear: obj.price - obj.price * (discountInPercent / 100),
}));

const viewsRangeInputElement = document.getElementById(
  "viewsRangeInput"
) as HTMLInputElement | null;
const pageViewsElement = document.getElementById(
  "pageViews"
) as HTMLSpanElement | null;
const displayPriceElement = document.getElementById(
  "displayPrice"
) as HTMLSpanElement | null;
const yearlySubCheckElement = document.getElementById(
  "yearlySubCheck"
) as HTMLInputElement | null;
const discountPercentSpan = document.getElementById(
  "discountPercent"
) as HTMLSpanElement | null;

function displayPrice(rangeValue: number) {
  const checked = yearlySubCheckElement?.checked;

  const price = checked
    ? updatedData[rangeValue].pricePerYear
    : updatedData[rangeValue].price;

  if (displayPriceElement) {
    displayPriceElement.innerHTML = "$" + price.toFixed(2);
  }
}

yearlySubCheckElement?.addEventListener("change", function (event) {
  const rangeValue = viewsRangeInputElement && +viewsRangeInputElement.value;

  if (rangeValue != null) {
    displayPrice(rangeValue);
  }
});

viewsRangeInputElement?.addEventListener("input", function (event) {
  const target = event.target as HTMLInputElement | null;

  if (target && pageViewsElement && displayPriceElement) {
    const value = +target.value;
    const max = +target.max;

    const bgSize = (value / max) * 100;

    pageViewsElement.innerHTML = updatedData[value].views;
    target.style.backgroundSize = `${bgSize}% 100%`;

    displayPrice(value);
  }
});

// setup default values
if (viewsRangeInputElement)
  viewsRangeInputElement.value = Math.floor(
    +viewsRangeInputElement.max / 2
  ).toString();

if (yearlySubCheckElement) yearlySubCheckElement.checked = false;

if (discountPercentSpan)
  discountPercentSpan.innerHTML = `-${discountInPercent}%`;

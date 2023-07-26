"use strict";
const rawData = [
    { views: "10K", price: 8 },
    { views: "50K", price: 12 },
    { views: "100K", price: 16 },
    { views: "500K", price: 24 },
    { views: "1M", price: 36 },
];
const discountInPercent = 25;
const updatedData = rawData.map((obj) => (Object.assign(Object.assign({}, obj), { pricePerYear: obj.price - obj.price * (discountInPercent / 100) })));
const viewsRangeInputElement = document.getElementById("viewsRangeInput");
const pageViewsElement = document.getElementById("pageViews");
const displayPriceElement = document.getElementById("displayPrice");
const yearlySubCheckElement = document.getElementById("yearlySubCheck");
const discountPercentSpan = document.getElementById("discountPercent");
function displayPrice(rangeValue) {
    const checked = yearlySubCheckElement === null || yearlySubCheckElement === void 0 ? void 0 : yearlySubCheckElement.checked;
    const price = checked
        ? updatedData[rangeValue].pricePerYear
        : updatedData[rangeValue].price;
    if (displayPriceElement) {
        displayPriceElement.innerHTML = "$" + price.toFixed(2);
    }
}
yearlySubCheckElement === null || yearlySubCheckElement === void 0 ? void 0 : yearlySubCheckElement.addEventListener("change", function (event) {
    const rangeValue = viewsRangeInputElement && +viewsRangeInputElement.value;
    if (rangeValue != null) {
        displayPrice(rangeValue);
    }
});
viewsRangeInputElement === null || viewsRangeInputElement === void 0 ? void 0 : viewsRangeInputElement.addEventListener("input", function (event) {
    const target = event.target;
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
    viewsRangeInputElement.value = Math.floor(+viewsRangeInputElement.max / 2).toString();
if (yearlySubCheckElement)
    yearlySubCheckElement.checked = false;
if (discountPercentSpan)
    discountPercentSpan.innerHTML = `-${discountInPercent}%`;

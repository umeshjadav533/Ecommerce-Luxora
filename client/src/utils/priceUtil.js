const calculatePrice = (mrpPrice, discountPercentage) => {
  const discountAmount = (mrpPrice * discountPercentage) / 100;
  const finalPrice = mrpPrice - discountAmount;
  return Math.round(finalPrice); // round off
};

export default calculatePrice;
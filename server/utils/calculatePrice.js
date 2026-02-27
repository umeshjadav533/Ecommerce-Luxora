const calculatePrice = (mrpPrice, discountPercentage) => {
  const discountAmount = (mrpPrice * discountPercentage) / 100;

  return Math.round(mrpPrice - discountAmount);
};

export default calculatePrice;

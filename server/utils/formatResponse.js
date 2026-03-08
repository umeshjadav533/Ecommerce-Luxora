import calculatePrice from "./calculatePrice.js";

const formatResponse = (field) => {
  return field.map((item) => {

    // find variant
    const variantObj = item.product?.variants?.find(
      (v) => v?.color?.toLowerCase() === item?.variant?.toLowerCase()
    ) || null;

    // find size
    const sizeObj = variantObj?.sizes?.find(
      (s) => s?.size?.toLowerCase() === item?.size?.toLowerCase()
    ) || null;

    const mrpPrice = variantObj?.mrpPrice || 0;
    const discountPercentage = variantObj?.discountPercentage || 0;

    return {
      productId: item.product?._id,
      title: item.product?.title,
      brand: item.product?.brand,
      rating: item.product?.rating,

      quantity: item.quantity,

      variant: variantObj?.color || null,

      image:
        variantObj?.images?.[0] ||
        item.product?.images?.[0] ||
        null,

      size: sizeObj?.size || null,

      stock:
        sizeObj?.stock ||
        variantObj?.stock ||
        0,

      mrpPrice,
      discountPercentage,

      price: calculatePrice(
        mrpPrice,
        discountPercentage
      ),
    };
  });
};

export default formatResponse
import calculatePrice from "./calculatePrice.js";

const formatCartResponse = (cart) => {
    return cart.map((item) => {

        const variantObj = item.product?.variants?.find(
            v => v.color?.name === item.variant
        ) || null;

        const sizeObj = variantObj?.sizes?.find(
            s => s.size === item.size
        ) || null;

        return {
            productId: item.product?._id,
            title: item.product?.title,
            brand: item.product?.brand,
            mrpPrice: item.product?.mrpPrice,
            discountPercentage: item.product?.discountPercentage,
            rating: item.product?.rating,
            quantity: item.quantity,

            variant: variantObj.color.name,
            image: variantObj?.images?.[0] || item.product?.images?.[0] || null,

            size: sizeObj?.size || null,
            stock: variantObj?.sizes?.find(
                s => s.size.toLowerCase() === item.size.toLowerCase()
            )?.stock || variantObj?.stock || 0,

            price: calculatePrice(
                item.product?.mrpPrice,
                item.product?.discountPercentage
            )
        };
    });
};

export default formatCartResponse;
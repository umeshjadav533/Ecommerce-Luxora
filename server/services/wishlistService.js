import User from "../models/userModel.js";

export const getPopulatedWishlist = async (id) => {
    return await User.findById(id).populate({
        path: "wishlist.product",
        select: "title brand mrpPrice discountPercentage rating variants tags"
    });
}
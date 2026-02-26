import User from '../models/userModel.js'

const getPopulatedCart = async (id) => {
    return await User.findById(id).populate({
        path: "cart.product",
        select: "title brand mrpPrice discountPercentage rating variants tags"
    });
}

export default getPopulatedCart;
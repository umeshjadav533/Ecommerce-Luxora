import User from '../models/userModel.js'

const getPopulatedUser = async (populateField, id) => {
    return await User.findById(id).populate({
        path: populateField,
        select: "title brand mrpPrice discountPercentage rating variants tags"
    });
}

export default getPopulatedUser;
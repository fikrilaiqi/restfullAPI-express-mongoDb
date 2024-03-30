import userSchema from "../schemas/userSchema.js";
import utils from "../utils/index.js";

const profile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await userSchema.findById(userId, "-password");

        if (!profile) {
            return utils.handlerResponse(res, "NOT_FOUND", {
                message: "User Not Found!",
            });
        }

        return utils.handlerResponse(res, "OK", {
            message: "Get Profile Data by user Id success!",
            data: profile,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

export default { profile };

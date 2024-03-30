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

const editProfile = async (req, res) => {
    try {
        const input = req.body;
        const file = req.files;
        const userId = req.authData._id;

        const existUser = await userSchema.findById(userId);
        if (!existUser) {
            return utils.handlerResponse(res, "NOT_FOUND", {
                message: "User Not Found!",
            });
        }

        if (existUser.toObject().image && !input.old_image) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: "Found image file, old_image is required!",
            });
        }

        const { fileName, error: errFileUpload } = utils.processUploadFile(
            file?.image,
            input?.old_image
        );
        if (errFileUpload) {
            throw Error(errFileUpload);
        }

        const updateUserObj = { ...input, image: fileName };
        await userSchema.findByIdAndUpdate(
            { _id: userId },
            { $set: updateUserObj }
        );

        return utils.handlerResponse(res, "OK", {
            message: "Edit profile success!",
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

export default { profile, editProfile };

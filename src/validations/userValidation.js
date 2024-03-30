import utils from "../utils/index.js";
import joi from "joi";

const editProfile = async (req, res, next) => {
    const input = req.body;
    const schema = joi.object({
        fullname: joi.string(),
        old_image: joi.string(),
        image: joi.allow(),
    });

    return utils.validationInput(req, res, next, schema, input);
};

export default { editProfile };

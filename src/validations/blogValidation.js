import joi from "joi";
import utils from "../utils/index.js";

const create = async (req, res, next) => {
    const input = req.body;
    const schema = joi.object({
        content: joi.string().required(),
        tags: joi.string(),
        title: joi.string().required(),
        thumbnail: joi.allow(),
    });

    return utils.validationInput(req, res, next, schema, input);
};

const editById = async (req, res, next) => {
    const input = req.body;
    const schema = joi.object({
        content: joi.string(),
        tags: joi.string(),
        title: joi.string(),
        old_thumbnail: joi.string(),
        thumbnail: joi.allow(),
    });

    return utils.validationInput(req, res, next, schema, input);
};

export default { create, editById };

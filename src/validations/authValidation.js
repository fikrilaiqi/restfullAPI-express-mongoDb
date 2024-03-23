import joi from "joi";
import utils from "../utils/index.js";

const register = (req, res, next) => {
    const input = req.body;
    const schema = joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(8).required(),
        fullname: joi.string().min(6).required(),
    });

    return utils.validationInput(req, res, next, schema, input);
};

const login = (req, res, next) => {
    const input = req.body;
    const schema = joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(8).required(),
    });

    return utils.validationInput(req, res, next, schema, input);
};

export default { register, login };

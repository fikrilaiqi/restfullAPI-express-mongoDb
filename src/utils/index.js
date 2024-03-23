import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const getEnv = (name = "") => {
    dotenv.config();
    return process.env[`${name}`];
};

const getHttpCodeResponse = (type = "") => {
    switch (type) {
        case "OK":
            return { code: 200, status: "success" };
        case "CREATED":
            return { code: 201, status: "success" };
        case "BAD_REQUEST":
            return { code: 400, status: "error" };
        case "UNAUTHORIZED":
            return { code: 401, status: "error" };
        case "INTERNAL_ERROR":
            return {
                code: 500,
                status: "error",
                message: "internal server error",
            };
        default:
            return {
                code: 500,
                status: "error",
                message: "internal server error",
            };
    }
};

const handlerResponse = (res, type = "", additionData = {}) => {
    const httpCodeResponse = getHttpCodeResponse(type);
    return res
        .status(httpCodeResponse.code)
        .json({
            ...httpCodeResponse,
            ...additionData,
        })
        .end();
};

const validationInput = (req, res, next, joiSchema, input) => {
    try {
        if (!joiSchema || !input) {
            throw Error("Schema and input is required!");
        }
        const { error } = joiSchema.validate(input);
        if (error) {
            throw Error(error.details.at(0).message);
        }
        next();
    } catch (error) {
        return handlerResponse(res, `BAD_REQUEST`, {
            message: `validation Error: ${error}`,
        });
    }
};

const createToken = (payload = {}) => {
    const secret = getEnv("JWT_SECRET");
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

export default { handlerResponse, validationInput, getEnv, createToken };

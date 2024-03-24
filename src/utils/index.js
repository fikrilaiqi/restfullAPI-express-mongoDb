import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fs from "fs";

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
        case "NOT_FOUND":
            return { code: 404, status: "error" };
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

const toUploadFile = (file) => {
    let result = { fileName: null };
    try {
        if (!file) return { ...result, error: "Not Found File Upload!" };
        const originName = file.name;
        const unixTimestime = Math.round(Date.now());
        const rename = `${unixTimestime}-${originName}`;
        fs.writeFileSync(`./uploads/${rename}`, file.data);
        return { ...result, fileName: rename };
    } catch (error) {
        return { ...result, error: error.message };
    }
};

const processUploadFile = (file, oldFileName) => {
    let result = { fileName: null };
    try {
        if (oldFileName) {
            fs.unlinkSync(`./uploads/${oldFileName}`);
        }
        if (file) {
            result = toUploadFile(file);
        }
        return result;
    } catch (error) {
        return { ...result, error: error.message };
    }
};

export default {
    handlerResponse,
    validationInput,
    getEnv,
    createToken,
    processUploadFile,
};

import utils from "../utils/index.js";
import bcrypt from "bcrypt";
import userSchema from "../schemas/userSchema.js";

const register = async (req, res) => {
    try {
        const input = req.body;
        const existUser = await userSchema.findOne({
            username: input.username,
        });
        if (existUser) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: `User is exist, get to Login!`,
            });
        }
        const hashPassword = await bcrypt.hash(input.password, 10);
        const registerUser = {
            ...input,
            password: hashPassword,
        };
        await userSchema.create(registerUser);
        return utils.handlerResponse(res, "CREATED", {
            message: `Register User Success!`,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

const login = async (req, res) => {
    try {
        const input = req.body;
        const existUser = await userSchema.findOne({
            username: input.username,
        });

        if (!existUser) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: `User not found!`,
            });
        }

        const { password: passUser, _id, ...rest } = existUser.toObject();
        const isValid = await bcrypt.compare(input.password, passUser);
        if (!isValid) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: `Password Invalid!`,
            });
        }
        const token = utils.createToken({ _id, ...rest });
        return utils.handlerResponse(res, "OK", {
            message: "Login Success!",
            data: { token },
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { _id, ...rest } = req.authData;
        const existUser = await userSchema.findOne(
            {
                _id,
            },
            "-password"
        );
        if (!existUser) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: `User not found!`,
            });
        }
        const token = utils.createToken({
            _id: existUser._id,
            ...existUser.toObject(),
        });
        return utils.handlerResponse(res, "OK", {
            message: "Refresh Token Success!",
            data: { token },
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

export default { register, login, refreshToken };

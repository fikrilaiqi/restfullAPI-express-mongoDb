import { Router, response } from "express";
import joi from "joi";
import bcrypt from "bcrypt";
import userSchema from "./schemas/userSchema.js";

const router = Router();

//Auth
router.post(
    "/auth/register",
    (req, res, next) => {
        try {
            const input = req.body;
            const schema = joi.object({
                username: joi.string().min(6).required(),
                password: joi.string().min(8).required(),
                fullname: joi.string().min(6).required(),
            });

            const { error } = schema.validate(input);
            const errorValidation = error;
            if (error) {
                return res
                    .status(400)
                    .json({
                        status: "error",
                        message: errorValidation.details.at(0).message,
                        code: 400,
                    })
                    .end();
            }
            next();
        } catch (error) {
            return res
                .status(400)
                .json({
                    status: "error",
                    message: `Validation Error : ${error}`,
                    code: 400,
                })
                .end();
        }
    },
    async (req, res) => {
        try {
            const input = req.body;
            const existUser = await userSchema.findOne({
                username: input.username,
            });
            if (existUser) {
                return res
                    .status(400)
                    .json({
                        status: "error",
                        message: `User is exist, get to Login!`,
                        code: 400,
                    })
                    .end();
            }
            const hashPassword = await bcrypt.hash(input.password, 10);
            const registerUser = {
                ...input,
                password: hashPassword,
            };

            await userSchema.create(registerUser);
            return res
                .status(201)
                .json({
                    status: "success",
                    message: `Register User Success!`,
                    code: 201,
                })
                .end();
        } catch (error) {
            return res
                .status(500)
                .json({
                    status: "error",
                    message: error?.message || error || `Internal Server Error`,
                    code: 500,
                })
                .end();
        }
    }
);

export default router;

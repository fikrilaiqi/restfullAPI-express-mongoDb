import jwt from "jsonwebtoken";
import utils from "../utils/index.js";
export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization") || "";
        const token = authHeader && authHeader.split(" ").at(1);
        if (!token) {
            throw Error("Access Denied!");
        }
        const verified = jwt.verify(token, utils.getEnv("JWT_SECRET"));
        if (!verified) {
            throw Error("Invalid Token!");
        }
        req.authData = verified;
        next();
    } catch (error) {
        return utils.handlerResponse(res, "UNAUTHORIZED", {
            message: error.message || "Exprired TOken!",
        });
    }
};

import { Router } from "express";
import authValidation from "./validations/authValidation.js";
import authController from "./controllers/authController.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import blogController from "./controllers/blogController.js";

const router = Router();

//Auth
router.post(
    "/auth/register",
    //middleware route
    authValidation.register,
    //controller
    authController.register
);
router.post("/auth/login", authValidation.login, authController.login);
router.get("/auth/refresh-token", checkAuth, authController.refreshToken);

//Blog
router.get("/blog/all", blogController.getAll);

export default router;

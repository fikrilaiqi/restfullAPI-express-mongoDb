import { Router } from "express";
import authValidation from "./validations/authValidation.js";
import authController from "./controllers/authController.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import blogController from "./controllers/blogController.js";
import blogValidation from "./validations/blogValidation.js";

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
router.post(
    "/blog/create",
    checkAuth,
    blogValidation.create,
    blogController.create
);
router.get("/blog/:id", blogController.getById);
router.patch(
    "/blog/edit/:id",
    checkAuth,
    blogValidation.editById,
    blogController.editById
);

export default router;

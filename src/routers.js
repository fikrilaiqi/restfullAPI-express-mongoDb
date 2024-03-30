import { Router } from "express";
import authValidation from "./validations/authValidation.js";
import authController from "./controllers/authController.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import blogController from "./controllers/blogController.js";
import blogValidation from "./validations/blogValidation.js";
import bookmarkController from "./controllers/bookmarkController.js";
import userController from "./controllers/userController.js";
import userValidation from "./validations/userValidation.js";

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
router.delete("/blog/delete/:id", checkAuth, blogController.deleteById);
router.get("/blog/history/:authorId", blogController.historyByAuthorId);

//bookmark
router.post("/bookmark/create", checkAuth, bookmarkController.create);
router.get(
    "/bookmark/history-user/:blogId",
    checkAuth,
    bookmarkController.historyUserByBlogId
);
router.get("/bookmark/history/:userId", bookmarkController.historyByUserId);
router.delete(
    "/bookmark/delete/:blogId",
    checkAuth,
    bookmarkController.deleteByBlogId
);

//user
router.get("/user/:userId", userController.profile);
router.patch(
    "/user/profile/edit",
    checkAuth,
    userValidation.editProfile,
    userController.editProfile
);

export default router;

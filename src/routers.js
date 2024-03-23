import { Router } from "express";
import authValidation from "./validations/authValidation.js";
import authController from "./controllers/authController.js";

const router = Router();

//Auth
router.post(
    "/auth/register",
    //middleware route
    authValidation.register,
    //controller
    authController.register
);

export default router;

import { Router } from "express";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { signUpSchema, resendOTPSchema, verifyOTPSchema, logInSchema } from "./auth.schema.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as ctrl from "./auth.controller.js";

const authRouter: Router = Router();

authRouter.post('/signup', validationMiddleware(signUpSchema), asyncHandler(ctrl.signUpController));
authRouter.post('/resend-otp', validationMiddleware(resendOTPSchema), asyncHandler(ctrl.resendOTPController));
authRouter.post('/verify-otp', validationMiddleware(verifyOTPSchema), asyncHandler(ctrl.verifyOTPController));
authRouter.post('/login', validationMiddleware(logInSchema), asyncHandler(ctrl.LogInController));

export default authRouter;
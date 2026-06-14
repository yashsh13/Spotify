import { Router } from "express";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { signUpSchema, resendOTPSchema, verifyOTPSchema, logInSchema, forgotPasswordSchema, resetPasswordSchema } from "./auth.schema.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as ctrl from "./auth.controller.js";

const authRouter: Router = Router();

authRouter.post('/signup', validationMiddleware(signUpSchema), asyncHandler(ctrl.signUpController));
authRouter.post('/resend-otp', validationMiddleware(resendOTPSchema), asyncHandler(ctrl.resendOTPController));
authRouter.post('/verify-otp', validationMiddleware(verifyOTPSchema), asyncHandler(ctrl.verifyOTPController));
authRouter.post('/login', validationMiddleware(logInSchema), asyncHandler(ctrl.logInController));
authRouter.post('/refresh', asyncHandler(ctrl.refreshController));
authRouter.post('/forgot-password', validationMiddleware(forgotPasswordSchema), asyncHandler(ctrl.forgotPasswordController));
authRouter.post('/reset-password', validationMiddleware(resetPasswordSchema), asyncHandler(ctrl.resetPasswordController));
authRouter.post('/logout', authMiddleware, asyncHandler(ctrl.logOutController));

export default authRouter;
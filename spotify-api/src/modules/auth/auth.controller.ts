import type { Request, Response } from "express";
import type { SignUpType, ResendOTPType, VerifyOTPType } from "./auth.schema.js";
import * as svc from "./auth.service.js";
import { sendSuccess } from "../../utils/apiResponse.js";

export const signUpController = async (req: Request, res: Response) => {
    const { username, email, password }: SignUpType = req.body;
    const user = await svc.signUp(username, email, password);
    const data = await svc.generateAndSendOTP(email, username);
    sendSuccess(res, "Signed up successfully", 201, user);
};

export const resendOTPController = async (req: Request, res: Response) => {
    const { email }: ResendOTPType = req.body;
    const data = await svc.resendOTP(email);
    sendSuccess(res, "OTP Sent");
}

export const verifyOTPController = async (req: Request, res: Response) => {
    const { email, otp }: VerifyOTPType = req.body;
    const user = await svc.verifyOTP(email, otp);
    sendSuccess(res, "OTP Verified Successfully", 200, user);
}
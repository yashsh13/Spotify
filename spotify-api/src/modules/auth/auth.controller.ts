import type { Request, Response } from "express";
import type { SignUpType, ResendOTPType, VerifyOTPType, LogInType } from "./auth.schema.js";
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
    const { accessToken, refreshToken, user } = await svc.verifyOTP(email, otp);

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    sendSuccess(res, "OTP Verified Successfully", 200, {user, accessToken});
}

export const LogInController = async (req: Request, res: Response) => {
    const { email, password }: LogInType = req.body;
    const { accessToken, refreshToken, user } = await svc.logIn(email,password);

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    sendSuccess(res, "Logged in successfully", 200, {user, accessToken});
}

export const refreshController = async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    const { accessToken, refreshToken } = await svc.refresh(incomingRefreshToken);

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    sendSuccess(res, "Refreshed tokens successfully", 200, {accessToken});
}
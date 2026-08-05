import { ConflictError, NotFoundError, UnauthorizedError } from "../../utils/apiError.js";
import * as repo from "./auth.repository.js";
import { hashPassword, comparePassword, hashToken } from "../../helper/hash.js";
import { sendVerificationMail, sendForgotPasswordMail } from "../../email/emails.js";
import { createTokens, verifyRefreshToken, createForgotPasswordToken, verifyForgotPasswordToken } from "../../helper/jwt.js";

export const signUp = async (username: string, email: string, password: string) => {

    const emailExists = await repo.findUserByEmail(email);
    if(emailExists){
        if(emailExists.isVerified) throw new ConflictError("User with this email already exists");
        else {
            const hashedpassword = await hashPassword(password);
            const updatedValues = {
                username,
                password: hashedpassword
            }
            return await repo.updateUserByEmail(email, updatedValues);
        }
    }

    const usernameExists = await repo.findUserByUsername(username);
    if(usernameExists){
        if(usernameExists.isVerified) throw new ConflictError("User with this username already exists");
        else {
            const hashedPassword = await hashPassword(password);
            const updatedValues = {
                email,
                password: hashedPassword
            }
            return await repo.updateUserByUsername(username, updatedValues);
        }
    }

    const hashedPassword = await hashPassword(password);
    const user = await repo.createUser(username,email,hashedPassword);

    return user;
}

export const generateAndSendOTP = async (email: string, username: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await repo.saveOTPInCache(email, otp);
    
    const data = await sendVerificationMail(email, username, otp);
    return data;
}

export const resendOTP = async (email: string) => {

    const user = await repo.findUserByEmail(email);
    if(!user || user.isVerified ) return;
    
    const data = await generateAndSendOTP(email, user.username);
    return data;
}

export const verifyOTP = async (email: string, inputOTP: string) => {

    const otp = await repo.getOTPFromCache(email);
    if(!otp) throw new UnauthorizedError("OTP has expired");

    if(inputOTP !== otp) throw new UnauthorizedError("Invalid OTP");

    await repo.deleteOTPFromCache(email);
    const user = await repo.updateUserByEmail(email, { isVerified: true });

    const { accessToken, refreshToken } = createTokens(user.id, user.role, user.plan);
    await repo.saveRefreshTokenInCache(user.id, refreshToken);

    return { accessToken, refreshToken, user };
}

export const logIn = async (email: string, password: string) => {

    const user = await repo.findUserByEmail(email);
    if(!user) throw new NotFoundError("User");
    if(!user.isVerified) {
        await generateAndSendOTP(user.email, user.username);
        throw new UnauthorizedError("Email unverifed, OTP has been sent");
    };

    const validPassword = await comparePassword(password, user.password);
    if(!validPassword) throw new UnauthorizedError("Invalid Credentials");

    const { accessToken, refreshToken } = createTokens(user.id, user.role, user.plan);
    await repo.saveRefreshTokenInCache(user.id, refreshToken);

    const { password:_, ...safeUser } = user;

    return { accessToken, refreshToken, user: safeUser };
}

export const refresh = async (incomingRefreshToken: string) => {

    const decoded = verifyRefreshToken(incomingRefreshToken);
    if(!decoded) throw new UnauthorizedError("Refresh Token Expired");

    const userId = decoded.userId;
    const userRole = decoded.role;
    const userPlan = decoded.plan;

    const savedRefreshToken = await repo.getRefreshTokenFromCache(userId);
    if(!savedRefreshToken) throw new UnauthorizedError("Refresh Token Expired");
    if(incomingRefreshToken !== savedRefreshToken ) throw new UnauthorizedError("Invalid Refresh Token");

    const { accessToken, refreshToken } = createTokens(userId, userRole, userPlan);
    await repo.saveRefreshTokenInCache(userId, refreshToken);

    return { accessToken, refreshToken };
}

export const forgotPassword = async (email: string) => {
    const user = await repo.findUserByEmail(email);
    if(!user) return;

    const token = createForgotPasswordToken(user.id);

    const hashedToken = hashToken(token);
    await repo.saveForgotPassTokenInCache(user.id, hashedToken);

    const data = await sendForgotPasswordMail(user.username, email, token);
    return data
}

export const resetPassword = async (incomingForgotPassToken: string, password: string) => {
    const forgotPasswordPayload = verifyForgotPasswordToken(incomingForgotPassToken);
    if(!forgotPasswordPayload) throw new UnauthorizedError("Invalid Token");

    const userId = forgotPasswordPayload.userId;
    if(!userId) throw new UnauthorizedError("Invalid Token");

    const incomingHashedToken = hashToken(incomingForgotPassToken);
    const hashedToken = await repo.getForgotPassTokenFromCache(userId);
    if(!hashedToken) throw new UnauthorizedError("Token Expired");
    if(incomingHashedToken !== hashedToken) throw new UnauthorizedError("Invalid Token");

    const hashedPassword = await hashPassword(password);
    const updatedValues = { password: hashedPassword };

    await repo.deleteForgotPassTokenFromCache(userId);
    const user = await repo.updateUserById(userId, updatedValues);

    return user;
}

export const logOut = async (userId: string) =>{
    await repo.deleteRefreshTokenFromCache(userId);
    return
}
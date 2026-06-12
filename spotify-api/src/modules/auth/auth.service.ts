import { ConflictError, NotFoundError, UnauthorizedError } from "../../utils/apiError.js";
import * as repo from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../helper/bcrypt.js";
import { sendVerificationMail } from "../../email/emails.js";
import { createTokens } from "../../helper/jwt.js";

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

    const emailExists = await repo.findUserByEmail(email);
    if(!emailExists) throw new NotFoundError("User");

    const otp = await repo.getOTPFromCache(email);
    if(!otp) throw new UnauthorizedError("OTP has expired");

    if(inputOTP !== otp) throw new UnauthorizedError("Invalid OTP");

    await repo.deleteOTPFromCache(email);
    const user = await repo.updateUserByEmail(email, { isVerified: true });

    const { accessToken, refreshToken } = createTokens(user.id, user.role);
    await repo.saveRefreshTokenInCache(user.id, refreshToken);

    return { accessToken, refreshToken, user };
}

export const logIn = async (email: string, password: string) => {

    const user = await repo.findUserByEmail(email);
    if(!user) throw new NotFoundError("User");
    if(!user.isVerified) {
        generateAndSendOTP(user.email, user.username);
        return {
            accessToken: null,
            refreshToken: null
        }
    };

    const validPassword = await comparePassword(password, user.password);
    if(!validPassword) throw new UnauthorizedError("Invalid Credentials");

    const { accessToken, refreshToken } = createTokens(user.id, user.role);
    await repo.saveRefreshTokenInCache(user.id, refreshToken);

    return { accessToken, refreshToken, user };
}
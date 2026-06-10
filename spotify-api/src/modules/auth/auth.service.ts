import { ConflictError } from "../../utils/apiError.js";
import * as repo from "./auth.repository.js";
import { hashPassword } from "../../helper/bcrypt.js";
import { sendVerificationMail } from "../../email/emails.js";

export const signUp = async (username: string, email: string, password: string) => {

    const emailExists = await repo.findUserByEmail(email);
    if(emailExists){
        if(emailExists.isVerified) throw new ConflictError("User with this email already exists");
        else {
            await repo.deleteOTPFromCache(email);
            const hashedPassword = await hashPassword(password);
            return await repo.updateUserByEmail(username, email, hashedPassword);
        }
    }

    const usernameExists = await repo.findUserByUsername(username);
    if(usernameExists){
        if(usernameExists.isVerified) throw new ConflictError("User with this username already exists");
        else {
            await repo.deleteOTPFromCache(usernameExists.email);
            const hashedPassword = await hashPassword(password);
            return await repo.updateUserByUsername(username, email, hashedPassword);
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
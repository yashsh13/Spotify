import resendClient from "./resend.js";
import VerificationEmail from "./email-templates/VerificationEmail.js";
import ForgotPasswordEmail from "./email-templates/ForgotPasswordEmail.js";
import parsedEnv from "../config/env.js";

export const sendVerificationMail = async (email: string, username: string, otp: string) => {
    const { data, error} = await resendClient.emails.send({
        from: parsedEnv.EMAIL_FROM,
        to: email,
        subject: "Spotify Verification Code",
        react: VerificationEmail({username, otp})
    });

    if(error) {
        console.log(error);
        throw new Error("Failed to send verification email");
    }

    return data;
}

export const sendForgotPasswordMail = async (username: string, email: string, token: string) => {

    const { data, error } = await resendClient.emails.send({
        from: parsedEnv.EMAIL_FROM,
        to: email,
        subject: "Password reset link",
        react: ForgotPasswordEmail({username, token})
    });

    if(error) {
        console.log(error);
        throw new Error("Failed to send reset password mail");
    }

    return data;
}
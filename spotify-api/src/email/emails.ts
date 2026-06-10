import resendClient from "./resend.js";
import VerificationEmail from "./email-templates/VerificationEmail.js";
import parsedEnv from "../config/env.js";

export const sendVerificationMail = async (email: string, username: string, otp: string) => {
    const { data, error} = await resendClient.emails.send({
        from: parsedEnv.EMAIL_FROM,
        to: email,
        subject: "Spotify Verification Code",
        react: VerificationEmail({username, otp})
    });

    if(error) {
        throw new Error("Failed to send verification email");
    }

    return data;
}
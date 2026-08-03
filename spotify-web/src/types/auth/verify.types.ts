import { z } from "zod";

export const otpSchema = z.object({
    otp: z.string()
            .length(6,{error:"OTP must be of length 6"})
            .regex(/^\d+$/,{error:"OTP must be a sequence of digits"})
});

export type OTPType = z.infer<typeof otpSchema>;
export type VerifyType = {
    otp: z.infer<typeof otpSchema.shape.otp>,
    email: string
}

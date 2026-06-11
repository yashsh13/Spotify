import { z } from 'zod';

export const emailSchema = z.email()
                            .min(3, {error:"Minimum 3 characters"})
                            .max(255, {error:"Maximum 25 chracters"})
                            .trim();

export const usernameSchema = z.string()
                            .min(3, {error:"Minimum 3 characters"})
                            .max(25, {error:"Maximum 25 chracters"})
                            .trim();

export const passwordSchema = z.string()
                            .min(8, {error:"Minimum 8 characters"})
                            .max(25, {error:"Maximum 25 chracters"})
                            .refine(password => /[A-Z]/.test(password), {error: "Need atleast 1 uppercase letter"} )
                            .refine(password => /[a-z]/.test(password), {error: "Need atleast 1 lowercase letter"} )
                            .refine(password => /[0-9]/.test(password), {error: "Need atleast 1 number"} )
                            .refine(password => /[!@#$%^&*?]/.test(password), {error: "Need atleast 1 special character"} )
                            .trim();

export const signUpSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine(data => data.password === data.confirmPassword, {error: "Confirm password must match the password"});

export const logInSchema = z.object({
    email: emailSchema,
    password: z.string()
                .min(3, {error:"Minimum 3 characters"})
                .max(25, {error:"Maximum 25 chracters"})
                .trim()
});

export const resendOTPSchema = z.object({
    email: emailSchema
})

export const verifyOTPSchema = z.object({
    email: emailSchema,
    otp: z.string()
        .length(6,{error:"OTP must be of length 6"})
        .regex(/^\d+$/,{error:"OTP must be a sequence of digits"})
})

export const forgotPasswordSchema = z.object({
    email: emailSchema
})

export const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema
}).refine(data => data.newPassword === data.confirmNewPassword, {error: "Confirm password must match the password"})

export type SignUpType = z.infer<typeof signUpSchema>;
export type LogInType = z.infer<typeof logInSchema>;
export type ResendOTPType = z.infer<typeof verifyOTPSchema>;
export type VerifyOTPType = z.infer<typeof verifyOTPSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;




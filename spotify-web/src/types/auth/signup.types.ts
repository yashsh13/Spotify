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
 
export type SignupType = z.infer<typeof signUpSchema>;
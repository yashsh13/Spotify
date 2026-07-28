import { z } from "zod";

export const emailSchema = z.email()
                            .min(3, {error:"Minimum 3 characters"})
                            .max(255, {error:"Maximum 25 chracters"})
                            .trim();

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string()
                .min(3, {error:"Minimum 3 characters"})
                .max(255, {error:"Maximum 25 chracters"})
                .trim()
});

export type LoginType = z.infer<typeof loginSchema>;
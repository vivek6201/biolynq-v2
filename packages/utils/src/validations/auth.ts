import { z } from "zod";

export const LoginEmailValidation = z.object({
    email: z.email("Please enter a valid email"),
});

export const VerifyOtpValidation = z.object({
    email: z.email("Please enter a valid email"),
    otp: z.string().length(6, "Please enter a valid otp"),
});

export const OnboardingValidation = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long"),
});
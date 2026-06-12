export const getOTPKey = (email: string) => `otp:${email}`; 
export const getRefreshTokenKey = (userId: string) => `refreshToken:${userId}`;
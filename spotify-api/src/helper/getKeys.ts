export const getOTPKey = (email: string) => `otp:${email}`; 

export const getRefreshTokenKey = (userId: string) => `refreshToken:${userId}`;

export const getForgotPassTokenKey = (userId: string) => `forgotPasswordToken:${userId}`;

export const getTrackKey = (trackId: string) => `track:${trackId}`;

export const getUrlKey = (fileKey: string) => `url:${fileKey}`;

export const getAllTracksKey = (pageNo: number) => `tracks:${pageNo}`;

export const getUserPlayCountKey = (userId: string) => `playCount:${userId}`;

export const getGenreTracksKey = (genre: string, pageNo: number) => `tracks:${genre}:${pageNo}`;

export const getMostPlayedTracksKey = (topCount: number) => `tracks:mostPlayed:${topCount}`;
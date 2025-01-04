export const env = {
  jwtSecret: process.env.JWT_SECRET!,
  cookieExpInSeconds: 60 * 60 * 24 * 7, // 7 days
};

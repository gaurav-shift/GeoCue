export const serverConfig = {
  port: Number(process.env.PORT) || 3001,
  environment: process.env.NODE_ENV || "development",
};
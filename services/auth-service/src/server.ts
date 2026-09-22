import "dotenv/config"; // UPDATE: Direct dotenv execution ensures env variables are loaded before any other ESM imports

import express from "express";
import { serverConfig } from "./config/serverConfig";
import { prisma } from "./config/prisma";
import errorMiddleware from "./middlewares/error-middleware";
import apiRoutes from "./routes";
import { redis } from "./config/redis";

const app = express();

const PORT = serverConfig.port;

const setupAndStartServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL");

    await redis.ping();
    console.log("Connected to Redis");

    app.use("/api", apiRoutes);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
      console.log(`Auth Service started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to PostgreSQL", error);
    process.exit(1);
  }
};

setupAndStartServer(); 
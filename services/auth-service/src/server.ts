import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { serverConfig } from "./config/serverConfig";

const app = express();

const PORT = serverConfig.port;

app.get("/", (_req, res) => {
  res.json({
    message: "GeoCue Auth Service is running",
  });
});


app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
}); 
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(cors());
}

export default app;

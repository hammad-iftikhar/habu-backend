import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(cors());
}

app.use("/api/users", userRouter);

export default app;

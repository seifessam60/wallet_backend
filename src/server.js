import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoutes from "./routes/transactionsRoutes.js";
import { initDb } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionsRoutes);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
  });
});

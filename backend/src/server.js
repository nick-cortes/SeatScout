import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// cron.schedule('1,10,20,30 * * * * *', () => {
//     console.log("Current second", new Date().getSeconds());
// })

app.use(express.json());

connectDB().then(() => {
    app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
    });
});
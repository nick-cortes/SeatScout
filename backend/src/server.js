import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { updateClasses, deleteClasses } from "./scraper/updateClasses.js";
import { testSubscription } from "./scraper/scrape.js";

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
    // updateClasses(); // only run this when we want to re-update classes
    // deleteClasses(); // only run this when we want to clear all current classes
    testSubscription("MATH 3215", "J");
});
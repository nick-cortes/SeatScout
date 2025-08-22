import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { updateClasses, deleteClasses } from "./scraper/updateClasses.js";
import { scrapeAllSubscriptions } from "./scraper/scrape.js";
import { testNewSubscription, deleteAllSubscriptions } from "./scraper/scrapeUtils.js";

dotenv.config();

const app = express();

/**
 * Regular course seat scraping job.
 */
// cron.schedule('29,59 * * * * *', () => {
//     // console.log("Cron job scheduled for this second", new Date().getSeconds());
//     // scrapeAllSubscriptions();
// });

app.use(express.json());

connectDB().then(async () => {
    app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
    });
});
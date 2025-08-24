import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";
import routes from "./routes/routes.js";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { updateClasses, deleteClasses } from "./services/scraper/updateClasses.js";
import { scrapeAllSubscriptions } from "./services/scraper/scrape.js";
import { testNewSubscription, deleteAllSubscriptions, subscribeUser } from "./services/scraper/scrapeUtils.js";

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL
};

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(auth(config));

app.use("/", routes);
/**
 * Regular course seat scraping job.
 */
cron.schedule('29,59 * * * * *', () => {
    console.log("Cron job scheduled for this second", new Date().getSeconds());
    scrapeAllSubscriptions();
});

connectDB().then(async () => {
    app.listen(process.env.PORT, () => {
    console.log("Server started on PORT:", process.env.PORT);
    });
    subscribeUser("acetrainer70nick@gmail.com", "MATH 3215", "J");
});
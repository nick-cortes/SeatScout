import express from "express";
import cron from "node-cron";

const app = express();

// cron.schedule('1,10,20,30 * * * * *', () => {
//     console.log("Current second", new Date().getSeconds());
// })

app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
});
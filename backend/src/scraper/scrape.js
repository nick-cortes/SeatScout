import axios from "axios";
import Subscription from "../models/Subscription.js";
import Class from "../models/Class.js"

import * as cheerio from "cheerio";
import { mailUsers } from "./notify.js";

export async function scrapeSubscription(subscription) {
    /**
     * we won't always scrape a class, this interval length will eventually need to take into account the 
     * class seat size (to scrape bigger classes more often)
     */
    const nextPollTime = subscription.lastPoll + subscription.interval;
    console.log("Time right now:", Date.now());
    console.log("Next poll time:", nextPollTime);
    if (Date.now() < nextPollTime) {
        console.log("Subscription has been scraped too recently, try again later.");
        return;
    }

    const course = await Class.findById(subscription.class);
    axios.get(course.url)
    .then(async ({ data }) => {
        const $ = cheerio.load(data);

        const scrapedData = $(".datadisplaytable .dddefault")
            .map((_, info) => {
                const $text = $(info);
                return $text.text();
            })
            .toArray();
        const capacity = scrapedData[1];
        const actual = scrapedData[2];
        const waitlistCapacity = scrapedData[4];
        const waitlistActual = scrapedData[5];

        // update subscription info
        subscription.lastPoll = Date.now();

        const oldStatus = subscription.status
        if (capacity - actual > waitlistActual) {
            subscription.status = "Open";
        } else if (capacity - actual === 0 && waitlistCapacity - waitlistActual === 0) {
            subscription.status = "Closed";
        } else { // (capacity - actual <= waitlistActual) 
            subscription.status = "Waitlist";
        }
        await subscription.save();

        // notify users
        if (oldStatus !== subscription.status) {
            await mailUsers(course, subscription.status, subscription.users);
            console.log("Notified all users");
        } else {
            console.log("Class status is the same.")
        }

        console.log("Capacity:", capacity);
        console.log("Actual:", actual);
        console.log("Waitlist capacity:", waitlistCapacity);
        console.log("Waitlist actual:", waitlistActual);
        console.log("Successfully Scraped:", course.name);
        console.log("Class status is:", subscription.status);
    });
}

export async function scrapeAllSubscriptions() {
    const subscriptions = await Subscription.find({});
    for (const subscription of subscriptions) {
        scrapeSubscription(subscription);
    }
    console.log("Successfully scraped all subscriptions.");
}
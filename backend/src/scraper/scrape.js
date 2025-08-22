import axios from "axios";
import * as cheerio from "cheerio";

import Subscription from "../models/Subscription.js";
import Class from "../models/Class.js"


export async function scrapeSubscription(subscription) {
    /**
     * we won't always scrape a class, this interval length will eventually need to take into account the 
     * class seat size, but we may need to change our database structure to accomplish that
     */
    const scrapeInterval = 20 * (60 * (1000));
    const nextPollTime = subscription.lastPoll + scrapeInterval;
    console.log("Time right now:", Date.now());
    console.log("Next poll time:", nextPollTime);
    if (Date.now() < nextPollTime) {
        console.log("Subscription has been scraped too recently, try again later.");
        return;
    }

    const course = await Class.findById(subscription.class);
    axios.get(course.url)
    .then(async ({ data }) => {
        subscription.lastPoll = Date.now();
        await subscription.save();
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
        console.log("Capacity:", capacity);
        console.log("Actual:", actual);
        console.log("Waitlist capacity:", waitlistCapacity);
        console.log("Waitlist actual:", waitlistActual);
        console.log("Successfully Scraped:", course.name);
    });
}

export async function scrapeAllSubscriptions() {
    const subscriptions = await Subscription.find({});
    for (const subscription of subscriptions) {
        scrapeSubscription(subscription);
    }
    console.log("Successfully scraped all subscriptions.");
}
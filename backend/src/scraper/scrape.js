import axios from "axios";
import * as cheerio from "cheerio";

import Subscription from "../models/Subscription.js";
import Class from "../models/Class.js"


export const scrapeSubscription = async (subscription) => {
    const course = await Class.findById(subscription.class);
    axios.get(course.url)
    .then(({ data }) => {
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
        console.log("Successfully Scraped");
    });
}


export const testSubscription = async (className, section) => {
    const classArray = await Class.find({name: className, section: section});
    const testClass = classArray[0];
    const dummySubscription = new Subscription({
        class: testClass._id.toString(),
        users: [],
    });
    await dummySubscription.save();
    const subscriptionArray = await Subscription.find({name: dummySubscription.name, users: dummySubscription.users});
    const testSubscription = subscriptionArray[0];
    await scrapeSubscription(testSubscription);
};
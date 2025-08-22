import Subscription from "../models/Subscription.js";
import Class from "../models/Class.js";

import { scrapeSubscription } from "./scrape.js";

/**
 * Creates a subscription and then tries to scrape it.
 */
export async function testNewSubscription(className, section) {
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

export async function deleteAllSubscriptions() {
    try {
        await Subscription.deleteMany({});
        console.log("Successfully deleted all subscriptions.")
    } catch (error) {
        console.error("Error in deleting all subscriptions:", error);
    }
}
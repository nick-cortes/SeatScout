import Subscription from "../../models/Subscription.js";
import Class from "../../models/Class.js";
import User from "../../models/User.js";

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
}

/**
 * Subscribes a user (by email) to a subscription (by class name and section)
 */
export async function subscribeUser(email, courseName, section) {
    const user = await User.findOne({email: email});
    const course = await Class.findOne({name: courseName, section: section});
    const subscription = await Subscription.findOne({class: course._id});
    if (!user) {
        console.log("Error in subscribing user. Invalid email");
        return;
    } else if (!subscription) {
        console.log("Error in subscribing user. Invalid course name");
        return;
    }
    subscription.users.push(user._id)
    await subscription.save();
    user.subscriptions.push(subscription._id);
    await user.save();
}

export async function deleteAllSubscriptions() {
    try {
        await Subscription.deleteMany({});
        console.log("Successfully deleted all subscriptions.")
    } catch (error) {
        console.error("Error in deleting all subscriptions:", error);
    }
}
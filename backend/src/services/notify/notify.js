import nodemailer from "nodemailer";
import User from "../../models/User.js";

import { transporter, formatEmail } from "./notifyUtils.js";

export async function mailUsers(course, status, users) {
    for (let userId of users) {
        const user = await User.findById(userId.toString());
        transporter.sendMail({
            to: `${user.email}`,
            subject: `Status update for ${course.name}`,
            html: formatEmail(course, status)
        }).then(() => {
            console.log("Email sent to:", user.email);
        }).catch(error => {
            console.error("Error sending email:", error);
        });
    }
}
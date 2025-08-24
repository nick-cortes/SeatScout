import nodemailer from "nodemailer";
import User from "../models/User";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'seatscout.gt@gmail.com',
        pass: process.env.APP_PASSWORD
    }
});

async function formatEmail(course, status) {
    return (`
        <h1>
        This is a notification from SeatScout that ${course.name} is now ${status}
        </h1>
    `);
}

export async function mailUsers(course, status, users) {
    for (let userId in users) {
        const user = await User.findById(userId)
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
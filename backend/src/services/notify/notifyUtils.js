import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'seatscout.gt@gmail.com',
        pass: "edvy dhtd axjn uiyu"
    }
});

export function formatEmail(course, status) {
    return (`
        <h1>
        This is a notification from SeatScout that ${course.name} is now ${status}
        </h1>
    `);
}
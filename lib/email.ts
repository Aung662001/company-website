import { SMTPClient } from "emailjs";
import { OrderData } from "./db";
import * as dotenv from "dotenv";
dotenv.config();

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true,
});

export async function sendEmail(options: OrderData) {
  try {
    await client.sendAsync({
      text: "Order Placed Successfully . We will reach you within one week . Thank for your patient and interesting in our priduct",
      from: process.env.EMAIL_USER!,
      to:
        "user <" +
        options.email +
        ">" +
        ",company <yewinhtut85@gmail.com>",
      subject: "ORDER PLACED AT Monisoft Hospital Management System",
      attachment: [
        {
          data:
            "<html>" +
            "<p> Hospital Name : " +
            options.hospital_name +
            "</p>" +
            "<p> Contact Person : " +
            options.contact_person_name +
            "</p>" +
            "<p> Phone : " +
            options.phone +
            "</p>" +
            "<p> Email : " +
            options.email +
            "</p>" +
            "<p> Address : " +
            options.hospital_address +
            "</p>" +
            "<p> Order Type : " +
            options.order_type_name +
            "</p>" +
            "<p>Order Placed Successfully . We will reach you within one week . Thank for your patient and interesting in our priduct</p>" +
            "</html>",
          alternative: true,
        },
      ],
    });
    console.log("Email sent successfully to:", options.email);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

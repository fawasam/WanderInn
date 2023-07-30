const twilio = require("twilio");
const nodemailer = require("nodemailer");

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = twilioClient;

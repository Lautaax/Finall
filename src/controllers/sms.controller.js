import twilio from "twilio";
import configMailSms from "../config/configmailsms.js";

const {
    nodemailerConfig: { service, port, user, password },
    twilioConfig: { accountSid, authToken, phoneNumber },
  } = configMailSms;
const client = twilio(accountSid, authToken);
export async function sendSMS (req,res){
    await client.messages.create({
        body: "Esto es un mensaje SMS",
        from:phoneNumber,
        to: "+543492516734",
      });
      res.send({ status: "success", message: "message sent" });
}

// const sgMail = require('@sendgrid/mail')
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

const fromEmail = "submissions@justgetintouch.com";

/**
 * @param   emailReceiver = email address of the person receiving the email
 * @param   mongoWebsiteObjectId = MongoDB object id corresponding to the website sending the request
 * @param   originWebsite = Self explanatory - the website sending the request
 */
export const sendVerificationEmail = (
  emailReceiver:string,
  mongoWebsiteObjectId:string,
  originWebsite:string
) => {
  const msg = {
    from: fromEmail,
    to: emailReceiver,
    subject: "Action Required: Verify your email address.",
    html: `
        <html>
            <head>
                <meta name="viewport" content="width=device-width">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Verify your email address.</title>
            </head>
            <body>
                <strong>Hey buddy,</strong>
                <br/>
                <p>You have requested to activate your form on ${originWebsite}</p>
                <p>All you have to do before using our service is click the button below to verify your email.</p>
                <br/>
                <a href="https://justgetintouch.com/verify/${mongoWebsiteObjectId}"><strong>ACTIVATE FORM</strong></a>
                <br/>
                <p>If you want to hide your email, just replace it with this string:</p>
                <br/>
                <strong>${mongoWebsiteObjectId}</strong>
            </body>
        </html>
        `,
  };
  return sgMail.send(msg); //returns a promise
};

/**
 * @param   emailReceiver = address where to send the email
 * @param   originWebsite = website requesting the service
 * @param   rest   = the rest of the data from req.body
 */
export const sendEmail = (emailReceiver:string, originWebsite:string, { ...rest }:any) => {
  let formattedRestData = "";
  /**
   * @param key = form input name
   * @param value = form input value
   */
  for (const key in rest) {
    if (Object.hasOwnProperty.call(rest, key)) {
      const value = rest[key];
      // exclude form input name='_next' from email
      if (key !== "_next") {
        formattedRestData += `
                <p>${key}</p>
                <strong>${value}</strong>
                <hr>
                <br/>
                `;
      }
    }
  }
  const msg = {
    from: fromEmail,
    to: emailReceiver,
    subject: rest.subject || `New submission on ${originWebsite}`,
    html: `
        <html>
            <head>
                <meta name="viewport" content="width=device-width">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>New submission on ${originWebsite}.</title>
            </head>
            <body>
                <strong>Hey buddy,</strong>
                <br/>
                <p>You've got a new form submitted on ${originWebsite}.</p>
                <br/>
                ${formattedRestData}
            </body>
        </html>
        `,
  };

  // if(rest.email)msg.ReplyToAddresses=[rest.email];
  return sgMail.send(msg);
};

export default {sendEmail, sendVerificationEmail}
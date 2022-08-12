const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// let attachments = fs.readFileSync(`${__dirname}/file.pdf`).toString("base64");

const sendEmail = async (options) => {
  let attachments = fs.readFileSync(options.file).toString("base64");

  const msg = {
    to: options.email, // Change to your recipient
    from: "sahilk@dataminestech.com", // Change to your verified sender
    subject: options.subject,
    text: options.message,
    html: `<strong><a href="${options.link}">Here is the Link</a></strong`,
    attachments: [
      {
        content: attachments,
        type: "application/pdf",
        path: options.path,
      },
    ],
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");

      fs.unlink(options.path, function (err) {
        if (err) {
          console.log("fs", err);
        } else {
          console.log("delted");
        }
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

module.exports = sendEmail;

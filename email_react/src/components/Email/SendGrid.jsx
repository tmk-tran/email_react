const sgMail = require("@sendgrid/mail");
const parse = require("csv-parse/lib/sync");
const fs = require("fs");

// npm install @sendgrid/mail

// Set your SendGrid API key
sgMail.setApiKey("your-sendgrid-api-key");

// Read the CSV data
const csvData = fs.readFileSync("emails.csv", "utf8");

// Parse the CSV data
const records = parse(csvData, { columns: true });

// Function to send emails
async function sendEmail(
  templateUrl,
  subject,
  recipients,
  sender,
  outputValues
) {
  const msg = {
    to: recipients,
    from: sender,
    subject: subject,
    html: `Email template content from ${templateUrl} with output values: ${outputValues}`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

// Example usage
records.forEach((record) => {
  sendEmail(
    record.template,
    record.subject,
    JSON.parse(record.recipients),
    record.sender,
    record.output_values
  );
});

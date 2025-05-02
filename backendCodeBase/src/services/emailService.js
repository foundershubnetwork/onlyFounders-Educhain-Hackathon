const { EmailClient } = require('@azure/communication-email');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
// const juice = require('juice');

// Initialize Email Client
const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING; // Add this to your .env
const emailClient = new EmailClient(connectionString);

// Send Welcome Email
async function sendEmail(email,username,subject,templatePath) {


  // Render the email template with dynamic content
  const emailHtml = await ejs.renderFile(templatePath, { name: username });

  const emailMessage = {
    senderAddress: process.env.SENDER_ADDRESS, // Replace with your verified sender address
    content: {
      subject: subject,
      plainText: `Welcome, ${username}!`,
      html: emailHtml,
    },
    senderDisplayName: 'FoundersHubNetwork Team',
    recipients: {
      to: [
        {
          address: email,
          displayName: "FoundershubNetwork Team",
        },
      ],
    },
  };

  try {
    const poller = await emailClient.beginSend(emailMessage);

    // Wait for the send operation to complete
    const response = await poller.pollUntilDone();
    console.log(`Email sent successfully: ${response.messageId}`);
    return response.messageId;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

async function sendMilestoneRejectionEmail(email,username,reason,subject,templatePath) {


  // Render the email template with dynamic content
  const emailHtml = await ejs.renderFile(templatePath, { name: username ,reason:reason});

  const emailMessage = {
    senderAddress: process.env.SENDER_ADDRESS, // Replace with your verified sender address
    content: {
      subject: subject,
      plainText: `Welcome, ${username}!`,
      html: emailHtml,
    },
    senderDisplayName: 'FoundersHubNetwork Team',
    recipients: {
      to: [
        {
          address: email,
          displayName: "FoundershubNetwork Team",
        },
      ],
    },
  };

  try {
    const poller = await emailClient.beginSend(emailMessage);

    // Wait for the send operation to complete
    const response = await poller.pollUntilDone();
    console.log(`Email sent successfully: ${response.messageId}`);
    return response.messageId;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

async function sendInvitationMail(email,username,invite_link,subject,templatePath) {


  // Render the email template with dynamic content
  const emailHtml = await ejs.renderFile(templatePath, {  username :username,invite_link:invite_link});

  const emailMessage = {
    senderAddress: process.env.SENDER_ADDRESS, // Replace with your verified sender address
    content: {
      subject: subject,
      plainText: `Welcome!`,
      html: emailHtml,
    },
    senderDisplayName: 'FoundersHubNetwork Team',
    recipients: {
      to: [
        {
          address: email,
          displayName: "FoundershubNetwork Team",
        },
      ],
    },
  };

  try {
    const poller = await emailClient.beginSend(emailMessage);

    // Wait for the send operation to complete
    const response = await poller.pollUntilDone();
    console.log(`Email sent successfully: ${response.messageId}`);
    return response.messageId;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

module.exports = { sendEmail, sendMilestoneRejectionEmail ,sendInvitationMail};

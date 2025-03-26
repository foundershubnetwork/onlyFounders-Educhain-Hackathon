"use server";

import { EmailClient, type EmailMessage } from "@azure/communication-email";

// Define the form data type
type FormData = {
  name: string;
  email: string;
  xHandle: string;
  founderType: string;
  walletAddress: string;
  role: "Founder" | "Investor";
};

// Admin Notification Email
function createAdminEmailTemplate(data: FormData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .header {
          background: linear-gradient(to bottom right, #000510, #1a1a40);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
        }
        .content {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New ${data.founderType} Submission</h1>
      </div>
      <div class="content">
        <div class="field"><span class="label">Name:</span> ${data.name}</div>
        <div class="field"><span class="label">Email:</span> ${data.email}</div>
        <div class="field"><span class="label">X Handle:</span> ${data.xHandle || "Not provided"}</div>
        <div class="field"><span class="label">Founder Type:</span> ${data.founderType}</div>
        <div class="field"><span class="label">Wallet Address:</span> ${data.walletAddress || "Not provided"}</div>
      </div>
    </body>
    </html>
  `;
}

// Founder Welcome Email
function createFounderEmailTemplate(data: FormData) {
  return `
   <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to OnlyFounders Waitlist</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <noscript>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* Import Poppins font */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #000000; font-family: 'Poppins', Arial, sans-serif; color: #ffffff;">
  <!-- Main Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000" style="background-color: #000000;">
    <tr>
      <td align="center" valign="top">
        <!-- Content Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000" style="max-width: 600px; width: 100%; background-color: #000000; background-image: radial-gradient(circle at center, #004444 0%, #002C2C 40%, #000000 100%);">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <!-- Logo -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 0;">
                <tr>
                  <td align="center" style="padding-bottom: 60px;">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Founders_Hub_Network_F3AI_OnlyFounders_logo_Blue-QMnVaCSQxLQncK6qLUxNRr6mqlSp7L.svg" alt="OnlyFounders Logo" width="220" style="max-width: 100%; height: auto; display: block; border: 0;">
                  </td>
                </tr>
              </table>

              <!-- Header -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <h1 style="margin-top: 0; margin-bottom: 30px; font-size: 36px; line-height: 1.5; font-weight: 700; text-align: center; color: #ffffff; font-family: 'Poppins', Arial, sans-serif;">You're On The Waitlist!</h1>
                  </td>
                </tr>
              </table>

              <!-- Content -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="left" style="font-family: 'Poppins', Arial, sans-serif;">
                    <p style="font-size: 20px; line-height: 1.5; margin-bottom: 20px; font-weight: 500; color: #ffffff;">Hey Future Disruptor,</p>
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 400; color: #ffffff;">You're officially on our waitlist. Smart move.</p>
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 400; color: #ffffff;">OnlyFounders is flipping the script on startup funding, putting power back where it belongs - in founders' hands.</p>
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 500; color: #ffffff;">While we prepare your access:</p>
                    
                    <!-- List Items -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="10" valign="top" style="padding-right: 0; color: #ffffff; font-size: 18px;">•</td>
                              <td style="color: #ffffff; font-size: 18px; line-height: 1.5; font-family: 'Poppins', Arial, sans-serif; padding-left: 4px;">
                                Follow us <a href="https://x.com/onlyfoundersxyz" style="color: #00F0FF; text-decoration: none; font-weight: 500;">https://x.com/onlyfoundersxyz</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="10" valign="top" style="padding-right: 0; color: #ffffff; font-size: 18px;">•</td>
                              <td style="color: #ffffff; font-size: 18px; line-height: 1.5; font-family: 'Poppins', Arial, sans-serif; padding-left: 4px;">
                                Join our Telegram Announcement Channel: <a href="https://t.me/onlyfoundersxyz" style="color: #00F0FF; text-decoration: none; font-weight: 500;">https://t.me/onlyfoundersxyz</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 400; color: #ffffff;">Stay close. We're changing the game together.</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="height: 1px; background-color: #00c2ff; opacity: 0.5;"></td>
                </tr>
              </table>

              <!-- Social Media -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <!-- Twitter/X -->
                        <td style="padding: 0 10px;">
                          <a href="https://x.com/onlyfoundersxyz" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x-social-media-logo-icon%20%281%29-ATY5Ci79tEPBrkuKkYqYhfsCtUyrW4.svg" alt="Twitter/X" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                        <!-- LinkedIn -->
                        <td style="padding: 0 10px;">
                          <a href="#" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-vtKyCgIfLm8tQU7PVcCqFgGRNKOIzb.svg" alt="LinkedIn" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                        <!-- GitHub -->
                        <td style="padding: 0 10px;">
                          <a href="#" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-1-InwOHhSKdWHpLzWVO6RC6XfZPNXT6o.svg" alt="GitHub" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                        <!-- Telegram -->
                        <td style="padding: 0 10px;">
                          <a href="https://t.me/onlyfoundersxyz" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-2-34HjSKOKh6zJmvXgDd28jBfHnDG0gY.svg" alt="Telegram" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                        <!-- Medium -->
                        <td style="padding: 0 10px;">
                          <a href="#" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-3-kPfXDvP7jR5Z7um2A64teAPZB6Bkqj.svg" alt="Medium" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0; color: #ffffff; text-align: center; font-family: 'Poppins', Arial, sans-serif;">The OnlyFounders Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Investor Welcome Email
function createInvestorEmailTemplate(data: FormData) {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Exclusive Access | OnlyFounders Investor Waitlist</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <noscript>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* Import Poppins font */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #000000; font-family: 'Poppins', Arial, sans-serif; color: #ffffff;">
  <!-- Main Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000" style="background-color: #000000;">
    <tr>
      <td align="center" valign="top">
        <!-- Content Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000" style="max-width: 600px; width: 100%; background-color: #000000; background-image: radial-gradient(circle at center, #004444 0%, #002C2C 40%, #000000 100%);">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <!-- Logo -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 0;">
                <tr>
                  <td align="center" style="padding-bottom: 60px;">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Founders_Hub_Network_F3AI_OnlyFounders_logo_Blue-QMnVaCSQxLQncK6qLUxNRr6mqlSp7L.svg" alt="OnlyFounders Logo" width="220" style="max-width: 100%; height: auto; display: block; border: 0;">
                  </td>
                </tr>
              </table>

              <!-- Header -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <h1 style="margin-top: 0; margin-bottom: 30px; font-size: 36px; line-height: 1.5; font-weight: 700; text-align: center; color: #ffffff; font-family: 'Poppins', Arial, sans-serif;">Exclusive Access </br> You're On The List!</h1>
                  </td>
                </tr>
              </table>

              <!-- Content -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="left" style="font-family: 'Poppins', Arial, sans-serif;">
                    <p style="font-size: 20px; line-height: 1.5; margin-bottom: 20px; font-weight: 500; color: #ffffff;">Smart Move, Future Backer,</p>
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 400; color: #ffffff;">You're on the waitlist for OnlyFounders - where the next generation of unicorns are getting funded without the traditional VC BS.</p>
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 400; color: #ffffff;">Get ready for direct access to vetted founders disrupting industries.</p>
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 500; color: #ffffff;">While we prepare your access:</p>
                    
                    <!-- List Items -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="10" valign="top" style="padding-right: 0; color: #ffffff; font-size: 18px;">•</td>
                              <td style="color: #ffffff; font-size: 18px; line-height: 1.5; font-family: 'Poppins', Arial, sans-serif; padding-left: 4px;">
                                Follow us <a href="https://x.com/onlyfoundersxyz" style="color: #00F0FF; text-decoration: none; font-weight: 500;">https://x.com/onlyfoundersxyz</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td width="10" valign="top" style="padding-right: 0; color: #ffffff; font-size: 18px;">•</td>
                              <td style="color: #ffffff; font-size: 18px; line-height: 1.5; font-family: 'Poppins', Arial, sans-serif; padding-left: 4px;">
                                Join our investor community: <a href="https://t.me/founders_hub_network" style="color: #00F0FF; text-decoration: none; font-weight: 500;">https://t.me/founders_hub_network</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 18px; line-height: 1.5; margin-bottom: 20px; font-weight: 400; color: #ffffff;">We're changing how startups get funded. Be part of it.</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="height: 1px; background-color: #00c2ff; opacity: 0.5;"></td>
                </tr>
              </table>

              <!-- Social Media -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <!-- LinkedIn -->
                        <td style="padding: 0 10px;">
                          <a href="#" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-vtKyCgIfLm8tQU7PVcCqFgGRNKOIzb.svg" alt="LinkedIn" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                        <!-- GitHub -->
                        <td style="padding: 0 10px;">
                          <a href="#" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-1-InwOHhSKdWHpLzWVO6RC6XfZPNXT6o.svg" alt="GitHub" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                        <!-- Medium -->
                        <td style="padding: 0 10px;">
                          <a href="#" style="text-decoration: none;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linkedin-app-icon%20%281%29-3-kPfXDvP7jR5Z7um2A64teAPZB6Bkqj.svg" alt="Medium" width="45" height="45" style="display: block; border: 0;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0; color: #ffffff; text-align: center; font-family: 'Poppins', Arial, sans-serif;">The OnlyFounders Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Send Form Data (Notify Admin)
export async function sendFormData(data: FormData) {
  return await sendEmail(
    data,
    process.env.RECEIVER_ADDRESS!,
    `New Submission: ${data.name}`,
    createAdminEmailTemplate(data)
  );
}

// Send Confirmation Email (Founder/Investor)
export async function sendConfirmationEmail(data: FormData) {
  if (!data.email) {
    console.error("User email is missing.");
    return { success: false, error: "User email is missing." };
  }

  const emailContent =
    data.role === "Founder (Tired of VC BS)"
      ? createFounderEmailTemplate(data)
      : createInvestorEmailTemplate(data);

  return await sendEmail(
    data,
    data.email.trim(),
    `Welcome to OnlyFounders - ${data.role} Access`,
    emailContent
  );
}

// Generic Email Sending Function
async function sendEmail(data: FormData, recipient: string, subject: string, htmlContent: string) {
  try {
    const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
    const senderEmail = process.env.SENDER_ADDRESS;

    if (!connectionString || !senderEmail) {
      throw new Error("Azure Communication Services configuration missing.");
    }

    const emailClient = new EmailClient(connectionString);

    const message: EmailMessage = {
      senderAddress: senderEmail,
      content: { subject, html: htmlContent },
      recipients: { to: [{ address: recipient }] },
    };

    const poller = await emailClient.beginSend(message);
    const response = await poller.pollUntilDone();

    console.log(`Email sent to ${recipient}:`, response.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

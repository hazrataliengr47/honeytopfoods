import "dotenv/config";
import  {sendEmail}  from "./utils/sendEmail.js";

const testEmail = async () => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "HoneyTop Foods - Email Test",
      text: "Success! Your HoneyTop Foods backend can send emails.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #d4a017;">HONEYTOP FOODS</h2>
          <p>Your email configuration is working successfully!</p>
          <p>We are preparing customer email OTP login.</p>
        </div>
      `,
    });

    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

testEmail();
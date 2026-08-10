const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetCodeEmail = async (email, code) => {
  const { data, error } = await resend.emails.send({
    from: "BiteThat <onboarding@resend.dev>",
    to: [email],
    subject: "BiteThat Password Reset Code",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
      ">

        <h2 style="margin-bottom: 20px;">
          BiteThat Password Reset
        </h2>

        <p>
          You requested to reset your BiteThat account password.
        </p>

        <p>
          Your one-time password reset code is:
        </p>

        <div style="
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 10px;
          margin: 30px 0;
        ">
          ${code}
        </div>

        <p>
          This code will expire in
          <strong>5 minutes</strong>.
        </p>

        <p>
          If you didn't request a password reset,
          you can safely ignore this email.
        </p>

        <p style="margin-top: 30px;">
          — BiteThat Team
        </p>

      </div>
    `,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Failed to send reset email");
  }

  console.log("Reset email sent:", data?.id);

  return data;
};

module.exports = {
  sendResetCodeEmail,
};
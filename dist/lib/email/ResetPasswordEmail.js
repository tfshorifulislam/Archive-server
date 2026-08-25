export function resetPasswordTemplate(userName, resetUrl) {
    return `
    <!DOCTYPE html>
    <html>
      <body style="
        margin:0;
        padding:40px 0;
        background:#f4f4f5;
        font-family:Arial,sans-serif;
      ">

        <div style="
          max-width:500px;
          margin:auto;
          background:white;
          padding:40px;
          border-radius:12px;
        ">

          <h1 style="
            color:#18181b;
            margin-bottom:24px;
          ">
            Reset your password
          </h1>

          <p style="
            font-size:16px;
            color:#52525b;
          ">
            Hi ${userName},
          </p>

          <p style="
            font-size:16px;
            line-height:24px;
            color:#52525b;
          ">
            We received a request to reset your password.
            Click the button below to create a new password.
          </p>

          <div style="
            text-align:center;
            margin:32px 0;
          ">
            <a
              href="${resetUrl}"
              style="
                display:inline-block;
                background:#18181b;
                color:white;
                padding:12px 24px;
                border-radius:8px;
                text-decoration:none;
                font-weight:600;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="
            font-size:13px;
            line-height:20px;
            color:#71717a;
          ">
            If you didn't request a password reset, you can safely ignore
            this email.
          </p>

          <p style="
            font-size:14px;
            color:#71717a;
            margin-top:30px;
          ">
            Thanks,<br />
            The MyApp Team
          </p>

        </div>

      </body>
    </html>
  `;
}

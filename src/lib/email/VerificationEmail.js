export function verifyEmailTemplate(userName, verificationUrl) {
    return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:40px 0;background:#f4f4f5;font-family:Arial,sans-serif;">
        
        <div style="
          max-width:500px;
          margin:auto;
          background:white;
          padding:40px;
          border-radius:12px;
        ">

          <h1 style="color:#18181b;">
            Verify your email
          </h1>

          <p style="font-size:16px;color:#52525b;">
            Hi ${userName},
          </p>

          <p style="font-size:16px;line-height:24px;color:#52525b;">
            Thanks for creating an account with MyApp.
            Please verify your email address to activate your account.
          </p>

          <div style="text-align:center;margin:32px 0;">
            <a
              href="${verificationUrl}"
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
              Verify Email
            </a>
          </div>

          <p style="font-size:13px;color:#71717a;">
            If you didn't create this account, you can safely ignore this email.
          </p>

          <p style="font-size:14px;color:#71717a;">
            Thanks,<br />
            The MyApp Team
          </p>

        </div>

      </body>
    </html>
  `;
}

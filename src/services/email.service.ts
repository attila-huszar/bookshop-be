import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: Bun.env.MAILER_USER,
    pass: Bun.env.MAILER_PASS,
  },
})

export function sendEmail(
  to: string,
  firstName: string,
  codeLink: string,
  baseLink: string,
  type: 'verification' | 'passwordReset',
) {
  const subject = {
    verification: 'Book Shop - Verify your email address',
    passwordReset: 'Book Shop - Forgotten Password',
  }[type]

  const text = {
    verification: `Hello ${firstName},
      Please click ${codeLink} to verify your email address.
      If the above link doesn't work, copy and paste it to your browser's address bar.
      These links are valid for 24 hours.
      Book Shop Team`,
    passwordReset: `Hello ${firstName},
      Please click ${codeLink} to reset your password.
      If the above link doesn't work, copy and paste it to your browser's address bar.
      These links are valid for 24 hours.
      Book Shop Team`,
  }[type]

  const html = {
    verification: `<p style="font-size: 14pt;">Hello <strong>${firstName}</strong>,</p>
      <p style="font-size: 14pt; margin-bottom: 2rem;">Please verify your email address by clicking this <a href="${codeLink}" target="_blank" rel="noopener"><strong>link</strong></a>.</p>
      <p>If the above link doesn't work, copy and paste this to your browser's address bar:</p>
      <p>${codeLink}</p>
      <p style="margin-bottom: 2rem;"><em>These links are valid for 24 hours</em></p>
      <p style="font-size: 14pt;"><strong>Book Shop Team</strong></p>
      <p><a href="${baseLink}" target="_blank" rel="noopener"><img src="cid:194604053023767737" alt="logo" /></a></p>`,
    passwordReset: `<p style="font-size: 14pt;">Hello <strong>${firstName}</strong>,</p>
      <p style="font-size: 14pt; margin-bottom: 2rem;">Please click this <a href="${codeLink}" target="_blank" rel="noopener"><strong>link</strong></a> to reset your password.</p>
      <p>If the above link doesn't work, copy and paste this to your browser's address bar:</p>
      <p>${codeLink}</p>
      <p style="margin-bottom: 2rem;"><em>These links are valid for 24 hours</em></p>
      <p style="font-size: 14pt;"><strong>Book Shop Team</strong></p>
      <p><a href="${baseLink}" target="_blank" rel="noopener"><img src="cid:194604053023767737" alt="logo" /></a></p>`,
  }[type]

  const mailOptions = {
    from: Bun.env.MAILER_USER,
    to,
    subject,
    text,
    html,
    attachments: [
      {
        filename: 'logo.png',
        path: process.cwd() + '/src/assets/images/logo.png',
        contentType: 'image/png',
        cid: '194604053023767737',
      },
    ],
  }

  return transporter.sendMail(mailOptions)
}

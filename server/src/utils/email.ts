import { env } from '../config/env.js';
import logger from './logger.js';

export const sendPasswordResetOtpEmail = async (
  toEmail: string,
  userName: string,
  otp: string
): Promise<void> => {
  if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL) {
    logger.error('BREVO_API_KEY or BREVO_SENDER_EMAIL is not configured.');
    throw new Error('Email service is not configured on the server.');
  }

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700;">ResumeAI</h2>
        <p style="margin: 6px 0 0; color: #64748b; font-size: 14px;">Password Reset Verification</p>
      </div>
      <div style="background-color: #ffffff; padding: 28px 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 16px; color: #334155; font-size: 15px;">Hi <strong>${userName}</strong>,</p>
        <p style="margin: 0 0 24px; color: #475569; font-size: 14px; line-height: 1.6;">
          We received a request to reset your ResumeAI account password. Enter the 6-digit verification code below to proceed:
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; padding: 14px 28px; font-size: 28px; font-weight: 700; letter-spacing: 8px; color: #1d4ed8; background-color: #eff6ff; border: 1px dashed #93c5fd; border-radius: 12px;">
            ${otp}
          </span>
        </div>
        <p style="margin: 24px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">
          This code will expire in <strong>10 minutes</strong>. If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: env.BREVO_SENDER_NAME,
        email: env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: toEmail, name: userName }],
      subject: `${otp} is your ResumeAI password reset code`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    logger.error(`Brevo API error (${response.status}): ${errorBody}`);
    throw new Error('Failed to send OTP email. Please try again later.');
  }
};

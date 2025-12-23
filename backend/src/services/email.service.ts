import nodemailer from 'nodemailer';
import env from '../config/env';
import prisma from '../config/database';

let transporter: nodemailer.Transporter | null = null;

if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  if (!transporter) {
    console.warn('Email service not configured. Skipping email send.');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const info = await transporter.sendMail({
      from: env.EMAIL_FROM || env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    // Log email notification
    await prisma.emailNotification.create({
      data: {
        recipientEmail: options.to,
        type: 'custom',
        subject: options.subject,
        body: options.html,
        status: 'sent',
        sentAt: new Date(),
      },
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);

    // Log failed email
    await prisma.emailNotification.create({
      data: {
        recipientEmail: options.to,
        type: 'custom',
        subject: options.subject,
        body: options.html,
        status: 'failed',
      },
    });

    return { success: false, error };
  }
};

export const sendApplicationReceivedEmail = async (applicantEmail: string, jobTitle: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Application Received</h2>
      <p>Thank you for applying to <strong>${jobTitle}</strong> at Tapmad.</p>
      <p>We have received your application and our team will review it shortly.</p>
      <p>You will be notified of any updates regarding your application.</p>
      <br>
      <p>Best regards,<br>Tapmad HR Team</p>
    </div>
  `;

  return sendEmail({
    to: applicantEmail,
    subject: `Application Received - ${jobTitle}`,
    html,
  });
};

export const sendStatusUpdateEmail = async (
  applicantEmail: string,
  jobTitle: string,
  status: string
) => {
  const statusMessages: Record<string, string> = {
    shortlisted: 'Congratulations! Your application has been shortlisted.',
    rejected: 'Thank you for your interest. Unfortunately, we will not be moving forward with your application.',
    interview_scheduled: 'Great news! We would like to schedule an interview with you.',
    offer_extended: 'Congratulations! We are pleased to extend an offer to you.',
    hired: 'Welcome to Tapmad! We are excited to have you join our team.',
  };

  const message = statusMessages[status] || 'Your application status has been updated.';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Application Status Update</h2>
      <p>Regarding your application for <strong>${jobTitle}</strong>:</p>
      <p>${message}</p>
      <p>Please log in to your account to view more details.</p>
      <br>
      <p>Best regards,<br>Tapmad HR Team</p>
    </div>
  `;

  return sendEmail({
    to: applicantEmail,
    subject: `Application Update - ${jobTitle}`,
    html,
  });
};


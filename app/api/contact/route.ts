import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { headers } from 'next/headers';

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security: Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per 15 minutes)
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 5) {
    return false; // Rate limit exceeded
  }

  limit.count++;
  return true;
}

// Security: Input validation and sanitization
function validateAndSanitize(data: any) {
  const errors: string[] = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Nom invalide');
  } else if (data.name.length < 2 || data.name.length > 100) {
    errors.push('Le nom doit contenir entre 2 et 100 caractères');
  } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(data.name)) {
    errors.push('Le nom contient des caractères invalides');
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email invalide');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Format d\'email invalide');
  } else if (data.email.length > 255) {
    errors.push('Email trop long');
  }

  // Phone validation (optional)
  if (data.phone && typeof data.phone === 'string') {
    if (!/^[\d\s+()-]{8,20}$/.test(data.phone)) {
      errors.push('Format de téléphone invalide');
    }
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message invalide');
  } else if (data.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  } else if (data.message.length > 5000) {
    errors.push('Le message est trop long (max 5000 caractères)');
  }

  // Security: Check for honeypot field (should be empty)
  if (data.website && data.website !== '') {
    errors.push('Spam détecté');
  }

  // Security: Check timestamp (form should take at least 3 seconds to fill)
  if (data.timestamp) {
    const timeTaken = Date.now() - parseInt(data.timestamp);
    if (timeTaken < 3000) {
      errors.push('Soumission trop rapide');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name: data.name?.trim().substring(0, 100),
      email: data.email?.trim().toLowerCase().substring(0, 255),
      phone: data.phone?.trim().substring(0, 20),
      service: data.service?.trim().substring(0, 100),
      message: data.message?.trim().substring(0, 5000),
    }
  };
}

// Security: Detect spam patterns
function detectSpam(message: string): boolean {
  const spamPatterns = [
    /viagra/i,
    /cialis/i,
    /casino/i,
    /lottery/i,
    /winner/i,
    /click here/i,
    /buy now/i,
    /(http|https):\/\/.*\.(ru|cn|tk)/i, // Suspicious domains
  ];

  return spamPatterns.some(pattern => pattern.test(message));
}

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Security: Get client IP for rate limiting
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';

    // Security: Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans 15 minutes.' },
        { status: 429 }
      );
    }

    // Parse request body
    const data = await request.json();

    // Security: Validate and sanitize input
    const validation = validateAndSanitize(data);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation échouée', details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = validation.sanitized;

    // Security: Spam detection
    if (detectSpam(message)) {
      console.warn(`Spam detected from IP: ${ip}`);
      return NextResponse.json(
        { error: 'Message détecté comme spam' },
        { status: 400 }
      );
    }

    // Security: Verify SMTP configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration missing');
      return NextResponse.json(
        { error: 'Configuration email manquante' },
        { status: 500 }
      );
    }

    // Email to business (Simple & Professional)
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Nouveau Contact: ${service || 'Demande Générale'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: #667eea; color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
            .content { padding: 40px 30px; }
            .field { margin-bottom: 25px; }
            .label { font-size: 12px; font-weight: 600; color: #667eea; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .value { color: #333; font-size: 15px; line-height: 1.5; }
            .value a { color: #667eea; text-decoration: none; }
            .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 3px solid #667eea; margin-top: 8px; white-space: pre-wrap; }
            .divider { height: 1px; background: #e9ecef; margin: 25px 0; }
            .footer { background: #f8f9fa; padding: 25px 30px; text-align: center; color: #6c757d; font-size: 13px; }
            .info-box { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 25px; font-size: 12px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouveau Message de Contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nom Complet</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${phone ? `
                <div class="field">
                  <div class="label">Téléphone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
              ` : ''}
              
              ${service ? `
                <div class="field">
                  <div class="label">Service Demandé</div>
                  <div class="value">${service}</div>
                </div>
              ` : ''}
              
              <div class="divider"></div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>

              
            </div>
            <div class="footer">
              <strong>JBH ENGINEERING</strong><br>
              Bureau d'Études Techniques<br>
              Agadir, Maroc
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Auto-reply to user (Simple & Professional)
    const autoReplyOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: 'Message Reçu - JBH Engineering',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: #667eea; color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .content { padding: 40px 30px; }
            .content p { margin: 0 0 20px 0; color: #333; }
            .summary { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 3px solid #667eea; }
            .summary p { margin: 0 0 12px 0; }
            .summary p:last-child { margin: 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; }
            .footer p { margin: 0 0 15px 0; color: #6c757d; font-size: 14px; }
            .contact-info { margin-top: 20px; }
            .contact-info a { color: #667eea; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Message Bien Reçu</h1>
            </div>
            <div class="content">
              <p>Bonjour <strong>${name}</strong>,</p>
              
              <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et notre équipe vous répondra dans les <strong>24 heures</strong>.</p>
              
              <div class="summary">
                <p><strong>Résumé de votre demande:</strong></p>
                ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
                <p><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
              </div>

              <p>En attendant notre réponse, n'hésitez pas à consulter notre portfolio ou à nous appeler directement.</p>
            </div>
            <div class="footer">
              <p><strong>JBH ENGINEERING</strong><br>
              Bureau d'Études Techniques</p>
              <div class="contact-info">
                <p>
                  <a href="tel:+212661858581">+212 661 85 85 81</a><br>
                  <a href="mailto:Contact@jbh.ma">Contact@jbh.ma</a><br>
                  <a href="https://jbh.ma">www.jbh.ma</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

// Security: Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
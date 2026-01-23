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
    // Reset or create new limit (50 requests per 15 minutes - increased for development)
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 50) {
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
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Do not fail on invalid certs (for self-signed certificates)
    rejectUnauthorized: false,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
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

    // Email to business (Simple & Professional - Plain)
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Nouveau Contact: ${service || 'Demande Générale'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: bold; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; margin-bottom: 5px; }
            .value { margin-left: 10px; }
            .message-box { border: 1px solid #000; padding: 15px; margin-top: 10px; white-space: pre-wrap; }
            .footer { border-top: 1px solid #000; padding-top: 15px; margin-top: 30px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouveau Message de Contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nom Complet:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              ${phone ? `
                <div class="field">
                  <div class="label">Téléphone:</div>
                  <div class="value">${phone}</div>
                </div>
              ` : ''}
              
              ${service ? `
                <div class="field">
                  <div class="label">Service Demandé:</div>
                  <div class="value">${service}</div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
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

    // Auto-reply to user (Simple & Professional - Plain)
    const autoReplyOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: 'Message Reçu - JBH Engineering',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: bold; }
            .content p { margin: 0 0 15px 0; }
            .summary { border: 1px solid #000; padding: 15px; margin: 20px 0; }
            .summary p { margin: 0 0 10px 0; }
            .summary p:last-child { margin: 0; }
            .footer { border-top: 1px solid #000; padding-top: 15px; margin-top: 30px; text-align: center; }
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
              <p>
                +212 661 85 85 81<br>
                Contact@jbh.ma<br>
                www.jbh.ma
              </p>
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
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
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
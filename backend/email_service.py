import os
import asyncio
import logging
import resend
from typing import Dict
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'info@belkgroup.be')
SENDER_EMAIL = "onboarding@resend.dev"

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
    logger.info(f"Resend configured - emails will be sent to {CONTACT_EMAIL}")

async def send_contact_email(contact_data: Dict) -> bool:
    """Send contact form data via Resend email service"""
    
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured - email not sent")
        logger.info(f"Contact form received from: {contact_data.get('name')} <{contact_data.get('email')}>")
        return False
    
    # Create HTML email body
    html_content = f"""
    <html>
      <head></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #1e3a8a 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau Message de Contact</h1>
            <p style="color: #e0f2fe; margin: 10px 0 0 0;">BelkGroup - Formulaire de contact</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #06b6d4; margin-top: 0; font-size: 18px;">Informations du contact</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 140px; color: #374151;">Nom:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">{contact_data.get('name', 'N/A')}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:{contact_data.get('email', '')}" style="color: #06b6d4; text-decoration: none;">{contact_data.get('email', 'N/A')}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Téléphone:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">{contact_data.get('phone', 'Non fourni')}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Code postal:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">{contact_data.get('postalCode', 'Non fourni')}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Sujet:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">{contact_data.get('subject', 'N/A')}</td>
              </tr>
            </table>
            
            <h3 style="color: #06b6d4; margin-top: 25px; font-size: 16px;">Message:</h3>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <p style="margin: 0; white-space: pre-wrap; color: #374151;">{contact_data.get('message', 'N/A')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">Ce message a été envoyé depuis le formulaire de contact de belkgroup.be</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    """
    
    subject = f"Nouveau contact - {contact_data.get('subject', 'Demande de devis')}"
    
    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_EMAIL],
        "subject": subject,
        "html": html_content,
        "reply_to": contact_data.get('email', '')
    }

    try:
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully to {CONTACT_EMAIL}, ID: {email.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

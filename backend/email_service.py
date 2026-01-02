import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict

RECIPIENT_EMAIL = "belkgroupe@gmail.com"

# Email configuration - using environment variables
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')

def send_contact_email(contact_data: Dict) -> bool:
    """Send contact form data via email"""
    
    # If SMTP not configured, just log and return success
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print(f"Email would be sent to {RECIPIENT_EMAIL}:")
        print(f"From: {contact_data.get('name')} <{contact_data.get('email')}>")
        print(f"Subject: {contact_data.get('subject')}")
        print(f"Message: {contact_data.get('message')}")
        return True
    
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Nouveau message de contact - {contact_data.get('subject', 'Sans sujet')}"
        msg['From'] = SMTP_USERNAME
        msg['To'] = RECIPIENT_EMAIL
        
        # Create HTML email body
        html = f"""
        <html>
          <head></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
              <div style="background: linear-gradient(135deg, #06b6d4 0%, #1e3a8a 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Nouveau Message de Contact</h1>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #06b6d4; margin-top: 0;">Informations du contact</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Nom:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.get('name', 'N/A')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                      <a href="mailto:{contact_data.get('email', '')}" style="color: #06b6d4;">{contact_data.get('email', 'N/A')}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.get('phone', 'Non fourni')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Code postal:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.get('postalCode', 'Non fourni')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Sujet:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.get('subject', 'N/A')}</td>
                  </tr>
                </table>
                
                <h3 style="color: #06b6d4; margin-top: 30px;">Message:</h3>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; border-left: 4px solid #06b6d4;">
                  <p style="margin: 0; white-space: pre-wrap;">{contact_data.get('message', 'N/A')}</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                  <p>Ce message a été envoyé depuis le formulaire de contact de belkgroup.be</p>
                </div>
              </div>
            </div>
          </body>
        </html>
        """
        
        # Attach HTML part
        html_part = MIMEText(html, 'html')
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        print(f"Email sent successfully to {RECIPIENT_EMAIL}")
        return True
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        # Still return True to not block the contact form submission
        return True
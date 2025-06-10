import smtplib
from email.mime.text import MIMEText

# Email content
subject = "Email Subject"
body = "This is the body of the text message"
sender = "elmandilimail@gmail.com"
recipients = ["recipient1@gmail.com", "recipient2@gmail.com", "recipient3@gmail.com"]  # List of recipients
password = "xrvc vhil oprz mdeb"

def send_bulk_emails(subject, body, sender, recipients, password):
    # Connect to Gmail's SMTP server using SSL
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(sender, password)  # Log in to the server

        # Loop over each recipient and send them an individual email
        for recipient in recipients:
            msg = MIMEText(body)  # Create a MIMEText object with the email body
            msg['Subject'] = subject  # Set the email's subject
            msg['From'] = sender  # Set the sender
            msg['To'] = recipient  # Set the current recipient

            smtp_server.sendmail(sender, recipient, msg.as_string())  # Send the email
            print(f"Message sent to {recipient}!")

# Call the function to send bulk emails
send_bulk_emails(subject, body, sender, recipients, password)
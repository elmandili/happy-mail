from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import base64
import smtplib


# Gmail credentials
sender = "lasrysafia1@gmail.com"
password = "zcxe tnin rhfh llsf"



def send_mail(html_content, receipients, image_base64):
    msg = MIMEMultipart('related')
    msg['Subject'] = "Your Subject"
    msg['From'] = sender
    msg['To'] = ", ".join(receipients)  # Set once here

    # Reference the image with cid in HTML
    html = html_content.replace(
        "BASE64_PLACEHOLDER",
        "cid:embedded_image"
    )
    msg.attach(MIMEText(html, 'html'))

    # Attach the image using the base64 string
    img_data = base64.b64decode(image_base64)
    image = MIMEImage(img_data, _subtype="png")
    image.add_header('Content-ID', '<embedded_image>')
    msg.attach(image)
    
    # Send to all recipients at once
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.sendmail(sender, receipients, msg.as_string())
    
def get_base64_of_image(image_path):
    with open(image_path, "rb") as img_file:
        encoded_string = base64.b64encode(img_file.read()).decode("utf-8")
    return encoded_string
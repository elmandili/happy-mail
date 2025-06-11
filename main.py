import ai
import mail

def run():
    image_base64 = ai.generate_image(image_prompt="little sheep hugging his mother")

    # 2. Use a placeholder in your prompt
    prompt = (
        "Write a 2-paragraph story about a little lost sheep. "
        "His mother found him afterwards. "
        "Give the story as HTML, CSS "
        "Don't give any other output more than needed. "
        "Start writing the HTML tags directly. "
        "The structure is: emoji, title, paragraph 1, paragraph 2, base64img, quote. "
        "For the image, use <img src='BASE64_PLACEHOLDER'> as a placeholder."
        "<html> <body style='font-family:sans-serif;'> <div style='font-size:48px;'> emoji </div> <h2>title</h2> <p>paragraph 1</p> <p>paragraph 2</p> <blockquote style='font-style:italic;color:#555;'>“Quote”</blockquote> <img src='BASE64_PLACEHOLDER' alt='' style='max-width:400px;display:block;margin:20px 0;'> </body> </html>"
        "then create antoher one under it for transation to the needed language, for now translate it to french"
    )

    # 3. Get the response
    response = ai.generate_text(prompt)



    # 5. Send the email
    mail.send_mail( response.output_text, ["elmandilimail@gmail.com"], image_base64=mail.get_base64_of_image("otter.png"))
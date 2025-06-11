from openai import OpenAI
from dotenv import load_dotenv
import base64
import os

load_dotenv()
CHATGPT_API = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key = CHATGPT_API)


def generate_text(prompt):
    return client.responses.create(
        model="gpt-4.1",
        input=prompt
    )

def generate_image(image_prompt):
    response = client.responses.create(
    model="gpt-4.1-mini",
    input=image_prompt,
    tools=[{"type": "image_generation"}],
    )

    print(response)

    # Save the image to a file
    image_data = [
        output.result
        for output in response.output
        if output.type == "image_generation_call"
    ]
    image_base64 = "" 
    if image_data:
        image_base64 = image_data[0]
        with open("otter.png", "wb") as f:
            f.write(base64.b64decode(image_base64))
    print("image generated")
    return image_base64





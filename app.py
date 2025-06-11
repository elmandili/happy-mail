from flask import Flask, render_template, request, redirect, flash
import ai
import mail
import main

app = Flask(__name__)
app.secret_key = "your_secret_key"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        recipient = request.form["recipient"]
        image_prompt = request.form["image_prompt"]
        story_prompt = request.form["story_prompt"]

        # Generate image and story
        main.run()

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
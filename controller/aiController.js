import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';
import readline from 'readline';
import Together from "together-ai";
import { sendMail } from "./mailController.js";
dotenv.config();


const token = process.env["GITHUB_TOKEN"];
const togetherToken = process.env["TOGETHER_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
);

const together = new Together({
    apiKey: togetherToken
})


export const generateStory = async (prompt) =>{
    // const {story_prompt} = req.query
    const system_prompt = `
    you are generating a story to be sent in html format in email, give directly the html tags and the css without any additional text
    the story should contain at least 5 paragraphs and the html contains 1 image, in img src type image_place_holder it will be reaplced later <img src="image_place_holder" alt="A young girl practicing dance"/> 
    but output it on a single line without any \\n or line breaks. 
    <img src="image_place_holder" alt="A young girl practicing dance"/> 
    give good css to the mail and good css to the paragraphs, in the end add a quote
    `
    const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: system_prompt },
            { role: "user", content: prompt }
          ],
          temperature: 1,
          top_p: 1,
          model: model
        }
      });
    
      if (isUnexpected(response)) {
        throw response.body.error;
      }
    
      console.log("story generated");
    //   res.status(200).json({story: response.body.choices[0].message.content});
    return response.body.choices[0].message.content;
}


export const generateImage = async(prompt)=>{
    const response = await together.images.create({
    model: "black-forest-labs/FLUX.1-schnell-Free",
    prompt: prompt,
    });
    console.log(response.data[0]);
    return response.data[0].url;
}

export const generateEmail = async (req, res)=>{
    console.log("generating email")
    try {

        const {story_prompt} = req.body;
        const {image_prompt} = req.body;
        const {receipient} = req.body;
        console.log(story_prompt)

        if(!story_prompt){
            return res.status(400).json({message: "no story prompt inserted"});
        }

        if(!image_prompt){
            return res.status(400).json({message: "no image prompt inserted"});
        }

        const story = await generateStory(story_prompt);
        const imageUrl = await generateImage(image_prompt);
        const email = story.replace("image_place_holder", imageUrl)
        // email = email.replace('\"', '"')
        sendMail(email, receipient);
        // res.status(200).json({story: story, imageUrl: imageUrl, email: email})
        return res.status(200).render("story-page", {email: email});
    } catch (error) {
        return res.status(400).json({message: "internal server error",error: error});
    }
   
}
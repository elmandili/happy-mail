import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';
import readline from 'readline';
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";
const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
);

function askUser(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

export async function generateText(prompt) {
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "" },
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

  console.log(response.body.choices[0].message.content);
}

async function main() {
  const userPrompt = await askUser("Enter your prompt: ");
  await generateText(userPrompt);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
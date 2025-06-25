import Together from "together-ai";

const together = new Together({apiKey: "ef30ba8d24ab9d0f0bd50be4d57ebda2074c7081c36c5a222d0f3f99e90a7624"});

const response = await together.images.create({
  model: "black-forest-labs/FLUX.1-schnell-Free",
  prompt: "Cats eating popcorn",
  width: 240,
  height: 240
});
console.log(response.data[0]);
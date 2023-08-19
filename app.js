require("dotenv").config();

const OpenAI = require("openai");
const readline = require("readline");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const systemMessage = "Put your systemMessage here...";

// Your desired prefix and suffix
const prefix = "Put your prefix here...";
const suffix = " Put your suffix here...";

async function promptUser() {
  rl.question("Please type the content for the prompt: ", async (userInput) => {
    // Wrap the user's input with the prefix and suffix
    const combinedInput = prefix + userInput + suffix;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: combinedInput },
        ],
        max_tokens: 1000, // Adjust as needed
        temperature: 0.3, // Adjust as needed
      });

      console.log("ChatGPT response:", completion.choices[0].message.content);

      // Prompt the user again after displaying the completion
      promptUser();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
}

// Start the initial prompt
promptUser();

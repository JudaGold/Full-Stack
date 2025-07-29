import OpenAI from "openai";
import { env } from "process";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [
  { role: "system", content: "You are a middle-school teacher" },
  { role: "user", content: "Please explain quantom Computing to me" },
];

const response = await client.responses.create({
  model: "gpt-4o-mini",
  input: messages,
});

console.log(response.output_text);

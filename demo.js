import Groq from "groq-sdk";
import fs from "fs";
import readline from "readline";

const soul = fs.readFileSync("./SOUL.md", "utf-8");
const rules = fs.readFileSync("./RULES.md", "utf-8");
const patterns = fs.readFileSync("./knowledge/incident-patterns.md", "utf-8");
const playbooks = fs.readFileSync("./knowledge/playbooks.md", "utf-8");

const coreSkills = ["scenario-architect", "inject-engine", "response-evaluator"]
  .map((s) => fs.readFileSync(`./skills/${s}/SKILL.md`, "utf-8"))
  .join("\n\n---\n\n");

const systemPrompt = `${soul}\n\n${rules}\n\n# Core Skills\n${coreSkills}\n\n# Knowledge\n${patterns}\n\n${playbooks}`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const messages = [{ role: "system", content: systemPrompt }];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function chat(userMessage) {
  messages.push({ role: "user", content: userMessage });

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.8,
    max_tokens: 4096,
    stream: true,
  });

  let fullResponse = "";
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content);
    fullResponse += content;
  }
  console.log("\n");

  messages.push({ role: "assistant", content: fullResponse });
}

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  CRUCIBLE — Tabletop Exercise");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log('  Type your responses. Type "quit" to exit.');
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

const firstPrompt =
  process.argv[2] ||
  "I'm the on-call engineer at an e-commerce company. Our stack: Node.js API on Kubernetes, PostgreSQL database, Redis cache, Stripe payment integration, serving 50k requests per minute at peak. Run me through a tabletop exercise at Intermediate difficulty.";

await chat(firstPrompt);

while (true) {
  const input = await ask("⚡ Your decision: ");
  if (!input || input.toLowerCase() === "quit") {
    console.log("\n━━━ Exercise ended. Stay sharp. ━━━\n");
    rl.close();
    break;
  }
  await chat(input);
}

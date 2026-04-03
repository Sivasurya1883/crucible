import Groq from "groq-sdk";
import fs from "fs";

const soul = fs.readFileSync("./SOUL.md", "utf-8");
const rules = fs.readFileSync("./RULES.md", "utf-8");
const patterns = fs.readFileSync("./knowledge/incident-patterns.md", "utf-8");
const playbooks = fs.readFileSync("./knowledge/playbooks.md", "utf-8");

const coreSkills = ["scenario-architect", "inject-engine", "response-evaluator"]
  .map((s) => fs.readFileSync(`./skills/${s}/SKILL.md`, "utf-8"))
  .join("\n\n---\n\n");

const systemPrompt = `${soul}\n\n${rules}\n\n# Core Skills\n${coreSkills}\n\n# Knowledge\n${patterns}\n\n${playbooks}`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const userPrompt =
  process.argv[2] ||
  "I'm the on-call engineer at an e-commerce company. Our stack: Node.js API on Kubernetes, PostgreSQL database, Redis cache, Stripe payment integration, serving 50k requests per minute at peak. Run me through a tabletop exercise at Intermediate difficulty.";

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  CRUCIBLE — Tabletop Exercise Starting...");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

const stream = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
  temperature: 0.8,
  max_tokens: 4096,
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";
  process.stdout.write(content);
}

console.log("\n");

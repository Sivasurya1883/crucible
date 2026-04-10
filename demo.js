import Groq from "groq-sdk";
import fs from "fs";
import readline from "readline";

const soul = fs.readFileSync("./SOUL.md", "utf-8");
const scenarioSkill = fs.readFileSync("./skills/scenario-architect/SKILL.md", "utf-8");
const patterns = fs.readFileSync("./knowledge/incident-patterns.md", "utf-8");

const systemPrompt = `${soul}

# Scenario Design Skill
${scenarioSkill}

# Incident Patterns
${patterns}

# INTERACTION RULES

## Opening Flow
First introduce yourself briefly, then present two paths:

  [A] GUIDED SCENARIO — Ask their role (Developer, Tester, DevOps, SRE, Manager, IC), then present 3-4 scenario options as A/B/C/D.

  [B] BRING YOUR OWN STACK — Ask them to describe their stack, then generate a custom incident.

## Response Format
- EVERY question MUST have lettered options (A, B, C, D).
- User responds with a single letter.
- ONLY exception for free text: choosing role (Path A) or describing stack (Path B).
- After each response, show: evaluation (good/gap), consequence, updated metrics, pressure gauge, then next options.

## Round Format
Each round:
━━━ [T+XX:XX] SITUATION UPDATE ━━━
[Result of last decision]
✅ Good: [strength] OR ⚠️ Gap: [miss]
[New inject/escalation]
Updated Metrics: [2-3 bullet metrics]
[PRESSURE ▓▓░░░░░░░░ XX%]
⏱ Decision Clock: T+XX:XX
Options: A) ... B) ... C) ... D) ...

## Flow
- Run 5-7 rounds of escalating difficulty
- After final round, generate a graded report with scores (Detection, Communication, Decisions, Escalation, Recovery — each X/10), strengths, gaps, overall grade, and recommendations`;

const MODELS = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
let currentModel = 0;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const messages = [{ role: "system", content: systemPrompt }];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function ask(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function chat(userMessage) {
  messages.push({ role: "user", content: userMessage });

  for (let attempt = 0; attempt < MODELS.length; attempt++) {
    const model = MODELS[(currentModel + attempt) % MODELS.length];
    try {
      const stream = await groq.chat.completions.create({
        model,
        messages,
        temperature: 0.8,
        max_tokens: 3072,
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

      if (messages.length > 12) {
        const system = messages[0];
        messages.splice(1, 2);
      }
      return;
    } catch (err) {
      if (err.status === 413 || err.status === 429) {
        console.log(`\n⚠️  Rate limit on ${model}, switching to fallback...\n`);
        currentModel = (currentModel + attempt + 1) % MODELS.length;
        continue;
      }
      throw err;
    }
  }
  console.log("\n❌ All models rate-limited. Wait a few minutes and try again.\n");
  rl.close();
  process.exit(1);
}

console.log("");
await chat("Start the exercise. Introduce yourself and present the two paths.");

while (true) {
  const input = await ask("⚡ ");
  if (!input || input.toLowerCase() === "quit") {
    console.log("\n━━━ Exercise ended. Stay sharp out there. ━━━\n");
    rl.close();
    break;
  }
  await chat(input);
}

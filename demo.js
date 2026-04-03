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

const systemPrompt = `${soul}\n\n${rules}\n\n# Core Skills\n${coreSkills}\n\n# Knowledge\n${patterns}\n\n${playbooks}

# CRITICAL INTERACTION RULES

You MUST follow these interaction rules exactly:

## Opening Flow
When the exercise begins, you MUST first introduce yourself and then present exactly two paths:

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CRUCIBLE — Incident Response Drill Instructor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I am Crucible — a veteran incident commander turned drill instructor.
I've managed hundreds of production incidents and I'm here to train
you for the ones you haven't faced yet.

Choose your exercise path:

  [A] GUIDED SCENARIO
      Tell me your role (Developer, Tester, DevOps/Infra, SRE,
      Engineering Manager, Incident Commander) and I'll generate
      a tailored scenario with realistic challenges for your role.

  [B] BRING YOUR OWN STACK
      Describe your real production environment and tech stack.
      I'll craft a custom incident scenario targeting YOUR actual
      architecture with realistic failure modes.

Enter A or B:
\`\`\`

- If user picks A: Ask them to choose their role from a lettered list. Then based on their role, present 3-4 scenario options as a lettered list (e.g., A) Database Cascade, B) Security Breach, etc). Then run the chosen scenario.
- If user picks B: Ask them to describe their stack in free text. Then generate a scenario targeting their architecture.

## Response Format Rules
- EVERY question you ask the participant MUST include lettered multiple-choice options (A, B, C, D, E).
- The participant will respond with a single letter (A, B, C, D, or E).
- NEVER ask open-ended questions that require the participant to type sentences. The ONLY exceptions where the user types free text are: choosing their role (Path A) and describing their stack (Path B).
- After each participant response, provide: a brief evaluation of their choice (good/gap), the consequence of their action, updated metrics, and the next situation with new lettered options.
- Include a pressure indicator and response timer with each round.

## Exercise Round Format
Each round after the opening MUST follow this structure:

\`\`\`
━━━ [T+XX:XX] SITUATION UPDATE ━━━

[What happened as a result of their last decision]

✅ Good: [what they did well]  OR  ⚠️ Gap: [what they missed]

[New development / inject / escalation]

Updated Metrics:
  • [metric]: [value] [indicator]
  • [metric]: [value] [indicator]

[PRESSURE ▓▓▓▓░░░░░░ XX%]
⏱ Decision Clock: T+XX:XX

What do you do?

  A) [option]
  B) [option]
  C) [option]
  D) [option]

Enter A, B, C, or D:
\`\`\`

## Exercise Flow
- Run 5-7 rounds of escalating difficulty
- After the final round, automatically generate the debrief and graded report
- The report must include: scores per category, strengths, gaps, overall grade, and recommendations`;

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

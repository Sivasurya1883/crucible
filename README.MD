# Crucible

**The flight simulator for on-call engineers.**

Crucible is an AI incident drill instructor that runs adaptive tabletop exercises for engineering teams. Describe your system architecture, and Crucible generates a tailored incident scenario, throws escalating curveballs, plays multiple demanding stakeholders, evaluates your decisions in real-time, and produces a graded after-action report — all in a single interactive session.

> *"The best time to practice an incident is before it happens."*

---

## The Problem

Every engineering team knows they should practice incident response. Almost nobody does.

- **Tabletop exercises require a skilled facilitator** — senior SREs who are expensive, busy, and scarce
- **Exercises take hours to design** — scenarios, escalation paths, evaluation criteria, all custom
- **Teams only practice after a real outage** — the classic post-incident promise that never happens
- **No consistent way to measure improvement** — gut feeling doesn't scale

The result: teams go into real outages cold. They fumble coordination, miss rollback windows, send confusing updates, and make panicked decisions under pressure they've never practiced for.

**Crucible fixes all four problems.** It's an always-available, endlessly patient drill instructor that adapts to your architecture, calibrates difficulty to your skill level, and tracks your improvement over time.

---

## How It Works

```
You: "We run a payment API on Kubernetes. PostgreSQL, Redis, Stripe integration, 50k req/min."

Crucible: Generates a tailored incident → "Payment success rate dropped to 91%. CEO is asking questions."

You: Make decisions as the Incident Commander

Crucible: Throws curveballs → Redis starts failing too. VP wants an ETA. Engineer "fixed" something.

Crucible: Evaluates every decision → Scores detection, communication, decisions, escalation, recovery

Crucible: Runs a structured debrief → "At T+12:00 you hadn't sent a status update. Walk me through why."

Crucible: Produces a graded report → 34/50 (B-), with specific gaps, chaos experiments to run, action items
```

---

## What Makes Crucible Different

| Feature | Description |
|---|---|
| **Adaptive Difficulty** | Adjusts scenario pressure in real-time based on your responses — challenges without overwhelming |
| **Multi-Persona Simulation** | Plays panicking executives, confused support staff, rogue engineers, and hostile vendors with distinct voices |
| **Ghost Incidents** | Sometimes nothing is actually broken — tests your ability to investigate calmly and NOT overreact |
| **Blast Radius Mapping** | Every scenario is grounded in business reality: users impacted, revenue at risk, SLA countdown |
| **Decision Clock** | Tracks your response cadence — in real incidents, speed matters |
| **Stakeholder Satisfaction** | Evaluates how well you managed communication alongside technical response |
| **Chaos Engineering Bridge** | Recommends specific real-world chaos experiments based on gaps found during exercises |
| **Cross-Exercise Memory** | Tracks improvement trends across sessions — shows what's getting better and what's stagnating |
| **Structured Debrief** | Socratic after-action review that draws insights out instead of lecturing |

---

## Agent Structure

Built on the [gitagent](https://github.com/open-gitagent/gitagent) open standard.

```
crucible/
├── agent.yaml                          # Manifest — model, skills, runtime config
├── SOUL.md                             # Identity — veteran IC turned instructor
├── RULES.md                            # Constraints — exercise safety and realism
├── DUTIES.MD                           # Separation — facilitator vs evaluator vs coach
├── AGENTS.md                           # Fallback instructions
│
├── skills/
│   ├── scenario-architect/SKILL.md     # Generates architecture-aware incident scenarios
│   ├── inject-engine/SKILL.md          # Creates adaptive escalations and curveballs
│   ├── response-evaluator/SKILL.md     # Scores decisions against best practices rubric
│   ├── debrief-facilitator/SKILL.md    # Leads blameless after-action review
│   └── exercise-reporter/SKILL.md      # Produces graded report with trends
│
├── workflows/
│   └── tabletop-exercise.yaml          # Full exercise pipeline with data flow
│
├── knowledge/
│   ├── incident-patterns.md            # 20+ real-world failure patterns
│   ├── evaluation-rubric.md            # Standardized scoring criteria
│   ├── playbooks.md                    # Best practice response procedures
│   └── chaos-scenarios.md             # Chaos engineering experiment catalog
│
├── memory/
│   └── MEMORY.md                       # Exercise history and improvement trends
│
└── hooks/
    └── hooks.yaml                      # Exercise lifecycle management
```

---

## Skills Pipeline

Each skill is focused, composable, and follows the [Agent Skills](https://agentskills.io) open standard.

```
┌──────────────────┐     ┌──────────────┐     ┌────────────────────┐
│ scenario-architect│────▶│ inject-engine │────▶│ response-evaluator │
│                  │     │              │     │                    │
│ Generates        │     │ Delivers     │     │ Scores every      │
│ tailored         │     │ adaptive     │     │ decision against   │
│ incident         │     │ curveballs   │     │ best practice     │
│ scenarios        │     │ in real-time │     │ rubric            │
└──────────────────┘     └──────────────┘     └────────────────────┘
                                                       │
                                                       ▼
                         ┌──────────────┐     ┌────────────────────┐
                         │  exercise-   │◀────│ debrief-facilitator│
                         │  reporter    │     │                    │
                         │              │     │ Leads structured   │
                         │ Produces     │     │ after-action       │
                         │ graded       │     │ review with        │
                         │ report       │     │ Socratic method    │
                         └──────────────┘     └────────────────────┘
```

---

## Knowledge Base

Crucible's knowledge base contains real-world incident management expertise:

- **20+ failure patterns** — cascading failures, silent corruption, DNS failures, certificate expiry, split-brain, memory leaks, feature flag misconfigs, credential leaks, DDoS, and ghost incidents
- **Evaluation rubric** — based on PagerDuty, Google SRE, and industry-standard incident management frameworks
- **Response playbooks** — best practice procedures for database, API, security, deployment, and capacity incidents
- **Chaos engineering catalog** — specific, runnable experiments mapped to common exercise gaps

---

## Scenario Categories

| Category | Description | Example |
|---|---|---|
| Cascading Failure | One service death triggers downstream collapse | DB pool exhaustion → API timeout → queue backlog |
| Silent Corruption | Data integrity issues without immediate alerts | Wrong exchange rate applied for 2 hours |
| External Dependency | Third-party service degradation | Payment processor intermittent 503s |
| Deployment Gone Wrong | Config error, bad canary, missing env var | Feature flag misconfiguration affecting 10% |
| Security Incident | Credential leak, unauthorized access, DDoS | API keys committed to public repo |
| Ghost Incident | Nothing is actually broken | DST change shifts metric baselines |
| Capacity Crisis | Traffic spike, resource exhaustion | Viral post drives 20x normal traffic |

---

## Getting Started — Step by Step

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- npm (comes with Node.js)
- git
- An API key from **Anthropic** (recommended) or **OpenAI**

### Step 1: Clone the repository

```bash
git clone https://github.com/Sivasurya1883/crucible.git
cd crucible
```

### Step 2: Validate the agent definition

```bash
npx gitagent validate
npx gitagent info
```

Expected output: all checks pass, 5 skills detected, model and runtime config displayed.

### Step 3: Preview the assembled system prompt

```bash
npx gitagent export -f system-prompt
```

This shows the full system prompt that gitclaw assembles from SOUL.md, RULES.md, skills, and knowledge — the complete agent identity in one view.

### Step 4: Install gitclaw and set your API key

```bash
npm install -g gitclaw

# Claude (recommended — best scenario depth and persona quality)
export ANTHROPIC_API_KEY="your-anthropic-key"

# OR OpenAI
export OPENAI_API_KEY="your-openai-key"
```

### Step 5: Run a tabletop exercise

**Option A — Quick start (single prompt):**

```bash
gitclaw --dir . "Run a tabletop exercise for an e-commerce platform with a Node.js API, PostgreSQL database, Redis cache, and Stripe payment integration serving 50k requests per minute"
```

**Option B — Custom architecture:**

```bash
gitclaw --dir . "I'm an on-call engineer at a fintech startup. Our stack is Kubernetes on AWS, with a Python FastAPI backend, MongoDB, and RabbitMQ. Run me through a tabletop exercise."
```

**Option C — Security-focused drill:**

```bash
gitclaw --dir . "Run a security incident tabletop exercise for a SaaS platform with React frontend, Go microservices, PostgreSQL, and Redis on GCP"
```

### Step 6: Play through the exercise

Crucible will:
1. Present two paths: **Guided Scenario** (pick your role) or **Bring Your Own Stack** (describe your architecture)
2. Generate a tailored incident scenario with metrics, blast radius, and stakeholder pressure
3. Present multiple-choice decisions each round — respond with A, B, C, or D
4. Escalate with curveballs, stakeholder messages, and new complications
5. Run a structured debrief after 5-7 rounds
6. Produce a graded report with scores, gaps, and chaos engineering recommendations

---

## Who Is This For

| Audience | Use Case |
|---|---|
| **SRE / Platform Teams** | Practice incident response without waiting for real pages |
| **Engineering Managers** | Evaluate team readiness, identify training gaps |
| **On-Call Engineers** | Build muscle memory for high-pressure decisions |
| **DevOps Teams** | Test runbook effectiveness before a real incident |
| **Compliance Teams** | Document incident response training (SOC 2, ISO 27001) |
| **Growing Startups** | Onboard engineers who've never been on-call |

---

## License

MIT

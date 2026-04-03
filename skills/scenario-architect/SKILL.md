---
name: scenario-architect
description: "Generates realistic, architecture-aware incident scenarios for tabletop exercises with blast radius mapping and adaptive difficulty"
allowed-tools: Read
metadata:
  author: crucible
  version: "1.0.0"
  category: simulation
---

# Scenario Architect

## Purpose

Design immersive incident scenarios tailored to the participant's actual system architecture. Every scenario must feel like it could happen tomorrow in their production environment.

## Input Requirements

Before generating a scenario, gather from the participant:

1. **System architecture** — services, databases, caches, message queues, external dependencies, approximate traffic volume
2. **Team context** — team size, on-call rotation structure, experience level (junior/mid/senior)
3. **Exercise focus** — what to practice: detection, triage, communication, decision-making, or full lifecycle
4. **Difficulty preference** — Beginner, Intermediate, Advanced, or Adaptive (recommended)

If any input is missing, make reasonable assumptions for a modern cloud-native stack and state them explicitly.

## Scenario Generation Process

1. **Select a failure pattern** from the incident-patterns knowledge base that maps naturally onto the described architecture
2. **Design the initial trigger** — the first alert, metric anomaly, or customer report the participant encounters
3. **Map the blast radius** — which services degrade, how many users are impacted, estimated revenue/minute at risk, SLA countdown
4. **Build the natural timeline** — how the incident evolves over 30-60 minutes if no intervention occurs
5. **Plant 3-5 injects** — escalation events that trigger at specific decision points or time intervals (managed by inject-engine)
6. **Include one ghost element** — a red herring: a correlated-but-unrelated metric spike, a misleading log line, or a false alarm that tests analytical discipline
7. **Define success criteria** — what an ideal response looks like at each phase, for the response-evaluator to reference

## Scenario Categories

Select from these failure archetypes, matching to architecture:

- **Cascading Failure** — one service death triggers downstream collapse (e.g., database connection pool exhaustion → API timeouts → queue backlog → consumer crashes)
- **Silent Corruption** — data integrity issues without immediate alerts (e.g., wrong exchange rate applied to transactions for 2 hours before detection)
- **External Dependency** — third-party degradation (e.g., payment processor returning intermittent 503s, CDN cache poisoning)
- **Deployment Gone Wrong** — config error, missing env var, canary that looked healthy but wasn't (e.g., feature flag misconfiguration affecting 10% of users)
- **Security Incident** — unauthorized access, data exposure, credential leak (e.g., API keys committed to public repo, active exploitation detected)
- **Ghost Incident** — nothing is actually broken but monitoring fires false alarms (e.g., time-zone change causes metric baseline shift, triggering alerts). Tests calm investigation.
- **Capacity Crisis** — traffic spike, resource exhaustion, thundering herd (e.g., viral social media post drives 20x normal traffic)

## Output Format

Present scenarios using this immersive format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CRUCIBLE — TABLETOP EXERCISE INITIATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scenario:    <evocative name>
Category:    <failure archetype>
Difficulty:  <level>
Duration:    <estimated minutes>
Systems:     <affected services>

BLAST RADIUS
├── Users impacted: <estimate>
├── Revenue at risk: <$/minute estimate>
└── SLA window:      <time until breach>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [T+00:00] INITIAL SITUATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<vivid narration of the first alert/symptom>

<monitoring data the participant would realistically see>

Current Metrics:
  • <metric>: <value> (baseline: <normal>)  ⚠️
  • <metric>: <value> (baseline: <normal>)  🔴
  • <metric>: <value> (baseline: <normal>)  ✅

[PRESSURE ░░░░░░░░░░ 10%]

You are the Incident Commander. What's your first move?
```

## Difficulty Calibration

- **Beginner**: Single failure, clear root cause, obvious blast radius, 2 injects
- **Intermediate**: Multi-factor failure, some red herrings, stakeholder pressure, 3 injects
- **Advanced**: Cascading multi-system failure, misleading metrics, competing priorities, hostile stakeholder demands, 4-5 injects
- **Adaptive**: Start at Intermediate, adjust based on response quality within the first 2 rounds

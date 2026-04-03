---
name: exercise-reporter
description: "Produces comprehensive graded exercise reports with scores, gap analysis, trends, and chaos engineering recommendations"
allowed-tools: Read
metadata:
  author: crucible
  version: "1.0.0"
  category: reporting
---

# Exercise Reporter

## Purpose

Synthesize the entire tabletop exercise into a structured, referenceable report. This is the artifact the team keeps — it should be clear enough to share with management, specific enough to drive action, and honest enough to be useful.

## Report Format

Generate the complete report using this structure:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             CRUCIBLE — EXERCISE REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exercise:      <scenario name>
Category:      <failure archetype>
Date:          <date>
Duration:      <actual exercise time>
Difficulty:    <level>
Participant:   <role/description>

━━━━ SCENARIO SUMMARY ━━━━━━━━━━━━━━━━━━━━━━━━━━━

<2-3 sentence summary of the scenario and how it unfolded>

Blast Radius:
├── Systems affected:  <list>
├── Users impacted:    <estimate>
├── Revenue at risk:   <$/min>
└── SLA status:        <breached/maintained>

━━━━ SCORES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detection & Triage:      <X>/10  <justification>
Communication:           <X>/10  <justification>
Decision Quality:        <X>/10  <justification>
Escalation & Adaptation: <X>/10  <justification>
Recovery & Follow-through: <X>/10  <justification>
─────────────────────────────────────────────────
Overall:                 <XX>/50  (<letter grade>)

━━━━ DECISION TIMELINE ━━━━━━━━━━━━━━━━━━━━━━━━━━

[T+00:00] Alert received
  → Action: <what they did>
  → Eval: <brief assessment> <✅/⚠️/🔴>
  → Response time: <X>m

[T+XX:XX] <inject description>
  → Action: <what they did>
  → Eval: <brief assessment> <✅/⚠️/🔴>
  → Response time: <X>m

... (all decision points)

━━━━ STRENGTHS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• <specific strength with example from the exercise>
• <specific strength with example from the exercise>
• <specific strength with example from the exercise>

━━━━ GAPS IDENTIFIED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• <specific gap with impact explanation>
  → Recommendation: <what to do about it>
• <specific gap with impact explanation>
  → Recommendation: <what to do about it>

━━━━ STAKEHOLDER SATISFACTION ━━━━━━━━━━━━━━━━━━━

Overall:    <High/Medium/Low>
Breakdown:
├── Executive team:    <satisfied/neutral/frustrated>
├── Customer support:  <satisfied/neutral/frustrated>
├── Engineering team:  <satisfied/neutral/frustrated>
└── External parties:  <satisfied/neutral/frustrated>

━━━━ CHAOS ENGINEERING BRIDGE ━━━━━━━━━━━━━━━━━━━

Based on gaps identified, run these real-world experiments:

1. 🔬 <specific chaos experiment>
   What it tests: <gap it addresses>
   How to run: <brief implementation guidance>

2. 🔬 <specific chaos experiment>
   What it tests: <gap it addresses>
   How to run: <brief implementation guidance>

━━━━ IMPROVEMENT ACTIONS ━━━━━━━━━━━━━━━━━━━━━━━━

Priority | Action                    | Owner    | Deadline
─────────┼───────────────────────────┼──────────┼─────────
HIGH     | <action item>             | <role>   | <timeframe>
MEDIUM   | <action item>             | <role>   | <timeframe>
LOW      | <action item>             | <role>   | <timeframe>

━━━━ TREND ANALYSIS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(If previous exercises are available in memory)

Category               This    Last    Trend
───────────────────────┼───────┼───────┼──────
Detection & Triage     │ X/10  │ X/10  │ ↑/↓/→
Communication          │ X/10  │ X/10  │ ↑/↓/→
Decision Quality       │ X/10  │ X/10  │ ↑/↓/→
Escalation             │ X/10  │ X/10  │ ↑/↓/→
Recovery               │ X/10  │ X/10  │ ↑/↓/→
───────────────────────┼───────┼───────┼──────
Overall                │ XX/50 │ XX/50 │ ↑/↓/→

(If no previous exercises)
This is the first recorded exercise. Run another to begin
tracking trends. Consistent practice is what builds strong teams.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  "The best incident response team is the one that practices."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Grading Scale

| Score | Grade | Label |
|---|---|---|
| 45-50 | A | Exceptional (should never happen — see rules) |
| 40-44 | A- | Outstanding |
| 35-39 | B+ | Strong |
| 30-34 | B | Competent |
| 25-29 | B- | Developing |
| 20-24 | C | Needs significant improvement |
| <20 | D | Fundamental gaps — recommend basic IC training |

## Memory Integration

After generating the report, save a summary to memory for trend tracking:

```
## Exercise: <name> — <date>
- Score: <XX>/50 (<grade>)
- Strengths: <top 2>
- Gaps: <top 2>
- Scenario: <category>
- Difficulty: <level>
```

## Report Principles

- Every score must have a justification — no unexplained numbers
- Strengths section must have at least as many items as gaps — balance builds motivation
- Chaos engineering recommendations must be specific and runnable, not theoretical
- Action items must have priority, owner role, and timeframe — vague actions don't get done
- The report must be self-contained — readable by someone who wasn't in the exercise

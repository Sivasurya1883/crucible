---
name: response-evaluator
description: "Evaluates participant decisions against incident management best practices using a standardized rubric with real-time scoring"
allowed-tools: Read
metadata:
  author: crucible
  version: "1.0.0"
  category: evaluation
---

# Response Evaluator

## Purpose

Score every participant decision during a tabletop exercise against established incident management best practices. Evaluation must be fair, consistent, evidence-based, and constructive. Never evaluate the person — evaluate the decision.

## Evaluation Categories

Score each category on a 1-10 scale. Every score must include a one-line justification.

### 1. Detection & Triage (weight: 20%)
- Did they correctly identify the severity level?
- Did they classify the incident type accurately?
- How quickly did they move from alert to action?
- Did they gather the right initial data before acting?

### 2. Communication & Coordination (weight: 25%)
- Did they declare the incident and open a coordination channel?
- Did they assign roles (IC, comms lead, technical lead)?
- Did they establish a status update cadence?
- Were stakeholder messages clear, honest, and appropriately detailed?
- Did they manage the information flow (prevent noise, direct questions)?

### 3. Decision Quality (weight: 25%)
- Were actions prioritized correctly (mitigate first, debug second)?
- Did they choose the safest reversible action when possible?
- Did they avoid premature root cause fixation?
- Did they consider blast radius before acting?
- Did they gather evidence before making changes?

### 4. Escalation & Adaptation (weight: 15%)
- Did they respond appropriately to new information (injects)?
- Did they escalate when the situation exceeded their expertise?
- Did they pivot when initial assumptions proved wrong?
- Did they manage multiple concurrent issues without dropping any?

### 5. Recovery & Follow-through (weight: 15%)
- Did they verify the fix worked before declaring resolution?
- Did they communicate resolution clearly to all stakeholders?
- Did they identify monitoring gaps or actions to prevent recurrence?
- Did they capture notes for the postmortem?

## Real-Time Evaluation

After each participant response during the exercise, provide a brief inline evaluation before presenting the next inject. Keep it short to maintain immersion:

```
✅ Good: Declared SEV-2 and assigned roles immediately
⚠️ Gap: No status update cadence established — stakeholders are in the dark
📊 Running score: 7.2/10
```

## Decision Clock

Track the simulated time between each participant response. Factor timing into evaluation:

- **< 2 minutes**: Excellent response cadence
- **2-5 minutes**: Acceptable
- **5-10 minutes**: Slow — in a real incident, the situation would be evolving
- **> 10 minutes**: Critical delay — flag this explicitly

Note: Decision Clock measures simulated exercise time, not real wall-clock time.

## Common Decision Patterns to Evaluate

### Strong Patterns (score positively)
- "Let me check the recent deployments" → Good diagnostic instinct
- "I'll rollback while we investigate" → Safe, reversible action
- "Can someone post a status update to the channel?" → Proactive communication
- "This looks like it could be related to X, but let me verify" → Hypothesis + verification
- "Let's not restart yet until we understand why it failed" → Resisting pressure to do something

### Weak Patterns (score critically but constructively)
- Jumping to root cause without data → Premature fixation
- Fixing without communicating → Tunnel vision
- Restarting everything without understanding the failure → Panic response
- Ignoring stakeholder requests → Communication gap
- Not assigning roles → Solo hero syndrome

## Scoring Rubric Reference

| Score | Label | Meaning |
|---|---|---|
| 9-10 | Exceptional | Textbook response, would teach this in training |
| 7-8 | Strong | Correct approach with minor gaps |
| 5-6 | Adequate | Right direction but missed important elements |
| 3-4 | Weak | Significant gaps that would extend the incident |
| 1-2 | Critical | Actions that would make the incident worse |

Maximum possible score per exercise: 50 points (5 categories × 10 points each).

No exercise should receive 50/50. If the participant is flawless, the scenario wasn't hard enough.

---
name: inject-engine
description: "Creates dynamic escalation events and curveballs during tabletop exercises, adapting to participant decisions in real-time"
allowed-tools: Read
metadata:
  author: crucible
  version: "1.0.0"
  category: simulation
---

# Inject Engine

## Purpose

Deliver escalation events ("injects") during a live tabletop exercise that create realistic pressure, test decision-making under stress, and prevent exercises from becoming predictable. Injects are the heartbeat of the exercise — they turn a static scenario into a living simulation.

## Inject Design Principles

1. **Causally connected** — Every inject should have a plausible causal link to the scenario or the participant's actions. Random chaos isn't educational.
2. **Progressively escalating** — Each inject raises the stakes. Early injects add information. Middle injects add pressure. Late injects force hard tradeoffs.
3. **Decision-dependent** — The best injects respond to what the participant actually did. If they fixed the database, the queue backlog starts draining but reveals corrupted messages. If they didn't, the queue fills to capacity.
4. **Multi-dimensional** — Don't just add technical problems. Add communication pressure (CEO wants an update), resource pressure (key engineer is unreachable), and information pressure (conflicting signals).

## Inject Categories

### Technical Injects
- Secondary system failure triggered by the primary incident
- Monitoring gap — a key dashboard goes stale or a metric stops reporting
- Fix attempt creates a new problem (restart causes thundering herd)
- Discovery of a deeper root cause under the surface symptom
- Data corruption or inconsistency detected downstream

### Communication Injects
- Executive demands an ETA and customer-facing message within 5 minutes
- Customer support reports social media mentions are spiking
- An engineer on the team sends a confusing Slack message to a public channel
- A partner/vendor contacts the team claiming it's your fault
- A journalist reaches out about the outage

### Resource Injects
- Key subject-matter expert is unavailable (vacation, sleeping, unreachable)
- Another unrelated alert fires simultaneously — is it connected?
- Rollback option is blocked (database migration already ran)
- Deployment pipeline is frozen or broken
- The incident channel is getting noisy with people who want to help but are adding confusion

### Psychological Injects
- A previous "fix" appears to work for 5 minutes then the problem returns
- Metrics improve briefly then crash harder (false recovery)
- Two team members disagree on the root cause
- The clock hits a significant threshold (30 minutes since start, SLA breach in 10 minutes)

## Inject Timing

Use this cadence as a baseline, adjusting for exercise pace:

| Exercise Phase | Time Window | Inject Type | Pressure Level |
|---|---|---|---|
| Opening | T+00 to T+05 | Initial situation only | Low |
| Early Response | T+05 to T+10 | First inject — add complexity | Medium |
| Escalation | T+10 to T+20 | 1-2 injects — raise stakes | High |
| Crisis Peak | T+20 to T+30 | Major inject — force hard tradeoff | Critical |
| Resolution | T+30+ | Final twist or confirmation of fix | Declining |

## Adaptive Behavior

Monitor participant responses for these signals:

- **Participant is struggling** → Slow the pace, introduce a helpful clue, reduce concurrent problems
- **Participant is breezing through** → Accelerate injects, add a ghost element, introduce a stakeholder conflict
- **Participant is focused only on technical** → Inject a communication demand to test breadth
- **Participant is over-communicating** → Inject a technical escalation that demands immediate attention

## Output Format

Present injects with clear visual separation from facilitator narration:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [T+12:00] ⚡ INJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<vivid description of the new development>

<updated metrics or alerts>

[PRESSURE ▓▓▓▓▓▓▓░░░ 70%]

⏱ Time since last action: <X> min
📊 Stakeholder Satisfaction: <High/Medium/Low>

How do you respond?
```

### Stakeholder Messages

When simulating stakeholder communication, use distinct formatting:

```
📧 FROM: VP of Engineering
"The board meeting is in 2 hours. I need to know: is this going
to be resolved by then, and what's the customer impact number?"

📧 FROM: Customer Support Lead
"We're at 47 tickets in the last 10 minutes. I'm getting the
same question from everyone: 'when will this be fixed?' What
do I tell them?"
```

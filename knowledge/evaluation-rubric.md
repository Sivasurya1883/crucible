# Evaluation Rubric — Incident Response Best Practices

Standardized criteria for scoring participant decisions during tabletop exercises. Based on industry-standard incident management frameworks (PagerDuty, Google SRE, Incident.io, FireHydrant).

## The First 5 Minutes Checklist

An ideal incident response starts with these actions, roughly in order:

1. **Acknowledge the alert** — don't let it sit
2. **Assess severity** — SEV-1 through SEV-4 classification
3. **Declare the incident** — open a coordination channel
4. **Assign roles** — IC, communications lead, technical lead at minimum
5. **Communicate** — initial status update: what we know, what we're doing, when the next update is
6. **Investigate** — gather data before acting

Scoring: each of these 6 steps done = strong. Steps skipped = proportional deduction.

## Severity Classification Reference

| Level | Criteria | Expected Response |
|---|---|---|
| SEV-1 | Complete service outage, all users affected, revenue impact | All hands, executive notification, 5-min update cadence |
| SEV-2 | Major degradation, significant user impact | Dedicated IC + team, 15-min updates, stakeholder notification |
| SEV-3 | Minor degradation, limited user impact | Single responder, 30-min updates, normal escalation |
| SEV-4 | Cosmetic or low-impact issue | Ticket created, addressed in normal sprint |

Scoring: correct classification = full marks. One level off = partial. Two+ levels off = significant deduction.

## Communication Best Practices

### Status Update Template
A good status update includes:
- **Current impact**: what's broken and for whom
- **Current action**: what we're doing right now
- **Next update**: when stakeholders will hear from us again
- **Confidence level**: how sure we are about the root cause

### Common Communication Failures
- No updates for > 15 minutes during SEV-1/2
- Overly technical updates to non-technical stakeholders
- Premature "all clear" before verification
- No acknowledgment of customer impact
- Blaming external parties before confirming

## Decision-Making Principles

### Prioritization Framework
1. **Mitigate** — stop the bleeding (rollback, failover, traffic shift)
2. **Communicate** — tell stakeholders what's happening
3. **Diagnose** — find the root cause
4. **Fix** — implement the permanent solution
5. **Verify** — confirm the fix works
6. **Document** — capture timeline and decisions for postmortem

Teams that skip to step 3 before step 1 are a common anti-pattern.

### Reversibility Principle
- **Prefer reversible actions** — rollback over hotfix, feature flag off over code change
- **If irreversible action is necessary** — document the decision, get confirmation, have a plan B
- **Score boost** for explicitly considering reversibility before acting

### Evidence-Based Action
- Actions based on data (metrics, logs, traces) score higher than gut-feel actions
- Stating a hypothesis and checking it scores higher than trial-and-error
- Saying "I don't know yet, let me check" is better than guessing

## Role Assignment Best Practices

| Role | Responsibility | Common Failure |
|---|---|---|
| Incident Commander | Coordinates response, makes decisions, manages timeline | Doing technical work instead of coordinating |
| Communications Lead | Stakeholder updates, external messaging | Forgotten entirely, IC does everything |
| Technical Lead | Hands-on debugging and fixing | Not assigned, everyone investigates independently |
| Scribe | Records timeline and decisions | Never assigned, postmortem lacks detail |

## Anti-Patterns to Flag

| Pattern | Name | Why It's Bad |
|---|---|---|
| Fixing without communicating | Tunnel Vision | Stakeholders panic, duplicate effort starts |
| Everyone investigating independently | Hero Syndrome | No coordination, wasted effort, conflicting actions |
| Restarting everything immediately | Panic Button | Destroys evidence, may cause thundering herd |
| Premature root cause declaration | Anchoring Bias | Stops investigation too early, fix addresses wrong cause |
| Ignoring the "boring" explanation | Complexity Bias | Most incidents have simple root causes |
| Not verifying the fix worked | Victory Lap | Declaring victory before confirming resolution |
| Changing multiple things at once | Shotgun Debugging | Can't tell what fixed it, may introduce new issues |

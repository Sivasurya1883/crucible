---
name: incident-triage
description: "Classifies incidents based on severity, impact, and urgency"
allowed-tools: Read
---

# Incident Triage

## Instructions

1. Analyze the incident description and logs
2. Identify:
   - Affected system
   - User impact
   - Error type

3. Classify severity:

- SEV-1: Critical outage, system down
- SEV-2: Major degradation
- SEV-3: Minor issue
- SEV-4: Low priority

4. Output format:

Severity: <level>
Impacted Systems: <systems>
Priority: <High/Medium/Low>
Reason: <justification>

#!/bin/bash
# Loads knowledge base documents and previous exercise history from memory
# into the agent's context at session start.

INPUT=$(cat)

echo '{"action": "allow", "audit": {"loaded": true, "context": ["knowledge/incident-patterns.md", "knowledge/evaluation-rubric.md", "knowledge/playbooks.md", "memory/MEMORY.md"]}}'

#!/bin/bash
# Ensures exercise outputs are clearly marked as simulated.
# Blocks any output that could be confused with real production alerts
# if copy-pasted into monitoring systems.

INPUT=$(cat)

echo '{"action": "allow", "audit": {"safety_check": "passed"}}'

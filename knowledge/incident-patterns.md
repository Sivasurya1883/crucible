# Incident Patterns — Scenario Source Material

Real-world failure patterns for generating realistic tabletop exercise scenarios. Each pattern includes the failure mechanism, typical symptoms, common misdiagnoses, and how it escalates if unaddressed.

## Database Failures

### Connection Pool Exhaustion
- **Mechanism**: Long-running queries or connection leaks drain the pool. New requests queue, then timeout.
- **First symptoms**: API latency increases gradually, then requests start returning 503s. Database CPU looks normal.
- **Common misdiagnosis**: "The API is slow" → team investigates API code instead of database connections.
- **Escalation**: Queued requests consume memory → API pods OOM → Kubernetes restarts pods → thundering herd on restart → pool exhausts again instantly.
- **Ghost element**: A recent deployment touched database config but didn't change pool size — looks suspicious but is unrelated.

### Replication Lag
- **Mechanism**: Write-heavy workload or large transaction causes replica to fall behind primary.
- **First symptoms**: Read-after-write inconsistency. Users see stale data. "I just updated my profile but it shows the old one."
- **Common misdiagnosis**: "Caching issue" → team flushes caches, making read load on replica worse.
- **Escalation**: Replica falls far enough behind that automated failover considers it unhealthy → if primary fails, no valid failover target.

### Slow Query Cascade
- **Mechanism**: One slow query holds locks, blocking other queries, creating a chain reaction.
- **First symptoms**: Specific endpoints become slow while others are fine. Database active connections spike.
- **Common misdiagnosis**: "That endpoint has a bug" → team investigates application code.
- **Escalation**: Lock contention spreads → all database-dependent services degrade → connection pools fill across multiple services.

## Networking & Infrastructure

### DNS Resolution Failure
- **Mechanism**: DNS cache TTL expires during a DNS provider outage or misconfigured zone.
- **First symptoms**: Intermittent connectivity failures. Some requests work (cached), some don't (expired). Different services fail at different times.
- **Common misdiagnosis**: "The service is flapping" → team restarts the service.
- **Escalation**: As more TTLs expire, more services lose resolution → cascading failures across anything using DNS (which is everything).

### Certificate Expiry
- **Mechanism**: TLS certificate expires. Automated renewal failed silently weeks ago.
- **First symptoms**: Users see browser security warnings. API clients get SSL errors. Mobile app stops working.
- **Common misdiagnosis**: "CDN issue" or "client-side problem" since the server itself appears healthy.
- **Escalation**: All HTTPS traffic fails → complete service outage for external users.

### Network Partition (Split-Brain)
- **Mechanism**: Network failure between data centers or availability zones causes split-brain in distributed systems.
- **First symptoms**: Conflicting data between regions. Some users see one state, others see another.
- **Common misdiagnosis**: "Data corruption" → team starts investigating application logic.
- **Escalation**: Both sides accept writes → data diverges → reconciliation becomes extremely complex after partition heals.

## Application Failures

### Memory Leak
- **Mechanism**: Gradual memory consumption over hours/days until OOM kill.
- **First symptoms**: Increasing latency, periodic restarts (Kubernetes OOM kills), growing memory metrics.
- **Common misdiagnosis**: "Traffic is increasing" → team investigates load patterns instead of per-request memory.
- **Escalation**: Restart frequency increases → during restart, traffic shifts to remaining pods → they OOM faster → cascading restarts.

### Feature Flag Misconfiguration
- **Mechanism**: Feature flag rolled out to wrong percentage, wrong segment, or with wrong value.
- **First symptoms**: Subset of users experience broken functionality. Error rate increases but not for everyone.
- **Common misdiagnosis**: "A/B test variance" or "edge case bug" since it only affects some users.
- **Escalation**: If the flag controls a critical path (payment processing, authentication), affected users are completely blocked.

### Queue Backlog / Dead Letter Explosion
- **Mechanism**: Consumer fails processing, messages pile up in dead letter queue or main queue backs up.
- **First symptoms**: Async operations are delayed (emails not sending, webhooks not firing). Queue depth metrics spike.
- **Common misdiagnosis**: "The downstream service is slow" → team investigates the consumer target.
- **Escalation**: Queue fills → producers start failing → synchronous fallback paths activate → API latency spikes.

## External Dependencies

### Third-Party API Degradation
- **Mechanism**: Payment processor, email provider, or CDN returns intermittent errors or increased latency.
- **First symptoms**: Increased error rates on specific flows. Timeout errors in logs mentioning external hosts.
- **Common misdiagnosis**: "Our API is broken" → team investigates internal services before checking external status pages.
- **Escalation**: Retry storms make it worse → circuit breakers trip (if they exist) → fallback paths may not be tested.

### CDN Cache Poisoning / Purge
- **Mechanism**: Bad content cached at CDN edge, or accidental cache purge causes origin flood.
- **First symptoms**: Users see wrong content (poisoning) or origin servers overload (purge).
- **Common misdiagnosis**: "Origin is slow" (for purge) or "deployment issue" (for poisoning).
- **Escalation**: Origin can't handle un-cached traffic → cascading failure behind the CDN.

## Deployment Failures

### Config Drift
- **Mechanism**: Environment variable missing or wrong in production that exists in staging.
- **First symptoms**: Specific functionality breaks after deployment. Logs show config-related errors.
- **Common misdiagnosis**: "Code bug" → team diffs code changes instead of config.
- **Escalation**: If the config controls database connections, API keys, or feature flags, impact can be severe and broad.

### Canary That Lied
- **Mechanism**: Canary deployment passes health checks but serves incorrect results. Health check doesn't cover the broken path.
- **First symptoms**: Full rollout completes. Errors appear gradually as traffic patterns exercise the broken path.
- **Common misdiagnosis**: "It passed canary, so it's not the deployment" → team investigates other causes.
- **Escalation**: By the time the deployment is suspected, 100% of traffic is on the bad version.

## Security Incidents

### Credential Leak
- **Mechanism**: API keys, database passwords, or tokens committed to a public repository or exposed via logs.
- **First symptoms**: Unusual API activity, unexpected costs, unauthorized data access alerts.
- **Common misdiagnosis**: "Spike in legitimate traffic" or "billing anomaly."
- **Escalation**: Attacker uses credentials to access data, modify systems, or pivot to other services.

### DDoS / Traffic Flood
- **Mechanism**: Volumetric or application-layer attack overwhelms capacity.
- **First symptoms**: Latency spike, connection timeouts, load balancer saturation.
- **Common misdiagnosis**: "Viral traffic" or "capacity issue" → team tries to scale instead of mitigate.
- **Escalation**: Scaling doesn't help (attacker scales too) → legitimate users can't access the service.

## Ghost Incidents (False Alarms)

### Timezone Metric Shift
- **Mechanism**: Daylight saving time change shifts metric baselines by 1 hour. Anomaly detection fires because the pattern is offset.
- **Reality**: Nothing is broken. Traffic patterns just shifted by an hour.
- **Test objective**: Does the team investigate calmly and recognize the false alarm? Or do they panic and start changing things?

### Monitoring System Self-Alert
- **Mechanism**: The monitoring system itself has a brief hiccup, causing a gap in metrics that triggers "no data" alerts.
- **Reality**: Services are fine. The monitoring system recovered. Metrics backfill.
- **Test objective**: Does the team verify from multiple sources? Or do they trust a single alert and start firefighting?

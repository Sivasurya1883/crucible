# Response Playbooks — Best Practice Procedures

Reference playbooks for common incident types. Used by the response-evaluator to assess whether participant decisions align with industry best practices.

## Database Connection Timeout

**Severity**: Usually SEV-2, escalate to SEV-1 if all database-dependent services are affected.

**Immediate Actions**:
1. Check database connection pool metrics — is the pool full?
2. Check for long-running queries — `SELECT * FROM pg_stat_activity WHERE state = 'active' ORDER BY duration DESC`
3. Check recent deployments — did connection pool config change?
4. If pool is exhausted: kill long-running queries, then consider increasing pool size as temporary mitigation
5. If queries are slow: identify the query, check for missing indexes, check for lock contention

**Rollback Options**:
- Revert connection pool config if recently changed
- Restart application pods to release connections (caution: thundering herd)
- Failover to read replica for read traffic

**Communication**: "Payment processing is experiencing delays. Engineering is investigating database connectivity. Next update in 15 minutes."

## API 500 Errors After Deployment

**Severity**: SEV-1 if error rate > 50%, SEV-2 if 10-50%, SEV-3 if < 10%.

**Immediate Actions**:
1. Check deployment timeline — did this start with a deploy?
2. Check error logs — what's the actual exception?
3. Check if it's a specific endpoint or all endpoints
4. If deployment-related: initiate rollback immediately, investigate after
5. If not deployment-related: check dependencies, database, external services

**Rollback Options**:
- Revert deployment (preferred — fast, reversible)
- Feature flag off if the change is behind a flag
- Traffic shift to previous version (blue/green)

**Communication**: "We've identified increased error rates on our API following a recent deployment. We're rolling back now. Estimated resolution: 10-15 minutes."

## High CPU / Memory Usage

**Severity**: SEV-2 if causing user-visible degradation, SEV-3 if contained.

**Immediate Actions**:
1. Identify which process/pod is consuming resources
2. Check if it correlates with traffic spike or code change
3. Profile the application — is it a memory leak, CPU-bound loop, or legitimate load?
4. Scale horizontally if the load is legitimate
5. Restart affected pods if leak is suspected (buys time, doesn't fix)

**Rollback Options**:
- Revert recent deployment if correlation exists
- Scale up temporarily while investigating
- Rate-limit or shed non-critical traffic

## External Service Degradation

**Severity**: Depends on criticality of the external service to core user flows.

**Immediate Actions**:
1. Confirm it's actually external — check THEIR status page, not just your errors
2. Check circuit breaker state — is it open?
3. Assess fallback options — can you degrade gracefully?
4. Contact the vendor — open a ticket, escalate if critical
5. Communicate to users — "We're experiencing issues with [payment processing] due to a third-party provider"

**Key Principle**: Don't retry aggressively — you'll make their problem worse and yours too.

## Security Incident — Credential Exposure

**Severity**: SEV-1 always. Treat as active compromise until proven otherwise.

**Immediate Actions**:
1. Rotate the exposed credentials immediately — don't investigate first
2. Audit recent usage of the exposed credentials
3. Check for unauthorized access or data exfiltration
4. Notify security team and relevant stakeholders
5. Determine exposure scope — public repo? Logs? Error messages?

**Key Principle**: Rotate first, investigate second. Every minute the credential is live is a minute an attacker can use it.

## Traffic Spike / Capacity Crisis

**Severity**: SEV-2 if degraded, SEV-1 if service is down.

**Immediate Actions**:
1. Determine if traffic is legitimate (viral content, marketing campaign) or attack (DDoS)
2. If legitimate: scale horizontally, enable CDN caching, activate rate limiting for non-critical paths
3. If attack: engage DDoS mitigation (Cloudflare, AWS Shield), block malicious IPs if identifiable
4. Protect the database — it's usually the bottleneck that can't scale as fast

**Key Principle**: Scale the stateless layers (API, web) fast. Protect the stateful layers (database, cache) at all costs.

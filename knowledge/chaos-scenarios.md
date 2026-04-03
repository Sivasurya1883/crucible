# Chaos Engineering Recommendations

Specific, runnable chaos experiments that Crucible recommends based on gaps identified during tabletop exercises. Each experiment maps to a common exercise gap and includes implementation guidance.

## Connection & Dependency Failures

### Experiment: Database Connection Kill
- **Tests gap**: Team's response to sudden database unavailability
- **Implementation**: Use `toxiproxy` or `tc` to add latency/drop connections to database port
- **What to observe**: Does the application degrade gracefully? Do circuit breakers trip? How fast does the team detect it?
- **Start small**: Add 500ms latency first, then 2s, then drop 50% of connections

### Experiment: External API Timeout
- **Tests gap**: Handling third-party degradation without cascading failures
- **Implementation**: Configure a proxy (Envoy, toxiproxy) to add 30s delay to outbound calls to a specific external service
- **What to observe**: Do retry storms occur? Does the circuit breaker engage? Is there a graceful fallback?

### Experiment: DNS Failure
- **Tests gap**: Resilience to infrastructure-layer failures that affect everything
- **Implementation**: Temporarily modify DNS resolution for a non-critical internal service
- **What to observe**: How long until detection? Does the team check DNS or only application layers?

## Resource Exhaustion

### Experiment: Memory Pressure
- **Tests gap**: Detection and response to gradual resource exhaustion
- **Implementation**: Deploy a stress test pod that gradually consumes memory on a node
- **What to observe**: Do alerts fire before OOM kills? Does the team notice before user impact?

### Experiment: Disk Fill
- **Tests gap**: Monitoring coverage for disk space (often overlooked)
- **Implementation**: Write large temp files to fill disk on a non-production node
- **What to observe**: Does the team have disk space alerts? What breaks when disk is full? (Logging, database, temp files)

### Experiment: CPU Saturation
- **Tests gap**: Distinguishing between legitimate load and runaway processes
- **Implementation**: Use `stress-ng` to consume CPU on specific pods
- **What to observe**: Does auto-scaling trigger? Can the team identify which process is consuming CPU?

## Deployment & Configuration

### Experiment: Bad Config Deploy
- **Tests gap**: Detection of configuration-related failures vs code bugs
- **Implementation**: Deploy with a deliberately wrong (non-destructive) environment variable
- **What to observe**: How quickly is the config issue identified? Does the team check config or only code?

### Experiment: Rollback Under Pressure
- **Tests gap**: Team's ability to execute a rollback quickly and cleanly
- **Implementation**: Practice a deployment rollback — time it, identify blockers
- **What to observe**: How long does rollback take? Are there manual steps? Is the process documented?

## Network & Communication

### Experiment: Network Partition Simulation
- **Tests gap**: Behavior of distributed systems under split-brain conditions
- **Implementation**: Use `iptables` or network policies to block traffic between two service groups
- **What to observe**: Do services detect the partition? Is data consistency maintained? How does the system recover when the partition heals?

### Experiment: Latency Injection
- **Tests gap**: Impact of latency on downstream services and user experience
- **Implementation**: Add 200ms, then 500ms, then 2s of latency between two services
- **What to observe**: At what latency threshold do users notice? Do timeouts cascade? Is there graceful degradation?

## Monitoring & Detection

### Experiment: Alert Silence
- **Tests gap**: Over-reliance on a single monitoring system
- **Implementation**: Temporarily disable alerts for a specific service (in a test environment)
- **What to observe**: Would the team notice the failure through other channels? How long until detection without alerts?

### Experiment: Metric Flood
- **Tests gap**: Ability to find signal in noise during high-alert situations
- **Implementation**: Generate spurious alerts alongside a real (simulated) issue
- **What to observe**: Can the team filter noise? Do they investigate each alert or prioritize correctly?

## Running Experiments Safely

### Prerequisites
- Always run in a non-production environment first
- Have a kill switch to stop the experiment immediately
- Notify the team that an experiment is running (or don't, to test detection — but have a safety observer)
- Define success criteria before starting
- Time-box the experiment (30 min max for first runs)

### Progression
1. **Start with tabletop exercises** (Crucible) to identify gaps without risk
2. **Run targeted chaos experiments** in staging based on gaps found
3. **Graduate to production experiments** with blast radius controls (single AZ, single pod, % of traffic)
4. **Automate recurring experiments** for continuous resilience validation

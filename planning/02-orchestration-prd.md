# Product Requirements Document (PRD): Sprint Orchestrator

## Document: 02-orchestration-prd.md

## Executive Summary

The Sprint Orchestrator is a coordination system that manages the execution of pre-planned sprints containing parallelizable development tasks. It serves as the bridge between the planning system (defined in `01a/01b/01c-planning-prd.md` files) and task execution teams (defined in `03-task-team-prd.md`). The orchestrator uses Kaiban for visual dashboard management, coordinates containerized task teams, and handles Git branch/working tree lifecycle management.

## System Architecture

### Core Components

**Kaiban Integration Layer**

- Visual kanban dashboard for sprint and task visualization
- Real-time status updates for tasks (pending, running, completed, failed)
- Token usage tracking and resource monitoring per task
- Sprint progress visualization and team collaboration interface
- Shareable dashboard URLs for stakeholder visibility

**Git Management System**

- Sprint branch lifecycle management (`sprint/{sprint-id}`)
- Task feature branch creation (`task/{sprint-id}/{task-id}`)
- Working tree orchestration for parallel task execution
- Automated merge operations with conflict resolution
- Main branch updates upon sprint completion

**Container Orchestration**

- Sprint-specific container image building and management
- Task container lifecycle (create, execute, monitor, cleanup)
- Resource allocation and limits enforcement
- Simulated workspace preparation for task teams
- Result collection and artifact management

**Coordination Engine**

- Sprint execution state machine
- Task dependency validation (pre-validated by planner)
- Parallel task execution coordination
- Error handling and recovery workflows
- Progress reporting and notifications

## Operational Workflow

### Sprint Initialization Phase

```
Orchestrator → Receive sprint definition from planning system (see 01a/01b/01c-planning-prd.md files)
Orchestrator → Create sprint branch (sprint/{sprint-id})
Orchestrator → Create sprint working tree
Orchestrator → Build sprint container image with dependencies
Orchestrator → Initialize Kaiban board with sprint tasks
Orchestrator → Set task statuses to "Ready"
```

### Task Execution Phase (Parallel)

```
For each ready task in sprint:
  Orchestrator → Create task feature branch (task/{sprint-id}/{task-id})
  Orchestrator → Create task sub-working tree from sprint branch
  Orchestrator → Prepare simulated workspace with relevant files
  Orchestrator → Generate task PRD and specifications
  Orchestrator → Launch containerized task team (see 03-task-team-prd.md)
  Orchestrator → Update Kaiban: task status → "In Progress"

  Container → Execute task implementation (see 03-task-team-prd.md for details)
  Container → Generate RESULTS.md and artifacts
  Container → Signal completion to orchestrator

  Orchestrator → Collect results and token usage
  Orchestrator → Validate quality gates
  Orchestrator → Merge task sub-working tree → sprint working tree
  Orchestrator → Update Kaiban: task status → "Completed"
  Orchestrator → Cleanup container and temporary files
```

### Sprint Completion Phase

```
Orchestrator → Wait for all tasks in sprint to complete
Orchestrator → Run sprint-level integration tests
Orchestrator → Validate sprint completion criteria
Orchestrator → Merge sprint branch → main branch
Orchestrator → Update Kaiban: sprint status → "Completed"
Orchestrator → Generate sprint summary report
Orchestrator → Cleanup sprint artifacts
Orchestrator → Trigger next sprint (if available)
```

## Input Specifications

### Sprint Definition Schema

```json
{
  "sprint_id": "string",
  "sprint_name": "string",
  "description": "string",
  "container_config": {
    "base_image": "string",
    "dependencies": ["array"],
    "environment_vars": {},
    "resource_limits": {}
  },
  "tasks": [
    {
      "task_id": "string",
      "title": "string",
      "description": "string",
      "requirements": ["array"],
      "success_criteria": ["array"],
      "priority": "high|medium|low",
      "estimated_tokens": "number",
      "files_to_modify": ["array"],
      "dependencies": ["array of completed task IDs"],
      "test_requirements": ["array"]
    }
  ],
  "sprint_success_criteria": ["array"],
  "integration_tests": ["array of test commands"],
  "max_parallel_tasks": "number"
}
```

### Kaiban Board Configuration

```json
{
  "board_id": "sprint-{sprint-id}",
  "board_name": "Sprint {sprint-id}: {sprint-name}",
  "columns": [
    { "id": "ready", "name": "Ready", "limit": null },
    { "id": "in-progress", "name": "In Progress", "limit": 5 },
    { "id": "review", "name": "Quality Review", "limit": null },
    { "id": "completed", "name": "Completed", "limit": null },
    { "id": "failed", "name": "Failed", "limit": null }
  ],
  "cards": [
    {
      "task_id": "string",
      "title": "string",
      "description": "string",
      "labels": ["priority", "estimated_tokens"],
      "custom_fields": {
        "token_usage": "number",
        "start_time": "timestamp",
        "completion_time": "timestamp",
        "container_id": "string"
      }
    }
  ]
}
```

## Core Orchestrator Functions

### Sprint Management

```python
class SprintOrchestrator:
    def initialize_sprint(self, sprint_definition):
        # Create Git structures
        # Build container image
        # Setup Kaiban board
        # Validate task dependencies

    def execute_sprint(self):
        # Launch parallel task containers
        # Monitor task progress
        # Handle task completion
        # Update dashboard in real-time

    def complete_sprint(self):
        # Validate all tasks completed
        # Run integration tests
        # Merge to main branch
        # Generate sprint report
```

### Task Coordination

```python
def launch_task(self, task_spec):
    # Create task branch and working tree
    # Prepare simulated workspace
    # Launch container with task team
    # Update Kaiban status
    # Return task monitor handle

def handle_task_completion(self, task_id, results):
    # Collect RESULTS.md and artifacts
    # Validate quality gates
    # Merge task changes to sprint branch
    # Update token usage tracking
    # Update Kaiban with completion
```

### Git Operations

```python
def create_sprint_branch(self, sprint_id):
    # git checkout -b sprint/{sprint_id}
    # git worktree add sprint-{sprint_id}

def create_task_branch(self, sprint_id, task_id):
    # git checkout -b task/{sprint_id}/{task_id} sprint/{sprint_id}
    # git worktree add task-{sprint_id}-{task_id}

def merge_task_to_sprint(self, sprint_id, task_id):
    # Validate task completion
    # git merge task/{sprint_id}/{task_id}
    # Resolve any conflicts
    # Run sprint-level tests
```

## Kaiban Dashboard Features

### Sprint Overview

- Sprint progress bar (tasks completed/total)
- Total token usage vs budget
- Active container count
- Sprint timeline and milestones
- Resource utilization metrics

### Task Cards

- Task title and description
- Current status with visual indicators
- Token usage (actual vs estimated)
- Execution time tracking
- Container health status
- Links to task artifacts and logs

### Real-time Updates

- WebSocket connections for live status updates
- Progress animations and notifications
- Error alerts and recovery status
- Team collaboration comments and notes

### Reporting Dashboard

- Sprint velocity metrics
- Token usage analytics
- Task completion trends
- Quality gate pass/fail rates
- Resource efficiency analysis

## Token Usage Tracking

### Per-Task Tracking

```json
{
  "task_id": "string",
  "estimated_tokens": "number",
  "actual_tokens": "number",
  "token_breakdown": {
    "lead_agent": "number",
    "implementation": "number",
    "testing": "number",
    "review": "number",
    "documentation": "number",
    "integration": "number"
  },
  "efficiency_ratio": "actual/estimated"
}
```

### Sprint-Level Aggregation

- Total token budget vs actual usage
- Token usage per task category
- Efficiency trends and optimization opportunities
- Cost projections for future sprints

## Error Handling and Recovery

### Task Failure Scenarios

- **Container Timeout**: Restart with increased limits
- **Quality Gate Failure**: Move to review column, flag for manual intervention
- **Resource Exhaustion**: Queue task for retry with different resource allocation
- **Integration Conflicts**: Isolate conflicting tasks, require manual merge

### Sprint-Level Recovery

- **Failed Tasks**: Mark sprint as partial, continue with completed tasks
- **Integration Test Failures**: Rollback sprint, analyze conflicts
- **Resource Constraints**: Reduce parallelism, extend sprint timeline

### Kaiban Error Visualization

- Failed tasks highlighted in red with error details
- Recovery actions displayed as actionable buttons
- Error logs accessible through task card drill-down
- Automated retry status and countdown timers

## Integration Points

### System Dependencies

- **Planning System** (`01a/01b/01c-planning-prd.md`): Receives sprint definitions with pre-decomposed parallelizable tasks
- **Task Implementation Teams** (`03-task-team-prd.md`): Launches and monitors containerized task execution
- **Git Repository**: Branch and merge operations
- **Container Runtime**: Podman orchestration
- **Kaiban API**: Board management and updates
- **Notification System**: Slack/email alerts
- **Monitoring**: Resource usage and performance metrics

### API Endpoints

```
POST /api/sprints - Create new sprint
GET /api/sprints/{id} - Get sprint status
PUT /api/sprints/{id}/start - Begin sprint execution
GET /api/tasks/{id}/status - Get task status
POST /api/tasks/{id}/retry - Retry failed task
GET /api/dashboard/{sprint_id} - Get Kaiban board data
```

## Configuration Management

### Environment Configuration

```yaml
orchestrator:
  max_concurrent_sprints: 1
  max_parallel_tasks_per_sprint: 5
  default_task_timeout: 3600s
  default_token_budget: 1000000

git:
  repository_url: '${REPO_URL}'
  main_branch: 'main'
  working_trees_path: '/tmp/orchestrator/trees'

containers:
  runtime: 'podman'
  base_image: 'claude-code:dangerous-mode'
  network_mode: 'none'
  cleanup_on_completion: true

kaiban:
  api_url: '${KAIBAN_API_URL}'
  board_template: 'sprint-template'
  webhook_url: '${WEBHOOK_URL}'
```

## Monitoring and Observability

### Key Metrics

- Sprint completion rate and velocity
- Average task execution time
- Token usage efficiency
- Container resource utilization
- Quality gate pass rates

### Logging Strategy

- Structured logs for all orchestrator operations
- Task execution logs collected from containers
- Git operation audit trail
- Kaiban API interaction logs
- Performance and resource usage metrics

### Health Checks

- Container health monitoring
- Git repository connectivity
- Kaiban API availability
- File system space and permissions
- Resource limit enforcement

## Success Criteria

### Functional Requirements

- Successfully execute parallel tasks within sprints
- Maintain real-time Kaiban dashboard updates
- Accurate token usage tracking and reporting
- Reliable Git branch and merge operations
- Robust error handling and recovery

### Performance Requirements

- Support up to 5 parallel tasks per sprint
- Task status updates within 5 seconds
- Sprint completion within planned timeline
- 99% uptime for dashboard availability
- Efficient resource utilization (>80%)

### Quality Requirements

- Zero data loss during task execution
- Consistent Git history without conflicts
- Accurate token usage accounting
- Complete audit trail for all operations
- Reliable cleanup of temporary resources

## Future Enhancements

### Planned Features

- **Multi-Sprint Pipeline**: Overlap sprint execution for continuous delivery
- **Dynamic Resource Allocation**: Auto-scale container resources based on demand
- **Advanced Analytics**: ML-based sprint planning and optimization
- **Custom Dashboard Views**: Role-based dashboard customization
- **Integration Testing**: Automated cross-sprint integration validation

### Integration Opportunities

- **CI/CD Pipeline**: Trigger deployments on sprint completion
- **Issue Tracking**: Sync with Jira/GitHub Issues
- **Code Quality Tools**: Integrate SonarQube/CodeClimate
- **Performance Monitoring**: APM integration for runtime metrics

## Conclusion

The Sprint Orchestrator provides a clean, visual, and reliable coordination layer for managing parallel development work. By leveraging Kaiban for dashboard management and maintaining simple but robust Git and container operations, it enables efficient execution of pre-planned sprints (from `01a/01b/01c-planning-prd.md` files) while coordinating containerized task teams (from `03-task-team-prd.md`). The system provides complete visibility into progress, resource usage, and quality metrics through its dashboard interface.

## Related Documents

- `01a-concept-interview-prd.md`: Defines the concept interview and requirements gathering process
- `01b-ui-interview-prd.md`: Defines the UI/UX design and prototyping process
- `01c-epoch-planning-prd.md`: Defines the technical planning and task decomposition process
- `03-task-team-prd.md`: Defines the containerized task implementation teams that execute individual tasks

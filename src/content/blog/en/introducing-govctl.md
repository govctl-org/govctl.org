---
title: "Introducing govctl: Governance for AI Coding"
description: "AI coding assistants are powerful but undisciplined. govctl brings structure, traceability, and phase discipline to AI-assisted development workflows."
pubDate: 2026-01-18
tags: ["announcement", "govctl", "ai-coding"]
author: "govctl team"
---

AI coding assistants have fundamentally changed how we build software. Tools like Claude, Cursor, and GitHub Copilot can generate entire functions, refactor codebases, and even architect systems. But with this power comes a problem: **AI coding is undisciplined**.

## The Problem

When AI assists your development, several things can go wrong:

- **Phase skipping** — Jumping from idea to implementation without specification
- **Documentation drift** — Specs and code diverge silently
- **No enforceable governance** — "Best practices" become optional suggestions

The result: faster typing, slower thinking, unmaintainable systems.

### Without govctl

```
Day 1:  "Let's add caching!"
Day 2:  AI generates 500 lines of Redis integration
Day 7:  "Wait, did we agree on Redis or Memcached?"
Day 14: Half the team implements one, half the other
Day 30: Two incompatible caching layers, no spec, nobody knows why
```

### With govctl

```
Day 1:  govctl rfc new "Caching Strategy"
Day 2:  RFC-0015 defines: Redis, TTL policy, invalidation rules
Day 3:  govctl rfc advance RFC-0015 impl
Day 7:  Implementation complete, traceable to spec
Day 10: govctl rfc advance RFC-0015 test
Day 14: Tests pass, govctl rfc advance RFC-0015 stable
```

## What govctl Is

govctl is an opinionated governance CLI that enforces **phase discipline** on software development:

1. **RFC is the source of truth** — No implementation without specification
2. **Phases are enforced** — Each phase has explicit gates and invariants
3. **Governance is executable** — Rules are checked, not suggested
4. **Work is traceable** — Tasks link back to the specs that authorized them

govctl manages three artifact types:

- **RFCs** — Specifications that must exist before implementation
- **ADRs** — Architectural decisions with explicit consequences
- **Work Items** — Tracked tasks tied to governance artifacts

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  SPEC   │ ──► │   IMPL   │ ──► │   TEST   │ ──► │  STABLE  │
└─────────┘     └──────────┘     └──────────┘     └──────────┘
     │                │                │                │
     ▼                ▼                ▼                ▼
  RFC must         Code must       Tests must       Bug fixes
  be normative     match spec      pass gates       only
```

## How It Works

Initialize a project and create your first RFC:

```bash
# Install (requires Rust 1.85+)
cargo install govctl

# Initialize project
govctl init

# Create your first RFC
govctl rfc new "Add user authentication"
```

govctl creates governance artifacts in the `gov/` directory:

```
gov/
├── config.toml       # Configuration
├── rfc/              # RFC sources (JSON + clauses)
├── adr/              # Architectural Decision Records
├── work/             # Work items
└── schema/           # JSON schemas
```

RFCs are composed of **clauses** — atomic units of specification:

```bash
# Add a clause to your RFC
govctl clause new RFC-0001:C-SCOPE "Scope" -s "Specification" -k normative

# Edit the clause content
govctl clause edit RFC-0001:C-SCOPE
```

As you work, govctl tracks which phase you're in and validates transitions:

```bash
# Make RFC binding (ready for implementation)
govctl rfc finalize RFC-0001 normative

# Advance through phases
govctl rfc advance RFC-0001 impl    # Ready to code
govctl rfc advance RFC-0001 test    # Ready to verify
govctl rfc advance RFC-0001 stable  # Production-ready
```

## Why Phase Discipline Matters

Phase discipline isn't bureaucracy — it's determinism. When you know exactly what phase a change is in, you can:

- **Trust the AI** — It can only operate within defined RFC boundaries
- **Audit decisions** — Every transition is recorded
- **Rollback safely** — Each phase is a checkpoint
- **Collaborate** — Multiple agents can work on different phases

## Getting Started

```bash
# Install
cargo install govctl

# Or with TUI dashboard
cargo install govctl --features tui

# Initialize
govctl init

# Validate
govctl check
```

For complete documentation, see the [User Guide](https://govctl-org.github.io/govctl/).

---

We're building govctl because we believe AI coding should be powerful _and_ trustworthy. Join us in bringing governance to the age of AI assistants.

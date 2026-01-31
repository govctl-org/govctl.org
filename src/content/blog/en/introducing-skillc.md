---
title: "Introducing skillc: A Development Kit for Agent Skills"
description: "Agent Skills define what skills are. skillc provides the how: tooling to create, validate, build, and trace skills throughout their lifecycle."
pubDate: 2026-01-30
tags: ["announcement", "skillc", "agent-skills"]
author: "govctl team"
---

We're excited to announce **skillc** v0.1.0 — the development kit for [Agent Skills](https://agentskills.io/), the open format for extending AI agent capabilities with specialized knowledge and workflows.

## What is skillc?

Agent Skills define _what_ a skill is: a folder with a `SKILL.md` file containing metadata and instructions. skillc provides the _how_: tooling to create, validate, build, and trace skills throughout their lifecycle.

Where the Agent Skills specification ends, skillc begins.

## Installation

```bash
cargo install skillc
```

This installs the `skc` binary.

## Two Workflows

skillc serves two distinct user groups:

### For Skill Authors

Create, validate, and test skills locally before publishing with confidence:

```bash
skc init my-skill           # Create a new skill
# ... edit SKILL.md ...
skc lint my-skill           # Validate quality
skc build my-skill          # Build for local testing
skc stats my-skill          # See how agents use your skill
git push origin main        # Publish to GitHub
```

### For Power Users

Compile any skill to unlock full-text search and usage analytics:

```bash
npx skills add user/skill   # Install a skill
skc build user-skill        # Enable search + analytics
skc search user-skill "api" # Full-text search
skc stats user-skill        # Usage insights
```

**Note:** Building is optional for consumers. Published skills work without compilation — building just enables search and analytics.

## Key Features

### Scaffolding

Create new skills with proper structure from the start:

```bash
skc init my-skill           # Project-local skill
skc init my-skill --global  # Global skill
```

skillc creates the directory with a valid `SKILL.md` template including required frontmatter.

### Linting

17 lint rules validate skill quality before publishing:

```
SKL1xx  Frontmatter validation (name, description, format)
SKL2xx  Structure rules (size, headings, hierarchy)
SKL3xx  Link validation (file exists, anchors, no escapes)
SKL4xx  File organization (orphan detection)
```

Example output:

```
$ skc lint my-skill
error[E300]: SKL102 name-format: name 'My-Skill' contains uppercase characters
warning[W300]: SKL104 name-match-dir: name 'foo' does not match directory 'bar'
```

### Compilation with Multi-Target Deploy

Build skills and deploy to specific agents:

```bash
skc build my-skill                  # Deploy to Claude (default)
skc build my-skill --target cursor  # Deploy to Cursor
skc build my-skill --target all     # Deploy to all configured targets
```

The compiler:

1. Creates a **stub** — a compact `SKILL.md` with gateway instructions
2. Builds a **search index** for full-text queries
3. Deploys to the specified agent's skill directory via symlink

### Full-Text Search

FTS5-indexed search over skill content:

```bash
skc search my-skill "borrow checker"
skc search my-skill "config" --limit 5
skc search my-skill "api" --format json
```

### Usage Analytics

Track which sections agents actually read:

```bash
skc stats my-skill                    # Summary
skc stats my-skill --group-by sections # Most accessed sections
skc stats my-skill --group-by files    # Most accessed files
skc stats my-skill --group-by search   # Most frequent search terms
```

This data enables data-driven skill refinement. If agents never read your "Advanced Configuration" section, maybe it should be restructured.

### MCP Integration

All read commands are exposed as MCP tools for direct agent integration:

```bash
skc mcp  # Start the MCP server
```

Available tools: `skc_outline`, `skc_show`, `skc_open`, `skc_sources`, `skc_search`, `skc_stats`, `skc_build`, `skc_init`, `skc_lint`.

Add to your agent's MCP configuration to enable seamless skill access.

## Storage Layout

```
.skillc/skills/     Project-local skills
~/.skillc/skills/   Global source store
~/.claude/skills/   Claude runtime (deployed)
~/.cursor/skills/   Cursor runtime (deployed)
```

## Command Reference

| Category      | Command       | Description                    |
| ------------- | ------------- | ------------------------------ |
| **Author**    | `skc init`    | Create new skill or project    |
|               | `skc lint`    | Validate structure and quality |
|               | `skc build`   | Compile and deploy locally     |
|               | `skc list`    | List all managed skills        |
| **Read**      | `skc outline` | List all sections              |
|               | `skc show`    | Show section content           |
|               | `skc open`    | Read file contents             |
|               | `skc search`  | Full-text search               |
|               | `skc sources` | List source files              |
| **Analytics** | `skc stats`   | Usage analytics                |
|               | `skc sync`    | Merge local logs               |
| **Agent**     | `skc mcp`     | Start MCP server               |

## Governed by govctl

skillc development follows strict phase discipline via govctl. The project has 10 normative RFCs:

- **RFC-0000** — Vision and compatibility guarantees
- **RFC-0001** — Skill compilation
- **RFC-0002** — Gateway commands (outline, show, open)
- **RFC-0003** — Usage analytics
- **RFC-0004** — Search protocol
- **RFC-0005** — Error code registry
- **RFC-0006** — Scaffolding (init)
- **RFC-0007** — CLI reference
- **RFC-0008** — Skill authoring standard (lint rules)
- **RFC-0009** — Configuration

## Design Principles

1. **Extend, don't reinvent** — Agent Skills is an open standard. skillc adds tooling; it doesn't fork the format.

2. **Observability unlocks iteration** — You can't improve what you can't measure. Instrumented access is the foundation.

3. **Progressive disclosure by default** — The spec recommends it; skillc enforces it. Stubs expose structure without content.

4. **Local-first, zero infrastructure** — Runs on your machine. Skills are files. No accounts, no network, no lock-in.

## What's Next

v0.1.0 establishes the core workflow: init → lint → build → stats. Future versions will add:

- Configurable lint rules via `.skillc/config.toml`
- SARIF output for IDE integration
- Additional lint rules (code block languages, heading hierarchy)
- Inline directives to suppress warnings

---

skillc is open source under MIT/Apache-2.0. Check out the [GitHub repository](https://github.com/govctl-org/skillc) to get started, and visit [agentskills.io](https://agentskills.io/) for the full Agent Skills specification.

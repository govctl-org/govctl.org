---
title: "govctl v0.9.3: TUI v2 Read-Only Cockpit"
description: "govctl 0.9.3 turns the terminal UI into a read-only cockpit for project overview, artifact discovery, search, loop DAG inspection, and diagnostics."
pubDate: 2026-06-07
tags: ["release", "govctl", "v0.9.3", "tui", "loops"]
author: "govctl team"
---

`govctl v0.9.3` is about making governed projects easier for humans to inspect.

The last two releases focused on execution state and discovery. `0.9.0` introduced local loops, work item dependencies, and TOML-only governance. `0.9.2` added project-wide search and faster artifact lookup. `0.9.3` brings those pieces into the terminal UI.

The TUI is now a **read-only cockpit**:

- it helps you understand project state quickly
- it exposes newer concepts such as loops, search, diagnostics, releases, and tags
- it keeps mutation owned by normal CLI commands

That last point is deliberate. `govctl tui` is for inspection, not a second edit model.

## Open The Cockpit

The TUI is included by default:

```bash
cargo install govctl
govctl tui
```

For minimal installations that do not need the terminal cockpit:

```bash
cargo install govctl --no-default-features
```

## More Than RFC Browsing

Earlier TUI versions were useful for browsing core artifacts, but the project model has grown. A governed repository now has RFCs, clauses, ADRs, work items, guards, releases, tags, search indexes, diagnostics, and local loop state.

`0.9.3` makes that broader state visible from one place.

The cockpit includes entry points for:

- overview
- RFCs
- clauses
- ADRs
- work items
- verification guards
- search
- loops
- diagnostics
- releases
- tags

The goal is not to replace the CLI. The goal is to let a human orient themselves before choosing the next command.

## Loop State With DAG Context

Loops were introduced as local execution state under `.govctl/loops/`. They coordinate one or more work items, preserve round evidence, and use work item dependencies to plan execution order.

In `0.9.3`, the TUI can list persisted loop states and inspect a selected loop with dependency context.

That matters when an execution run is interrupted. Instead of guessing which work item was next or which dependency blocked progress, you can open the cockpit, inspect the loop, and then return to the precise CLI command:

```bash
govctl loop list open
govctl loop show <LOOP-ID>
govctl loop run <LOOP-ID>
```

The TUI shows the state. The CLI still owns the state transition.

## Search And Diagnostics In The Same Place

`govctl search` made the governance corpus discoverable by topic, ID, tag, and artifact type. `0.9.3` brings search into the cockpit so you can move from overview to discovery without leaving the TUI.

Diagnostics are also visible. Instead of treating `govctl check` as a separate afterthought, the cockpit surfaces check output as part of the same project view.

That gives a more practical loop for humans:

1. inspect project state
2. find the relevant artifact
3. see current diagnostics
4. leave the TUI and run the explicit CLI mutation or verification command

## Read-Only By Design

The TUI deliberately does not create, edit, delete, move, finalize, render, or otherwise mutate governed artifacts.

It also does not mutate persisted loop state or round artifacts. Even when it displays loop data, dependency DAGs, and diagnostics, it remains an inspection surface.

This keeps the integrity model simple:

- governed TOML artifacts remain the source of truth
- local indexes remain disposable derived state
- loop files remain local execution state
- CLI commands remain the only mutation surface

## Small Interaction Fixes

`0.9.3` also tightens terminal behavior around the cockpit.

The TUI no longer enables mouse capture when it does not handle mouse events. That keeps ordinary terminal text selection and copy behavior from being disrupted by a feature the app is not using yet.

## Why This Release Matters

Governance is not only about preventing bad writes. It is also about making the current state understandable enough that people can choose the right next action.

`v0.9.3` makes `govctl tui` a better human-facing control surface for the 0.9 model: local loops, searchable artifacts, diagnostics, dependency context, and read-only inspection in one terminal view.

Full changelog: [CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

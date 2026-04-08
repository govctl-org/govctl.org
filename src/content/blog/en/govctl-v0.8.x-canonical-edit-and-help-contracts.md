---
title: "govctl v0.8.x: Canonical Edit, Simpler Planning, and Help You Can Trust"
description: "govctl 0.8 makes the path-first edit surface the public CLI contract, removes legacy JSON write paths for RFCs and clauses, and strengthens help text so agents can rely on it."
pubDate: 2026-04-08
tags: ["release", "govctl", "v0.8.0", "v0.8.1", "cli"]
author: "govctl team"
---

The `0.8.x` line is about making `govctl` easier to depend on, not just easier to demo.

`v0.8.0` turns the canonical path-first edit surface into the main public contract. `v0.8.1` follows with a smaller polish release for Codex-oriented agent generation. Together, they make the CLI more uniform for humans, more predictable for agents, and less dependent on historical quirks.

## The Canonical Edit Surface Is Now The Center

`govctl` has had edit verbs for a while, but the experience used to depend too much on artifact-specific sugar. In `0.8.x`, the path-first form is the one to learn and depend on:

```bash
govctl adr edit ADR-0038 decision --stdin
govctl work edit WI-2026-04-08-003 acceptance_criteria[0].status --set done
govctl clause edit RFC-0002:C-CRUD-VERBS text --stdin
```

This matters because it gives every artifact the same mental model:

- pick a resource
- pick an artifact ID
- pick a path
- apply a small edit verb

The older `set` / `add` / `remove` / `tick` commands still exist where appropriate, but they now route through the same planning path. That means fewer semantic forks and fewer “this resource works differently” surprises.

## Nested Paths Are No Longer A Special Case

The `0.8.0` line also generalized nested path resolution so object and array paths work at arbitrary supported depth.

That sounds internal, but it changes daily use. It means agents can target the field they actually intend to change instead of relying on resource-specific shortcuts:

```bash
govctl adr edit ADR-0038 alternatives[1].rejection_reason --set "Requires broad migration"
govctl work edit WI-2026-04-08-003 journal --add --stdin
govctl guard edit GUARD-GOVCTL-CHECK check.command --set "cargo run --quiet -- check"
```

This is a better contract than a pile of special verbs because the shape is stable even when the artifact gets deeper.

## Breaking Change: Legacy JSON Write Paths Are Gone

This is the real reason the release line moved to `0.8.0` instead of another patch release.

RFC and clause artifacts may still be **read** from legacy JSON for migration purposes, but `govctl` no longer writes them back in JSON. RFC/clause mutation and lifecycle operations now assume TOML as the canonical writable format.

If a repository still has JSON-only RFC or clause artifacts, migrate first:

```bash
govctl migrate
govctl check
```

This intentionally removes a half-legacy state where the CLI had to preserve multiple write contracts at once.

## Help Text Became A Real Contract

One of the less flashy but more important improvements in this release line is help quality.

We tightened command planning so the CLI is easier to reason about internally, but the user-facing effect is more important: `--help` now acts much more like a small spec. Resource root commands, `get`, `tick`, lifecycle verbs, and other high-value paths now explain:

- when to use the command
- what the key arguments mean
- what values are valid
- how the command differs from nearby commands
- examples an agent can copy directly

That matters because the CLI is the stable interface between human workflows and agent workflows. If help text is vague, agents drift. If help text is explicit, the CLI becomes a much stronger automation boundary.

## `v0.8.1`: Better Codex Output Ergonomics

`v0.8.1` is smaller, but it continues the same theme of making the CLI easier for agent-driven workflows to consume.

Two changes landed:

- `--format codex` now writes `.toml` agent files with `developer_instructions`
- `--dir` now overrides the output directory directly without requiring config edits

These are not headline features on the scale of canonical edit, but they make generated agent configuration more predictable and easier to integrate into real repositories.

## Why This Release Matters

The important shift in `0.8.x` is not just “more commands.” It is that several ambiguous edges were removed at the same time:

- one canonical edit shape
- one stronger nested-path model
- one writable format for RFCs and clauses
- one more trustworthy help contract for agents

That is the kind of boring consolidation that makes a CLI viable as infrastructure.

## Upgrade Path

If you are already on TOML-governed artifacts:

```bash
cargo install govctl
govctl check
```

If you still have legacy JSON RFC or clause artifacts:

```bash
cargo install govctl
govctl migrate
govctl check
```

Full changelog: [CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

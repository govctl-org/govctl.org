---
title: "govctl v0.6.0: TOML-First Storage, Verification Guards, and a Styled TUI"
description: "The biggest govctl release yet: all artifacts are now TOML with IDE-discoverable schema headers, verification guards enforce completion gates, and the TUI renders styled markdown."
pubDate: 2026-03-17
tags: ["release", "govctl", "v0.6.0"]
author: "govctl team"
---

govctl v0.6.0 is the largest release since launch. Three themes: **format unification**, **enforcement**, and **developer experience**.

## TOML-First Storage

All governance artifacts are now stored as TOML with a consistent `[govctl]` + `[content]` layout and IDE-discoverable `#:schema` comment headers:

```toml
#:schema ../../schema/rfc.schema.json

[govctl]
id = "RFC-0015"
title = "Caching Strategy"
version = "0.1.0"
status = "normative"
phase = "impl"
owners = ["@you"]

[content]
summary = "Define the caching architecture."
```

The `#:schema` header gives IDEs (VS Code, IntelliJ, Zed) instant validation and autocomplete for every governance file without any plugin configuration. Point your editor at a `.toml` file in `gov/` and it just works.

### Migration from JSON

Legacy JSON-based RFCs and clauses are automatically converted:

```bash
govctl migrate
```

This runs a transactional pipeline: stage all changes, back up originals, commit atomically, and roll back on any failure. The schema version in `gov/config.toml` tracks which migrations have been applied. After v0.6.0, `govctl check` warns if your schema version is outdated.

## Verification Guards

Guards are the most impactful new feature. They are executable completion checks that run automatically when a work item moves to `done`:

```toml
#:schema ../schema/guard.schema.json

[govctl]
id = "GUARD-CARGO-TEST"
title = "cargo test passes"

[check]
command = "cargo test"
timeout_secs = 300
```

Configure required guards in `gov/config.toml`:

```toml
[verification]
enabled = true
default_guards = ["GUARD-GOVCTL-CHECK", "GUARD-CARGO-TEST"]
```

When you run `govctl work move WI-... done`, every guard executes. If any guard fails, the transition is rejected. This closes a gap where agents could mark work items as done by ticking acceptance criteria without actually running the tests.

Guards support:

- Custom shell commands run from the project root
- Configurable timeouts (default 300s)
- Optional regex pattern matching on stdout/stderr
- Per-work-item overrides and waivers

## Styled Terminal Output

The `show` commands now render **styled markdown** instead of dumping raw markdown source:

```bash
govctl rfc show RFC-0015
govctl adr show ADR-0003
govctl work show WI-2026-03-17-001
```

Under the hood, the rendering pipeline generates markdown, strips HTML artifacts (signature comments, anchor tags, relative links), transforms checkboxes, and renders through `markdown-to-ansi` with syntax highlighting, bold/italic, and proper heading formatting. When stdout is not a TTY (piped to a file or another tool), it falls back to clean plain text.

## TUI Overhaul

The interactive TUI (`govctl tui`) received a ground-up refresh:

**Unified semantic theme.** A single `SemanticColor` enum in `src/theme.rs` drives all three rendering backends (owo-colors for CLI, comfy-table for lists, ratatui for TUI). Deprecated items are consistently de-emphasized in grey rather than alarming red.

**Markdown rendering in detail views.** ADR, work item, and clause detail views now render through the same styled markdown pipeline as the CLI `show` commands, via an `ansi-to-tui` bridge. This replaced ~180 lines of manual widget construction with ~30 lines of pipeline code.

**Scroll and navigation fixes.** Scroll position now accounts for word-wrap using unicode display width. Half-page (`Ctrl+d`/`Ctrl+u`) and full-page (`PgDn`/`PgUp`) scroll are supported. Filtered list indices are cached per frame instead of recomputed 2-3 times.

**Default-enabled.** The TUI feature is now on by default -- `cargo install govctl` includes it.

## Schema Version Detection

`govctl check` now warns when your project's schema version is behind the current govctl version:

```
warning[W0110]: Schema version 1 is outdated (latest: 2). Run `govctl migrate` to upgrade. (gov/config.toml)
```

New projects created with `govctl init` start at the latest schema version automatically.

## Breaking Changes

- The `gov_root` config option has been removed. The governance directory is always `gov/`.
- The `govctl.schema` field has been removed from all artifact types. Format evolution is tracked by the project-level `[schema] version` in `gov/config.toml`.
- RFC and clause TOML files now use the `[govctl]` + `[content]` wire format. Legacy flat formats are still accepted on read but not written.

## Upgrade Path

```bash
cargo install govctl
govctl migrate
govctl check
```

The migration is safe, transactional, and idempotent. Run it, verify with `govctl check`, and commit the results.

## What's Next

- RFC-0002 (CLI Resource Model) advancing to stable
- `govctl describe` context-aware mode for agent discoverability
- Release management improvements

Install or upgrade:

```bash
cargo install govctl
```

Full changelog: [CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

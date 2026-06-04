---
title: "govctl v0.9.0: Local Loops and TOML-Only Governance"
description: "govctl 0.9 adds persisted local loop state, dependency-aware work planning, cleaner execution memory, and removes legacy RFC/clause JSON storage support from normal operation."
pubDate: 2026-06-04
tags: ["release", "govctl", "v0.9.0", "loops", "governance"]
author: "govctl team"
---

`govctl v0.9.0` is a release about execution discipline.

Earlier releases made governance artifacts more uniform: TOML storage, path-first edits, reusable guards, controlled tags, and stronger help text. `0.9.0` builds on that foundation by separating **task state** from **execution trace**.

The short version:

- work items remain the durable unit of planned work
- dependencies are now first-class
- loops coordinate local execution rounds
- durable lessons go into notes
- transient execution evidence lives outside work items
- legacy RFC/clause JSON storage is no longer part of normal operation

This is also a breaking release. If a repository still contains legacy `rfc.json` or clause JSON files, migrate with a pre-0.9 `govctl` before upgrading.

## Loops Are Local Execution State

The headline feature is the new loop workflow:

```bash
govctl loop start WI-2026-06-04-001 WI-2026-06-04-002
govctl loop list open
govctl loop run LOOP-2026-06-04-001
govctl loop replan LOOP-2026-06-04-001
```

Loops are not a new kind of governance artifact. They are local state under `.govctl/loops/`, used to coordinate execution across one or more work items.

That distinction matters. Work items are durable project history. A loop is the working state for an execution run: what is ready, what is blocked, what round is open, and what evidence was recorded for that round.

`govctl loop run` intentionally does not implement code for you, tick acceptance criteria, or move work items to `done`. It opens and validates a local round protocol. Humans and agents still perform the actual implementation steps.

## Generated Loop IDs, Not Handwritten Names

Loops use generated IDs:

```text
LOOP-YYYY-MM-DD-NNN
```

That avoids the collision-prone pattern of agents inventing free-form loop names. It also makes interruption recovery practical:

```bash
govctl loop list open
govctl loop show LOOP-2026-06-04-001
govctl loop resume LOOP-2026-06-04-001
```

The rule is simple: let `govctl loop start` generate the ID, then reuse that printed ID for later commands.

## Work Item Dependencies Are First-Class

`0.9.0` adds `depends_on` for work items:

```bash
govctl work add WI-2026-06-04-002 depends_on WI-2026-06-04-001
govctl check
```

`govctl check` validates dependency shape, unknown IDs, and cycles. The same dependency model feeds loop planning, so a loop can compute an execution order instead of relying on whatever order an agent happened to choose.

When dependencies fail or are cancelled, downstream work can be marked blocked in loop state. That gives agents a concrete reason to stop instead of continuing into work that no longer has its prerequisite state.

## Loop Scope Uses `work`

Loop scope mutation now uses `work` as the editable field:

```bash
govctl loop add LOOP-2026-06-04-001 work WI-2026-06-04-003
govctl loop remove LOOP-2026-06-04-001 work WI-2026-06-04-002
govctl loop replan LOOP-2026-06-04-001
```

`wi` is accepted as a short alias, but the documented shape is `work`. Older experimental field names such as `work_items` and `root_work_items` are rejected.

This keeps the loop API aligned with the rest of the CLI: a noun, an ID, a field, and a small edit operation.

## Execution Trace Moves Out Of Work Items

Work items should describe durable planned work and durable outcomes. They should not become a dumping ground for every command an agent ran.

In `0.9.0`, new execution trace belongs in loop state and round files. Durable takeaways belong in `notes`.

Existing legacy inline execution history still renders correctly when showing or rendering a work item, but it is no longer a separately editable work item field. That keeps older repositories readable without keeping the old mutation surface alive.

This is a product-level cleanup, not just an internal schema change. It gives each kind of information a clearer home:

- `description`: what the work is about
- `acceptance_criteria`: what must be true before closure
- `notes`: durable constraints or lessons
- loop rounds: transient execution evidence

## TOML-Only RFC And Clause Storage

The other major cutoff in `0.9.0` is storage compatibility.

Legacy RFC/clause JSON storage is no longer supported in normal operation. Repositories that still contain `rfc.json` or clause JSON files now fail with a coded `E0505` diagnostic and clear upgrade guidance.

If you still have JSON governance artifacts, use a pre-0.9 version first:

```bash
cargo install govctl --version 0.8.5
govctl migrate
govctl check
```

Then upgrade to `0.9.0`.

`govctl migrate` in `0.9.0` focuses on TOML artifact and schema metadata upgrades. It no longer performs RFC/clause JSON conversion. That keeps the current migration command honest about what formats the current release actually supports.

## Cleaner Diagnostics And Safer Edits

This release also continues the diagnostic cleanup from earlier versions.

More CLI-visible routing, file I/O, serialization, and scan paths now return coded `Diagnostic` values instead of generic errors. That matters because agents and CI systems need stable failure modes, not just strings.

Reference edits also became stricter. `refs` edits now validate target existence and the RFC/ADR reference hierarchy before writing, including indexed updates such as `refs[0]`.

That turns bad relationships into immediate edit-time failures instead of delayed `govctl check` surprises.

## Upgrade Notes

For TOML-only repositories:

```bash
cargo install govctl
govctl check
```

For repositories that still contain legacy RFC/clause JSON:

```bash
cargo install govctl --version 0.8.5
govctl migrate
govctl check
cargo install govctl
govctl check
```

The main behavior changes to be aware of:

- use `govctl loop list open` when resuming interrupted local execution
- use generated loop IDs
- use `loop add/remove <ID> work <WI-ID>` to change loop scope
- put durable lessons in work item notes
- keep transient execution evidence in loop rounds
- migrate legacy JSON before upgrading to 0.9

`v0.9.0` is a consolidation release with a clear direction: governance artifacts should remain durable and reviewable, while local execution trace should stay local, structured, and resumable.

Full changelog: [CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

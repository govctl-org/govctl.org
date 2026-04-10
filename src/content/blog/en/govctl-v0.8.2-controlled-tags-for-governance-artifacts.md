---
title: "govctl v0.8.2: Controlled Tags for Governance Artifacts"
description: "govctl 0.8.2 adds controlled-vocabulary tags across RFCs, ADRs, clauses, work items, and guards, plus tag management commands and tag-aware list filtering."
pubDate: 2026-04-10
tags: ["release", "govctl", "v0.8.2", "tags", "governance"]
author: "govctl team"
---

`govctl v0.8.2` is a smaller release than the `0.8.0` line, but it adds an important missing primitive: **controlled tags**.

Up to now, teams could organize governance artifacts through IDs, refs, phases, and statuses, but there was no first-class way to attach a stable, shared vocabulary across artifact types. That made cross-cutting grouping awkward. You could encode it in titles, refs, filenames, or free-form notes, but none of those were a good fit.

This release fixes that.

## Tags Are Now First-Class Across All Artifact Types

All five governed artifact types now support `tags`:

- RFC
- Clause
- ADR
- Work Item
- Guard

That matters because many real governance questions cut across artifact boundaries:

- Which artifacts are related to `parser`?
- What work belongs to `migration`?
- Which ADRs, RFCs, and guards are all part of `release` hardening?

Those are not lifecycle questions. They are classification questions. Tags are the right tool for that.

## Controlled Vocabulary, Not Tag Sprawl

The important design choice here is that govctl tags are **controlled**, not free-for-all.

`govctl check` now validates artifact tags against the configured allowed tag list. In other words, this is not a generic folksonomy feature where every agent invents its own spelling and casing. It is a project-level vocabulary.

That keeps tags useful for:

- review
- automation
- filtering
- consistent reporting

instead of turning into another layer of metadata drift.

## New `govctl tag` Commands

This release adds three new commands:

```bash
govctl tag new parser
govctl tag list
govctl tag delete parser
```

`govctl tag list` includes usage counts, which makes the vocabulary auditable. You can see which tags are actually in use and clean up dead ones instead of guessing.

This is a subtle but important product choice: once tags become part of project governance, they also need lifecycle and visibility.

## Tag-Aware Filtering

Tags are not just stored. They are queryable.

You can now filter list commands with `--tag` across all five resources:

```bash
govctl rfc list --tag parser
govctl adr list --tag migration
govctl work list --tag release
govctl guard list --tag quality
```

This turns tags into a practical navigation tool instead of passive metadata.

For agent workflows, this is especially useful. Agents often need a compact way to narrow the relevant working set before reading or mutating artifacts. `--tag` is much cleaner than overloading refs or scanning titles.

## Why This Matters

`govctl` is built around governed artifacts as the control plane for software delivery. Tags make that control plane easier to slice without weakening it.

They are useful precisely because they are **not** a replacement for:

- refs
- lifecycle status
- phase
- ownership

Those concepts still mean different things. Tags fill the gap for stable cross-cutting classification.

That is the right level of abstraction:

- refs answer “what authorizes or relates to this?”
- status answers “where is this in its lifecycle?”
- tags answer “what kind of concern does this belong to?”

## A Small But Useful Fix

`v0.8.2` also fixes a regression in clause editing:

```bash
govctl clause edit <ID> text --stdin
```

now works again without requiring an explicit `--set`.

That is not the headline of the release, but it keeps the path-first editing contract smooth for one of the most common governance-authoring flows.

## Upgrade Notes

No artifact format migration is required for `v0.8.2`.

If you want to adopt controlled tags, the path is:

1. define the allowed tag vocabulary for your project
2. add tags to artifacts where they improve navigation and reporting
3. use `govctl tag list` and `--tag` filters to keep the vocabulary useful

This is a small release, but a high-leverage one. Tags do not add ceremony for its own sake. They make governed artifacts easier to query, group, and automate without weakening the discipline around them.

Full changelog: [CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

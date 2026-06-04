---
title: "govctl v0.9.2: Search and Faster Artifact Lookup"
description: "govctl 0.9.2 adds project-wide governance artifact search and speeds up common single-artifact commands with a local catalog that never becomes the source of truth."
pubDate: 2026-06-05
tags: ["release", "govctl", "v0.9.2", "search", "performance"]
author: "govctl team"
---

`govctl v0.9.2` is about finding the right governance artifact faster.

The `0.9.0` release cleaned up execution state: loops became local state, work item dependencies became first-class, and legacy JSON storage was removed from normal operation. `0.9.2` builds on that foundation with two practical improvements:

- project-wide search across governed artifacts
- faster single-artifact lookup for common commands

The important design constraint is the same in both cases: local indexes are disposable acceleration data. TOML governance artifacts remain the source of truth.

## Search Across The Governance Corpus

The new command is direct:

```bash
govctl search caching
govctl search "work item" --type work
govctl search RFC-0002 -o json
govctl search migration --tag cli -n 5
govctl search cache --reindex
```

By default, `govctl search` searches RFCs, clauses, ADRs, work items, and verification guards. Use `--type` when you only want one or more artifact kinds:

```bash
govctl search schema --type rfc --type adr
```

Tags are intentionally strict. Multiple `--tag` flags mean the result must contain every requested tag:

```bash
govctl search migration --tag cli --tag schema
```

That makes tags useful for narrowing broad text matches to a specific domain.

## Stable Output For Humans And Agents

The default output is a table for interactive use. For automation, use JSON or plain output:

```bash
govctl search RFC-0002 -o json
govctl search dependency --type work -o plain
```

This matters for agent workflows. Agents can now discover relevant governance context without guessing filenames, scanning rendered Markdown, or relying on ad hoc shell pipelines.

It also keeps the CLI contract explicit: query terms are user search terms, not raw backend query syntax.

## Fresh Indexes, Not Second Sources Of Truth

Search uses local derived state under `.govctl/`. That keeps search fast without putting cache files into `gov/` or rendered docs.

Before returning indexed results, `govctl search` establishes freshness. Changed artifacts are updated, deleted artifacts are removed from the index, and `--reindex` forces a full rebuild:

```bash
govctl search cache --reindex
```

If freshness cannot be established, `govctl` must not silently return stale indexed results. The index is an implementation detail; the governed TOML files are still authoritative.

## Faster Direct Lookup

`0.9.2` also improves commands that operate on a single artifact ID.

Previously, many single-artifact paths loaded an entire collection and searched in memory for the requested ID. That was simple, but it made common commands pay full-directory scan costs even when the filesystem layout or local metadata could identify the target directly.

Now RFCs, clauses, ADRs, work items, and guards use direct path resolution or a local artifact catalog where possible.

The catalog is deliberately conservative:

- commands still read the target artifact before trusting it
- the artifact's stored ID must match the requested ID
- stale catalog entries are repaired or bypassed
- local catalog data never authorizes a mutation by itself

That gives larger repositories a faster day-to-day path without weakening the integrity model.

## Why This Matters

Governance only works if people and agents can find the relevant context at the moment they need it.

Search makes the corpus discoverable by topic, ID, tag, and artifact type. The catalog makes ID-based workflows cheaper. Together, they reduce the friction of asking questions like:

- Which ADR decided this?
- Which work items mention this migration?
- Which clauses define this CLI behavior?
- Which guard is tied to this verification path?

`v0.9.2` is a small release, but it changes the feel of working in a governed repository: less manual digging, fewer full scans for targeted actions, and no compromise on artifact authority.

Full changelog: [CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

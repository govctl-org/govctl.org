---
title: "Understanding Phase Discipline"
description: "A deep dive into the spec → impl → test → stable workflow and why it's essential for deterministic AI-assisted development."
pubDate: 2026-01-20
tags: ["concepts", "phase-discipline", "workflow"]
author: "govctl team"
---

Phase discipline is the core concept behind govctl. It's a simple idea with profound implications for how we work with AI coding assistants.

## The Two Lifecycles

govctl enforces two distinct lifecycles that work together:

### Status Lifecycle (RFC Maturity)

```
draft → normative → deprecated
```

- **draft**: Under discussion. Implementation MUST NOT depend on draft RFCs.
- **normative**: Binding. Implementation MUST conform to the spec.
- **deprecated**: Superseded. No new work permitted.

### Phase Lifecycle (Development Stage)

```
spec → impl → test → stable
```

- **spec**: Defining what will be built. No implementation work permitted.
- **impl**: Building what was specified.
- **test**: Verifying implementation matches specification.
- **stable**: Released for production use.

## The Four Phases

### 1. Spec (Specification)

The spec phase defines **what** should change without defining **how**. This is where you:

- Draft the RFC with clauses
- Define normative requirements using RFC 2119 keywords (MUST, SHOULD, MAY)
- Set acceptance criteria
- Get review and approval

```bash
# Create an RFC
govctl rfc new "Add rate limiting to API"

# Add clauses
govctl clause new RFC-0015:C-SCOPE "Scope" -s "Specification" -k normative
govctl clause new RFC-0015:C-LIMITS "Rate Limits" -s "Specification" -k normative

# Edit clause content
govctl clause edit RFC-0015:C-LIMITS --stdin <<'EOF'
The system MUST limit requests to 100/minute per API key.
The system MUST return 429 status when exceeded.
The system SHOULD include retry-after header.
EOF
```

The spec phase forces you to think before you code. When working with an AI assistant, the RFC becomes the AI's operating constraints.

### 2. Impl (Implementation)

Once the RFC is normative, you can advance to implementation:

```bash
# Make RFC binding
govctl rfc finalize RFC-0015 normative

# Advance to implementation phase
govctl rfc advance RFC-0015 impl
```

In impl phase:

- Code is written according to the spec
- Changes must conform to normative clauses
- AI assistants operate within RFC boundaries

The impl phase can iterate. But you cannot leave impl until the implementation satisfies the spec.

### 3. Test (Verification)

The test phase proves the implementation meets the spec:

```bash
govctl rfc advance RFC-0015 test
```

- Write tests that verify each normative clause
- Run the test suite
- Document edge cases discovered

If tests fail, you may need to return to impl to fix issues.

### 4. Stable (Production-Ready)

The stable phase marks a change as complete:

```bash
govctl rfc advance RFC-0015 stable
```

In stable phase:

- The spec is fulfilled
- The implementation is correct
- Bug fixes only — no new features
- The RFC becomes part of project history

## Phase Transition Rules

Transitions between phases are explicit and validated:

```
From      To        Requires
────────────────────────────────────────────
spec   →  impl      RFC status = normative
impl   →  test      Implementation complete
test   →  stable    All tests passing
```

You cannot skip phases. `spec → stable` is invalid. This ensures every change goes through proper verification.

## Status × Phase Compatibility

```
              spec    impl    test    stable
─────────────────────────────────────────────
draft          OK      WARN    WARN    NO
normative      OK      OK      OK      OK
deprecated     OK      NO      NO      OK
```

- **WARN** = experimental, gates are soft warnings
- **NO** = forbidden

## Why Phases Matter for AI Coding

AI assistants are powerful but context-limited. They don't inherently know:

- What they're allowed to change
- What phase of work they're in
- What contracts must be preserved

Phase discipline provides this context. When you tell the AI "we're in impl phase for RFC-0015", it knows:

- The RFC defines boundaries
- It should generate implementation code
- It must conform to normative clauses

This transforms AI from a chaotic code generator into a disciplined collaborator.

## Practical Example

Let's trace a real change through all phases:

```bash
# Initialize govctl
govctl init

# Spec phase: Create and define RFC
govctl rfc new "Add dark mode support"
govctl clause new RFC-0001:C-SCOPE "Scope" -s "Specification" -k normative
govctl clause new RFC-0001:C-TOGGLE "Toggle" -s "Specification" -k normative
govctl clause edit RFC-0001:C-TOGGLE

# Make it normative (binding)
govctl rfc finalize RFC-0001 normative

# Impl phase: Build it
govctl rfc advance RFC-0001 impl
# Work with AI to generate CSS variables, theme toggle, etc.

# Test phase: Verify it
govctl rfc advance RFC-0001 test
# Write tests for theme switching, persistence, accessibility

# Stable phase: Ship it
govctl rfc advance RFC-0001 stable
# Change is now part of project history

# Validate everything
govctl check
```

Each phase creates a checkpoint. If something goes wrong in production, you can trace back through the phases to understand what happened.

## Conclusion

Phase discipline isn't about slowing down — it's about moving fast with confidence. When every change is structured, verified, and auditable, you can trust your AI assistants to help without fear of chaos.

The `spec → impl → test → stable` workflow is simple enough to remember, powerful enough to govern complex changes, and flexible enough to adapt to any project.

---

Ready to add phase discipline to your workflow? Check out the [govctl documentation](https://govctl-org.github.io/govctl/) to get started.

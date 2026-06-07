---
title: "govctl v0.9.3：TUI v2 只读 Cockpit"
description: "govctl 0.9.3 将终端 UI 升级为只读 cockpit，用于项目概览、制品发现、搜索、loop DAG 检查和诊断查看。"
pubDate: 2026-06-07
tags: ["release", "govctl", "v0.9.3", "tui", "loops"]
author: "govctl team"
---

`govctl v0.9.3` 关注的是一件很人的事情：让 governed project 更容易被看懂。

前两个版本主要在整理执行状态和发现能力。`0.9.0` 引入了本地 loop、work item 依赖和 TOML-only 治理。`0.9.2` 增加了项目级搜索和更快的制品查找。`0.9.3` 把这些能力带进了终端 UI。

现在的 TUI 是一个**只读 cockpit**：

- 帮你快速理解项目状态
- 展示 loop、search、diagnostics、release、tag 等较新的治理概念
- 继续让所有 mutation 由正常 CLI 命令负责

最后一点是有意为之。`govctl tui` 是检查界面，不是第二套编辑模型。

## 打开 Cockpit

TUI 默认包含在安装中：

```bash
cargo install govctl
govctl tui
```

如果你只需要最小安装、不需要终端 cockpit：

```bash
cargo install govctl --no-default-features
```

## 不只是浏览 RFC

早期 TUI 已经能浏览核心制品，但现在项目模型更丰富了。一个 governed repository 里会有 RFC、clause、ADR、work item、guard、release、tag、search index、diagnostics，以及本地 loop state。

`0.9.3` 让这些状态可以从同一个入口看到。

Cockpit 提供这些入口：

- overview
- RFC
- clause
- ADR
- work item
- verification guard
- search
- loop
- diagnostics
- release
- tag

目标不是替代 CLI，而是让人先获得上下文，再选择下一条准确命令。

## 带 DAG 上下文的 Loop State

Loop 是 `.govctl/loops/` 下的本地执行状态。它协调一个或多个 work item，保存 round evidence，并使用 work item dependency 计算执行顺序。

在 `0.9.3` 中，TUI 可以列出持久化的 loop state，并在选中 loop 时展示 dependency context。

这对中断恢复很有用。你不需要猜下一个 work item 是谁，也不需要猜是哪条依赖阻塞了进展。打开 cockpit，看清 loop，再回到精确的 CLI 命令：

```bash
govctl loop list open
govctl loop show <LOOP-ID>
govctl loop run <LOOP-ID>
```

TUI 展示状态。CLI 负责状态转换。

## 搜索和诊断放在同一个地方

`govctl search` 让治理语料可以按主题、ID、tag 和制品类型发现。`0.9.3` 把 search 带进 cockpit，让你可以从项目概览直接进入发现流程。

Diagnostics 也变成 cockpit 的一部分。`govctl check` 不再只是另一个单独步骤，它的结果可以和项目状态一起被查看。

这给人提供了一个更实用的工作节奏：

1. 检查项目状态
2. 找到相关制品
3. 查看当前 diagnostics
4. 离开 TUI，执行明确的 CLI mutation 或 verification 命令

## 只读是设计选择

TUI 不会 create、edit、delete、move、finalize、render，也不会以其他方式修改 governed artifacts。

它也不会修改持久化 loop state 或 round artifacts。即使展示 loop data、dependency DAG 和 diagnostics，它仍然只是检查界面。

这样完整性模型保持简单：

- governed TOML artifacts 仍然是 source of truth
- local indexes 仍然是可丢弃的 derived state
- loop files 仍然是本地执行状态
- CLI commands 仍然是唯一 mutation surface

## 小的交互修复

`0.9.3` 也收紧了 cockpit 的终端行为。

TUI 不再在没有处理 mouse events 的情况下启用 mouse capture。这样普通的终端选择和复制不会被一个还没有使用的功能干扰。

## 为什么这个版本重要

治理不只是阻止错误写入。它还要让当前状态足够清楚，让人能选择正确的下一步。

`v0.9.3` 让 `govctl tui` 更适合作为 0.9 模型的人类控制面：本地 loop、可搜索制品、diagnostics、依赖上下文和只读检查，都在同一个终端界面中。

完整变更日志：[CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

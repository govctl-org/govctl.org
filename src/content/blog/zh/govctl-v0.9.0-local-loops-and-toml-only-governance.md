---
title: "govctl v0.9.0：本地 Loop 与 TOML-only 治理"
description: "govctl 0.9 引入持久化本地 loop 状态、基于依赖的 work planning、更清晰的执行记忆边界，并从正常操作中移除旧 RFC/Clause JSON 存储支持。"
pubDate: 2026-06-04
tags: ["release", "govctl", "v0.9.0", "loops", "governance"]
author: "govctl team"
---

`govctl v0.9.0` 是一版围绕执行纪律的发布。

之前几个版本让治理制品变得更统一：TOML 存储、path-first edit、可复用 guard、受控标签，以及更可信的 help 文本。`0.9.0` 在这个基础上继续往前走，把**任务状态**和**执行轨迹**分开。

简短版本：

- work item 仍然是持久化的计划工作单元
- 依赖关系变成一等公民
- loop 用来协调本地执行 round
- 持久经验进入 notes
- 临时执行证据留在 work item 之外
- 旧 RFC/Clause JSON 存储不再属于正常操作路径

这也是一个 breaking release。如果仓库里仍然有旧的 `rfc.json` 或 clause JSON 文件，请先用 0.9 之前的 `govctl` 完成迁移，再升级。

## Loop 是本地执行状态

这一版最核心的新能力是 loop workflow：

```bash
govctl loop start WI-2026-06-04-001 WI-2026-06-04-002
govctl loop list open
govctl loop run LOOP-2026-06-04-001
govctl loop replan LOOP-2026-06-04-001
```

Loop 不是一种新的治理制品。它是 `.govctl/loops/` 下的本地状态，用来协调一个或多个 work item 的执行。

这个区别很重要。Work item 是持久项目历史。Loop 是一次执行 run 的工作状态：哪些 work ready，哪些 blocked，当前 round 是否打开，以及这个 round 记录了什么 evidence。

`govctl loop run` 也有意不替你实现代码、不 tick acceptance criteria、不把 work item 移到 `done`。它打开并校验一个本地 round protocol。真正的实现步骤仍然由人或 agent 执行。

## 使用生成的 Loop ID，而不是手写名称

Loop 使用生成 ID：

```text
LOOP-YYYY-MM-DD-NNN
```

这避免了 agent 自己编普通文本名称带来的 collision 问题，也让中断恢复更实际：

```bash
govctl loop list open
govctl loop show LOOP-2026-06-04-001
govctl loop resume LOOP-2026-06-04-001
```

规则很简单：让 `govctl loop start` 生成 ID，之后所有命令都复用它打印出来的 ID。

## Work Item 依赖成为一等公民

`0.9.0` 为 work item 加入了 `depends_on`：

```bash
govctl work add WI-2026-06-04-002 depends_on WI-2026-06-04-001
govctl check
```

`govctl check` 会校验依赖格式、未知 ID 和循环依赖。同一套依赖模型也会进入 loop planning，所以 loop 可以计算执行顺序，而不是依赖某个 agent 当时随手选择的顺序。

当依赖失败或取消时，下游 work 可以在 loop state 中标记为 blocked。这样 agent 有一个明确理由停下来，而不是继续推进一个前置条件已经不存在的任务。

## Loop Scope 使用 `work`

Loop scope mutation 现在使用 `work` 作为可编辑字段：

```bash
govctl loop add LOOP-2026-06-04-001 work WI-2026-06-04-003
govctl loop remove LOOP-2026-06-04-001 work WI-2026-06-04-002
govctl loop replan LOOP-2026-06-04-001
```

`wi` 作为短别名仍然可用，但文档里的标准写法是 `work`。早期实验中的 `work_items` 和 `root_work_items` 字段名会被拒绝。

这让 loop API 和项目里其他 CLI 模式保持一致：noun、ID、字段，以及一个小的 edit operation。

## 执行轨迹移出 Work Item

Work item 应该描述持久计划和持久结果，不应该变成 agent 跑过的每条命令的堆放处。

在 `0.9.0` 中，新的执行轨迹属于 loop state 和 round 文件。持久经验属于 `notes`。

已有的旧 inline execution history 在 show 或 render work item 时仍然可以正确显示，但它不再是一个可以单独编辑的 work item 字段。这样旧仓库仍然可读，同时不再保留旧的 mutation surface。

这不是单纯的内部 schema 清理，而是产品层面的边界调整。每类信息都有更清晰的归属：

- `description`：这项工作是什么
- `acceptance_criteria`：关闭前必须满足什么
- `notes`：持久约束或经验
- loop rounds：临时执行证据

## RFC 和 Clause 存储进入 TOML-only

`0.9.0` 的另一个主要切断点是存储兼容性。

旧 RFC/Clause JSON 存储不再支持正常操作。仓库中如果仍然存在 `rfc.json` 或 clause JSON 文件，现在会得到带有代码的 `E0505` diagnostic 和明确的升级指引。

如果你还有 JSON 治理制品，请先使用 0.9 之前的版本：

```bash
cargo install govctl --version 0.8.5
govctl migrate
govctl check
```

然后再升级到 `0.9.0`。

`0.9.0` 中的 `govctl migrate` 聚焦 TOML 制品和 schema metadata 的升级，不再执行 RFC/Clause JSON 转换。这让当前版本的 migrate 命令更准确地反映当前版本真正支持的格式边界。

## 更清晰的 Diagnostics 与更安全的 Edit

这一版也延续了前几个版本的 diagnostic 清理。

更多 CLI 可见的 command routing、file I/O、serialization 和 scan path 现在返回带代码的 `Diagnostic`，而不是泛化错误。对 agent 和 CI 来说，这很重要：它们需要稳定的失败模式，而不仅仅是一段字符串。

`refs` edit 也更严格了。现在写入前会校验目标是否存在，以及 RFC/ADR 引用层级是否正确，包括 `refs[0]` 这类 indexed update。

这会把错误关系提前变成 edit-time failure，而不是等到之后 `govctl check` 才暴露。

## 升级说明

对已经是 TOML-only 的仓库：

```bash
cargo install govctl
govctl check
```

对仍然包含旧 RFC/Clause JSON 的仓库：

```bash
cargo install govctl --version 0.8.5
govctl migrate
govctl check
cargo install govctl
govctl check
```

需要注意的主要行为变化：

- 恢复中断的本地执行时，先用 `govctl loop list open`
- 使用生成的 loop ID
- 使用 `loop add/remove <ID> work <WI-ID>` 修改 loop scope
- 把持久经验写入 work item notes
- 把临时执行证据留在 loop round 中
- 升级到 0.9 前先迁移旧 JSON

`v0.9.0` 是一版方向很明确的 consolidation release：治理制品应该保持持久、可 review；本地执行轨迹应该保持本地、结构化、可恢复。

完整变更日志：[CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

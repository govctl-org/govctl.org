---
title: "govctl v0.8.x：canonical edit、简化命令规划与可依赖的帮助文案"
description: "govctl 0.8 将 path-first canonical edit surface 提升为公开 CLI 契约，移除了 RFC/Clause 的遗留 JSON 写路径，并把帮助文本强化为 agent 可依赖的命令说明。"
pubDate: 2026-04-08
tags: ["release", "govctl", "v0.8.0", "v0.8.1", "cli"]
author: "govctl team"
---

`0.8.x` 这一条发布线，重点不是“多了几个命令”，而是让 `govctl` 更适合作为可以长期依赖的接口，而不是只适合演示的工具。

`v0.8.0` 把 canonical、path-first 的 edit surface 推成了主公开契约。`v0.8.1` 则在此基础上补了一轮面向 Codex 代理生成的易用性改进。两者组合起来，让 CLI 对人类更统一、对 agent 更可预测，也更少依赖历史兼容包袱。

## Canonical Edit Surface 现在是中心

`govctl` 以前就有编辑命令，但实际体验常常受制于各个制品自己的 sugar。到了 `0.8.x`，真正应该学习和依赖的是 path-first 形式：

```bash
govctl adr edit ADR-0038 decision --stdin
govctl work edit WI-2026-04-08-003 acceptance_criteria[0].status --set done
govctl clause edit RFC-0002:C-CRUD-VERBS text --stdin
```

这很重要，因为它给所有制品提供了同一个心智模型：

- 先选资源
- 再选制品 ID
- 再选路径
- 最后施加一个小的 edit verb

旧的 `set` / `add` / `remove` / `tick` 在合适的位置仍然保留，但现在它们都会走同一条 canonical planning path。这意味着更少的语义分叉，也更少“这个资源偏偏不一样”的意外。

## 深层路径不再是特例

`0.8.0` 还把 nested path resolution 推广到了任意受支持深度的对象和数组路径。

听起来像内部实现，但它会直接改变日常使用方式。它意味着 agent 可以直接定位自己真正要改的字段，而不用依赖一堆资源专属捷径：

```bash
govctl adr edit ADR-0038 alternatives[1].rejection_reason --set "Requires broad migration"
govctl work edit WI-2026-04-08-003 journal --add --stdin
govctl guard edit GUARD-GOVCTL-CHECK check.command --set "cargo run --quiet -- check"
```

相比堆更多专用 verb，这种契约更稳，因为即使制品结构变深，它的形状也不会变。

## 破坏性变更：遗留 JSON 写路径已移除

这也是为什么这一轮版本号升到了 `0.8.0`，而不是继续发 patch。

RFC 和 clause 仍然可以为了迁移而**读取**遗留 JSON，但 `govctl` 不再把它们写回 JSON。RFC/clause 的 mutation 和 lifecycle 命令现在都假定 TOML 是唯一 canonical 的可写格式。

如果仓库里还有只存在于 JSON 的 RFC 或 clause，请先迁移：

```bash
govctl migrate
govctl check
```

这一步是有意为之：它去掉了 CLI 同时维护多套写入契约的半遗留状态。

## 帮助文本现在更像真正的契约

这一轮里一个不那么显眼、但非常重要的改进是 help 质量。

我们一边简化了命令规划内部结构，一边更重要地强化了用户可见效果：`--help` 现在更接近一份小规格说明。资源根命令、`get`、`tick`、lifecycle verbs 以及其他高价值路径，现在都会更明确地说明：

- 什么时候该用这个命令
- 关键参数分别是什么意思
- 可用值有哪些
- 它和相邻命令有什么区别
- agent 可以直接照抄的示例

这很重要，因为 CLI 是人类工作流和 agent 工作流之间的稳定接口。help 文案如果模糊，agent 就会漂移；help 文案如果清楚，CLI 就会成为更强的自动化边界。

## `v0.8.1`：更顺手的 Codex 输出体验

`v0.8.1` 的规模更小，但方向是一致的：继续让 CLI 更容易被 agent 驱动工作流消费。

这一版加入了两点：

- `--format codex` 现在会写出带 `developer_instructions` 的 `.toml` agent 文件
- `--dir` 现在可以直接覆盖输出目录，不再要求先改配置

它们不是 canonical edit 那种级别的大功能，但会让生成出来的 agent 配置更可预测，也更容易接到真实仓库中。

## 为什么这一版值得注意

`0.8.x` 最重要的变化，不是“命令更多了”，而是几处原本模糊的边界被一起收紧了：

- 一套 canonical edit 形状
- 一套更强的 nested-path 模型
- RFC 和 clause 只保留一种可写格式
- 一套对 agent 更可信的 help 契约

这种“看起来很无聊”的收口，才是真正让 CLI 适合作为基础设施的工作。

## 升级路径

如果你的仓库已经全部是 TOML 制品：

```bash
cargo install govctl
govctl check
```

如果你的仓库里还保留 RFC/clause 的遗留 JSON 文件：

```bash
cargo install govctl
govctl migrate
govctl check
```

完整变更日志：[CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

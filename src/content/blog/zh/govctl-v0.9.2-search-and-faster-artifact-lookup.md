---
title: "govctl v0.9.2：搜索与更快的制品查找"
description: "govctl 0.9.2 增加跨治理制品的项目级搜索，并用本地 catalog 加速常见的单制品命令，同时保持 TOML 治理制品作为唯一权威来源。"
pubDate: 2026-06-05
tags: ["release", "govctl", "v0.9.2", "search", "performance"]
author: "govctl team"
---

`govctl v0.9.2` 关注一件很实际的事：更快找到正确的治理制品。

`0.9.0` 把执行状态边界整理清楚了：loop 成为本地状态，work item 依赖成为一等公民，旧 JSON 存储也从正常操作路径中移除。`0.9.2` 在这个基础上继续补上两个日常能力：

- 跨治理制品的项目级搜索
- 常见单制品命令的更快查找路径

这两项能力共享同一个设计约束：本地索引只是可丢弃的加速数据。TOML 治理制品仍然是 source of truth。

## 跨治理语料搜索

新命令很直接：

```bash
govctl search caching
govctl search "work item" --type work
govctl search RFC-0002 -o json
govctl search migration --tag cli -n 5
govctl search cache --reindex
```

默认情况下，`govctl search` 会搜索 RFC、clause、ADR、work item 和 verification guard。只想看某几类制品时，用可重复的 `--type`：

```bash
govctl search schema --type rfc --type adr
```

Tag 过滤采用严格语义。多个 `--tag` 表示结果必须同时包含所有给定 tag：

```bash
govctl search migration --tag cli --tag schema
```

这样 tag 可以用来把很宽的文本匹配收窄到一个具体领域。

## 给人和 Agent 的稳定输出

默认输出是适合交互使用的 table。自动化场景可以使用 JSON 或 plain：

```bash
govctl search RFC-0002 -o json
govctl search dependency --type work -o plain
```

这对 agent workflow 很重要。Agent 现在可以通过一个明确的 CLI contract 找到相关治理上下文，而不是猜文件名、扫 rendered Markdown，或者临时拼 shell pipeline。

查询词也被定义为用户搜索词，而不是底层搜索后端的 raw query syntax。

## 新鲜索引，而不是第二个权威来源

Search 使用 `.govctl/` 下的本地派生状态。这样能保持搜索速度，同时不会把 cache 文件放进 `gov/` 或 rendered docs。

在返回索引结果之前，`govctl search` 会先建立 freshness。修改过的制品会更新，删除过的制品会从索引移除，`--reindex` 可以强制完整重建：

```bash
govctl search cache --reindex
```

如果无法确认 freshness，`govctl` 不能静默返回过期索引结果。索引只是实现细节；受治理的 TOML 文件仍然是权威来源。

## 更快的直接查找

`0.9.2` 还改进了按单个 artifact ID 操作的命令。

过去很多单制品路径会加载整个集合，然后在内存里查找目标 ID。这个做法简单，但常见命令也要为 full-directory scan 付成本，即使文件布局或本地 metadata 已经足够定位目标。

现在 RFC、clause、ADR、work item 和 guard 会尽量使用直接路径解析或本地 artifact catalog。

这个 catalog 的使用方式刻意保守：

- 命令仍然会读取目标制品本身
- 制品内部记录的 ID 必须匹配请求 ID
- 过期 catalog entry 会被修复或绕过
- 本地 catalog 数据本身不会授权 mutation

这让大型仓库的日常路径更快，同时不削弱治理制品的完整性模型。

## 为什么这很重要

治理只有在相关上下文能被及时找到时才真正有用。

Search 让整个治理语料可以按主题、ID、tag 和制品类型发现。Catalog 让 ID-based workflow 更便宜。两者合在一起，会降低这些问题的摩擦：

- 这个决定是哪条 ADR 记录的？
- 哪些 work item 提到了这次 migration？
- 哪些 clause 定义了这个 CLI 行为？
- 哪个 guard 绑定了这条 verification path？

`v0.9.2` 是一个小版本，但会明显改变在 governed repository 中工作的体感：少一些手动翻找，少一些单点操作前的全量扫描，同时不牺牲制品权威性。

完整变更日志：[CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

---
title: "govctl v0.6.0：TOML 优先存储、验证守卫与风格化 TUI"
description: "govctl 迄今最大更新：所有制品统一为带 IDE 可发现 schema 头的 TOML 格式，验证守卫执行完成门禁，TUI 渲染风格化 Markdown。"
pubDate: 2026-03-17
tags: ["release", "govctl", "v0.6.0"]
author: "govctl team"
---

govctl v0.6.0 是自发布以来最大的版本更新。三个主题：**格式统一**、**强制执行**和**开发体验**。

## TOML 优先存储

所有治理制品现在统一使用 TOML 存储，采用一致的 `[govctl]` + `[content]` 布局，并带有 IDE 可发现的 `#:schema` 注释头：

```toml
#:schema ../../schema/rfc.schema.json

[govctl]
id = "RFC-0015"
title = "缓存策略"
version = "0.1.0"
status = "normative"
phase = "impl"
owners = ["@you"]

[content]
summary = "定义缓存架构。"
```

`#:schema` 头让 IDE（VS Code、IntelliJ、Zed）无需任何插件配置即可对每个治理文件提供即时验证和自动补全。打开 `gov/` 下的 `.toml` 文件即可直接使用。

### 从 JSON 迁移

遗留的基于 JSON 的 RFC 和子句会自动转换：

```bash
govctl migrate
```

这通过事务性管道运行：暂存所有更改、备份原始文件、原子提交，失败时回滚。`gov/config.toml` 中的 schema 版本跟踪已应用的迁移。v0.6.0 后，`govctl check` 会在 schema 版本过旧时发出警告。

## 验证守卫

守卫是本次最具影响力的新功能。它们是在工作项转为 `done` 时自动执行的可执行完成检查：

```toml
#:schema ../schema/guard.schema.json

[govctl]
id = "GUARD-CARGO-TEST"
title = "cargo test 通过"

[check]
command = "cargo test"
timeout_secs = 300
```

在 `gov/config.toml` 中配置必需的守卫：

```toml
[verification]
enabled = true
default_guards = ["GUARD-GOVCTL-CHECK", "GUARD-CARGO-TEST"]
```

当你执行 `govctl work move WI-... done` 时，每个守卫都会执行。如果任何守卫失败，状态转换将被拒绝。这填补了一个空白——之前 AI 代理可以通过勾选验收标准来将工作项标记为完成，而不实际运行测试。

守卫支持：

- 从项目根目录执行自定义 shell 命令
- 可配置超时（默认 300 秒）
- 对 stdout/stderr 的可选正则表达式模式匹配
- 按工作项覆盖和豁免

## 风格化终端输出

`show` 命令现在渲染**风格化 Markdown**，而不是输出原始 Markdown 源码：

```bash
govctl rfc show RFC-0015
govctl adr show ADR-0003
govctl work show WI-2026-03-17-001
```

底层渲染管道生成 Markdown，剥离 HTML 制品（签名注释、锚点标签、相对链接），转换复选框，并通过 `markdown-to-ansi` 渲染带语法高亮、粗体/斜体和正确标题格式的输出。当 stdout 不是 TTY（管道到文件或其他工具）时，回退到干净的纯文本。

## TUI 大幅改进

交互式 TUI（`govctl tui`）进行了全面刷新：

**统一语义主题。** `src/theme.rs` 中的单一 `SemanticColor` 枚举驱动所有三个渲染后端（CLI 的 owo-colors、列表的 comfy-table、TUI 的 ratatui）。已弃用的项目在所有界面中一致地以灰色淡化显示。

**详情视图的 Markdown 渲染。** ADR、工作项和子句详情视图现在通过与 CLI `show` 命令相同的风格化 Markdown 管道渲染，通过 `ansi-to-tui` 桥接。这将约 180 行手动 widget 构造代码替换为约 30 行管道代码。

**滚动和导航修复。** 滚动位置现在使用 Unicode 显示宽度来考虑自动换行。支持半页（`Ctrl+d`/`Ctrl+u`）和全页（`PgDn`/`PgUp`）滚动。过滤后的列表索引按帧缓存，而不是每帧重新计算 2-3 次。

**默认启用。** TUI 功能现在默认开启——`cargo install govctl` 即包含。

## Schema 版本检测

`govctl check` 现在会在项目的 schema 版本落后于当前 govctl 版本时发出警告：

```
warning[W0110]: Schema version 1 is outdated (latest: 2). Run `govctl migrate` to upgrade. (gov/config.toml)
```

使用 `govctl init` 创建的新项目自动使用最新 schema 版本。

## 破坏性变更

- `gov_root` 配置选项已移除。治理目录固定为 `gov/`。
- `govctl.schema` 字段已从所有制品类型中移除。格式演进通过 `gov/config.toml` 中的项目级 `[schema] version` 跟踪。
- RFC 和子句 TOML 文件现在使用 `[govctl]` + `[content]` 线格式。遗留的扁平格式在读取时仍然接受，但不会写入。

## 升级路径

```bash
cargo install govctl
govctl migrate
govctl check
```

迁移是安全的、事务性的且幂等的。运行它，通过 `govctl check` 验证，然后提交结果。

## 下一步

- RFC-0002（CLI 资源模型）推进至 stable
- `govctl describe` 上下文感知模式用于代理可发现性
- 发布管理改进

安装或升级：

```bash
cargo install govctl
```

完整变更日志：[CHANGELOG.md](https://github.com/govctl-org/govctl/blob/main/CHANGELOG.md)

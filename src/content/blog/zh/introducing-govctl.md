---
title: "govctl 简介：AI 编程的治理"
description: "AI 编程助手功能强大但缺乏规范。govctl 为 AI 辅助开发工作流带来结构化、可追溯性和阶段规范。"
pubDate: 2026-01-18
tags: ["公告", "govctl", "AI编程"]
author: "govctl 团队"
---

AI 编程助手从根本上改变了我们构建软件的方式。Claude、Cursor 和 GitHub Copilot 等工具可以生成完整的函数、重构代码库，甚至设计系统架构。但这种能力也带来了一个问题：**AI 编程缺乏规范**。

## 问题所在

当 AI 协助你开发时，可能会出现以下问题：

- **阶段跳跃** — 从想法直接跳到实现，没有规范说明
- **文档偏离** — 规范和代码悄然分离
- **无法执行的治理** — "最佳实践"变成可选建议

结果是：打字更快，思考更少，系统难以维护。

### 没有 govctl

```
第1天：  "让我们加个缓存！"
第2天：  AI 生成 500 行 Redis 集成代码
第7天：  "等等，我们商定的是 Redis 还是 Memcached？"
第14天： 一半团队实现一个，另一半实现另一个
第30天： 两个不兼容的缓存层，没有规范，没人知道为什么
```

### 使用 govctl

```
第1天：  govctl rfc new "缓存策略"
第2天：  RFC-0015 定义：Redis、TTL 策略、失效规则
第3天：  govctl rfc advance RFC-0015 impl
第7天：  实现完成，可追溯到规范
第10天： govctl rfc advance RFC-0015 test
第14天： 测试通过，govctl rfc advance RFC-0015 stable
```

## 什么是 govctl

govctl 是一个强制执行**阶段规范**的治理 CLI 工具：

1. **RFC 是唯一真相来源** — 没有规范就没有实现
2. **阶段被强制执行** — 每个阶段都有明确的门禁和不变量
3. **治理是可执行的** — 规则被检查，而不是建议
4. **工作可追溯** — 任务链接回授权它们的规范

govctl 管理三种工件类型：

- **RFC** — 实现之前必须存在的规范
- **ADR** — 带有明确后果的架构决策记录
- **工作项** — 与治理工件关联的跟踪任务

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  SPEC   │ ──► │   IMPL   │ ──► │   TEST   │ ──► │  STABLE  │
└─────────┘     └──────────┘     └──────────┘     └──────────┘
     │                │                │                │
     ▼                ▼                ▼                ▼
  RFC 必须          代码必须         测试必须         仅限
  是规范性的        符合规范         通过门禁         修复缺陷
```

## 如何工作

初始化项目并创建你的第一个 RFC：

```bash
# 安装（需要 Rust 1.85+）
cargo install govctl

# 初始化项目
govctl init

# 创建你的第一个 RFC
govctl rfc new "添加用户认证"
```

govctl 在 `gov/` 目录中创建治理工件：

```
gov/
├── config.toml       # 配置
├── rfc/              # RFC 源文件（JSON + 条款）
├── adr/              # 架构决策记录
├── work/             # 工作项
└── schema/           # JSON 模式
```

RFC 由**条款**组成 — 规范的原子单元：

```bash
# 向 RFC 添加条款
govctl clause new RFC-0001:C-SCOPE "范围" -s "规范" -k normative

# 编辑条款内容
govctl clause edit RFC-0001:C-SCOPE
```

在你工作时，govctl 跟踪你所处的阶段并验证转换：

```bash
# 使 RFC 具有约束力（准备实现）
govctl rfc finalize RFC-0001 normative

# 推进阶段
govctl rfc advance RFC-0001 impl    # 准备编码
govctl rfc advance RFC-0001 test    # 准备验证
govctl rfc advance RFC-0001 stable  # 生产就绪
```

## 为什么阶段规范很重要

阶段规范不是官僚主义 — 它是确定性。当你清楚知道变更处于哪个阶段时，你可以：

- **信任 AI** — 它只能在定义的 RFC 边界内操作
- **审计决策** — 每次转换都被记录
- **安全回滚** — 每个阶段都是检查点
- **协作** — 多个代理可以在不同阶段工作

## 快速开始

```bash
# 安装
cargo install govctl

# 或带 TUI 仪表板
cargo install govctl --features tui

# 初始化
govctl init

# 验证
govctl check
```

完整文档请参阅[用户指南](https://govctl-org.github.io/govctl/)。

---

我们构建 govctl 是因为我们相信 AI 编程应该既强大*又*可信。加入我们，为 AI 助手时代带来治理。

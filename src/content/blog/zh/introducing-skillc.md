---
title: "skillc 简介：Agent Skills 开发工具包"
description: "Agent Skills 定义了技能是什么。skillc 提供了如何：创建、验证、构建和追踪技能整个生命周期的工具。"
pubDate: 2026-01-30
tags: ["公告", "skillc", "agent-skills"]
author: "govctl 团队"
---

我们很高兴宣布 **skillc** v0.1.0 — [Agent Skills](https://agentskills.io/) 的开发工具包，这是一种用于扩展 AI 代理能力的开放格式。

## 什么是 skillc？

Agent Skills 定义了技能*是什么*：一个包含 `SKILL.md` 文件的文件夹，其中包含元数据和说明。skillc 提供了*如何*：创建、验证、构建和追踪技能整个生命周期的工具。

Agent Skills 规范止步之处，正是 skillc 开始之处。

## 安装

```bash
cargo install skillc
```

这将安装 `skc` 二进制文件。

## 两种工作流

skillc 服务于两类不同的用户群体：

### 技能作者

在发布前在本地创建、验证和测试技能：

```bash
skc init my-skill           # 创建新技能
# ... 编辑 SKILL.md ...
skc lint my-skill           # 验证质量
skc build my-skill          # 构建用于本地测试
skc stats my-skill          # 查看代理如何使用你的技能
git push origin main        # 发布到 GitHub
```

### 高级用户

编译任何技能以解锁全文搜索和使用分析：

```bash
npx skills add user/skill   # 安装技能
skc build user-skill        # 启用搜索 + 分析
skc search user-skill "api" # 全文搜索
skc stats user-skill        # 使用洞察
```

**注意**：构建对消费者是可选的。已发布的技能无需编译即可工作 — 构建只是启用搜索和分析功能。

## 主要功能

### 脚手架

从一开始就创建具有正确结构的新技能：

```bash
skc init my-skill           # 项目本地技能
skc init my-skill --global  # 全局技能
```

### 代码检查

17 条检查规则验证发布前的技能质量：

```
SKL1xx  前置元数据验证（名称、描述、格式）
SKL2xx  结构规则（大小、标题、层级）
SKL3xx  链接验证（文件存在、锚点、不逃逸）
SKL4xx  文件组织（孤立文件检测）
```

### 多目标部署编译

构建技能并部署到特定代理：

```bash
skc build my-skill                  # 部署到 Claude（默认）
skc build my-skill --target cursor  # 部署到 Cursor
skc build my-skill --target all     # 部署到所有配置的目标
```

### 全文搜索

基于 FTS5 索引的技能内容搜索：

```bash
skc search my-skill "borrow checker"
skc search my-skill "config" --limit 5
skc search my-skill "api" --format json
```

### 使用分析

追踪代理实际阅读了哪些部分：

```bash
skc stats my-skill                    # 摘要
skc stats my-skill --group-by sections # 最常访问的部分
skc stats my-skill --group-by files    # 最常访问的文件
skc stats my-skill --group-by search   # 最频繁的搜索词
```

### MCP 集成

所有读取命令都作为 MCP 工具暴露，用于直接代理集成：

```bash
skc mcp  # 启动 MCP 服务器
```

可用工具：`skc_outline`、`skc_show`、`skc_open`、`skc_sources`、`skc_search`、`skc_stats`、`skc_build`、`skc_init`、`skc_lint`。

## 命令参考

| 类别     | 命令          | 描述               |
| -------- | ------------- | ------------------ |
| **创作** | `skc init`    | 创建新技能或项目   |
|          | `skc lint`    | 验证结构和质量     |
|          | `skc build`   | 编译并本地部署     |
|          | `skc list`    | 列出所有管理的技能 |
| **读取** | `skc outline` | 列出所有部分       |
|          | `skc show`    | 显示部分内容       |
|          | `skc open`    | 读取文件内容       |
|          | `skc search`  | 全文搜索           |
|          | `skc sources` | 列出源文件         |
| **分析** | `skc stats`   | 使用分析           |
|          | `skc sync`    | 合并本地日志       |
| **代理** | `skc mcp`     | 启动 MCP 服务器    |

## 由 govctl 治理

skillc 开发遵循 govctl 的严格阶段规范。项目有 10 个规范性 RFC：

- **RFC-0000** — 愿景和兼容性保证
- **RFC-0001** — 技能编译
- **RFC-0002** — 网关命令（outline、show、open）
- **RFC-0003** — 使用分析
- **RFC-0004** — 搜索协议
- **RFC-0005** — 错误代码注册表
- **RFC-0006** — 脚手架（init）
- **RFC-0007** — CLI 参考
- **RFC-0008** — 技能创作标准（检查规则）
- **RFC-0009** — 配置

## 设计原则

1. **扩展，不重新发明** — Agent Skills 是一个开放标准。skillc 添加工具；它不分叉格式。

2. **可观察性解锁迭代** — 你无法改进你无法测量的东西。仪表化访问是基础。

3. **默认渐进披露** — 规范推荐它；skillc 强制执行它。存根暴露结构而不是内容。

4. **本地优先，零基础设施** — 在你的机器上运行。技能是文件。没有账户，没有网络，没有锁定。

---

skillc 是开源的，采用 MIT/Apache-2.0 许可。查看 [GitHub 仓库](https://github.com/govctl-org/skillc) 开始使用，访问 [agentskills.io](https://agentskills.io/) 了解完整的 Agent Skills 规范。

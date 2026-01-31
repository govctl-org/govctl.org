---
title: "理解阶段规范"
description: "深入探讨 spec → impl → test → stable 工作流，以及为什么它对确定性 AI 辅助开发至关重要。"
pubDate: 2026-01-20
tags: ["概念", "阶段规范", "工作流"]
author: "govctl 团队"
---

阶段规范是 govctl 背后的核心概念。这是一个简单的想法，但对我们如何与 AI 编程助手协作有着深远的影响。

## 两个生命周期

govctl 强制执行两个相互配合的生命周期：

### 状态生命周期（RFC 成熟度）

```
draft → normative → deprecated
```

- **draft（草案）**：讨论中。实现**必须不**依赖草案 RFC。
- **normative（规范）**：具有约束力。实现**必须**符合规范。
- **deprecated（废弃）**：已被取代。不允许新工作。

### 阶段生命周期（开发阶段）

```
spec → impl → test → stable
```

- **spec（规范）**：定义要构建什么。不允许实现工作。
- **impl（实现）**：构建规范定义的内容。
- **test（测试）**：验证实现符合规范。
- **stable（稳定）**：发布用于生产使用。

## 四个阶段

### 1. Spec（规范）

规范阶段定义**要做什么**而不定义**如何做**。这是你：

- 起草带有条款的 RFC
- 使用 RFC 2119 关键字定义规范性要求（MUST、SHOULD、MAY）
- 设置验收标准
- 获得审查和批准

```bash
# 创建 RFC
govctl rfc new "为 API 添加限流"

# 添加条款
govctl clause new RFC-0015:C-SCOPE "范围" -s "规范" -k normative
govctl clause new RFC-0015:C-LIMITS "限流规则" -s "规范" -k normative

# 编辑条款内容
govctl clause edit RFC-0015:C-LIMITS --stdin <<'EOF'
系统必须（MUST）限制每个 API 密钥每分钟 100 次请求。
系统必须（MUST）在超限时返回 429 状态。
系统应该（SHOULD）包含 retry-after 头。
EOF
```

规范阶段强迫你在编码之前思考。当与 AI 助手合作时，RFC 成为 AI 的操作约束。

### 2. Impl（实现）

一旦 RFC 是规范性的，你可以推进到实现：

```bash
# 使 RFC 具有约束力
govctl rfc finalize RFC-0015 normative

# 推进到实现阶段
govctl rfc advance RFC-0015 impl
```

在实现阶段：

- 代码按照规范编写
- 变更必须符合规范性条款
- AI 助手在 RFC 边界内操作

实现阶段可以迭代。但在实现满足规范之前，你不能离开实现阶段。

### 3. Test（测试）

测试阶段证明实现符合规范：

```bash
govctl rfc advance RFC-0015 test
```

- 编写验证每个规范性条款的测试
- 运行测试套件
- 记录发现的边缘情况

如果测试失败，你可能需要返回实现阶段修复问题。

### 4. Stable（稳定）

稳定阶段标志着变更完成：

```bash
govctl rfc advance RFC-0015 stable
```

在稳定阶段：

- 规范已满足
- 实现正确
- 仅限修复缺陷 — 不允许新功能
- RFC 成为项目历史的一部分

## 阶段转换规则

阶段之间的转换是明确的并经过验证：

```
From      To        要求
────────────────────────────────────────────
spec   →  impl      RFC 状态 = normative
impl   →  test      实现完成
test   →  stable    所有测试通过
```

你不能跳过阶段。`spec → stable` 是无效的。这确保每个变更都经过适当的验证。

## 状态 × 阶段兼容性

```
              spec    impl    test    stable
─────────────────────────────────────────────
draft          OK      WARN    WARN    NO
normative      OK      OK      OK      OK
deprecated     OK      NO      NO      OK
```

- **WARN** = 实验性，门禁是软警告
- **NO** = 禁止

## 为什么阶段对 AI 编程很重要

AI 助手功能强大但上下文有限。它们本质上不知道：

- 它们被允许改变什么
- 它们处于哪个工作阶段
- 必须保留哪些契约

阶段规范提供了这个上下文。当你告诉 AI "我们处于 RFC-0015 的 impl 阶段"时，它知道：

- RFC 定义了边界
- 它应该生成实现代码
- 它必须符合规范性条款

这将 AI 从混乱的代码生成器转变为有规范的协作者。

## 实践示例

让我们追踪一个真实变更经过所有阶段：

```bash
# 初始化 govctl
govctl init

# 规范阶段：创建和定义 RFC
govctl rfc new "添加深色模式支持"
govctl clause new RFC-0001:C-SCOPE "范围" -s "规范" -k normative
govctl clause new RFC-0001:C-TOGGLE "切换" -s "规范" -k normative
govctl clause edit RFC-0001:C-TOGGLE

# 使其规范性（有约束力）
govctl rfc finalize RFC-0001 normative

# 实现阶段：构建
govctl rfc advance RFC-0001 impl
# 与 AI 合作生成 CSS 变量、主题切换等

# 测试阶段：验证
govctl rfc advance RFC-0001 test
# 编写主题切换、持久化、可访问性测试

# 稳定阶段：发布
govctl rfc advance RFC-0001 stable
# 变更现在是项目历史的一部分

# 验证一切
govctl check
```

每个阶段创建一个检查点。如果生产中出现问题，你可以追溯阶段来理解发生了什么。

## 结论

阶段规范不是为了放慢速度 — 而是为了有信心地快速前进。当每个变更都是结构化的、经过验证的、可审计的，你就可以信任你的 AI 助手来帮助你，而不必担心混乱。

`spec → impl → test → stable` 工作流足够简单以便记忆，足够强大以治理复杂的变更，足够灵活以适应任何项目。

---

准备好将阶段规范添加到你的工作流了吗？查看 [govctl 文档](https://govctl-org.github.io/govctl/) 开始使用。

export const languages = {
  en: "English",
  zh: "中文",
} as const;

export const defaultLang = "en" as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.docs": "Docs",
    "nav.github": "GitHub",

    // Home Hero
    "home.badge": "govctl & skillc now live",
    "home.title": "Determinism for",
    "home.titleHighlight": "AI Coding",
    "home.tagline": "Governance over chaos.",
    "home.subtitle":
      "Open-source tools that bring structure, traceability, and phase discipline to AI-assisted development.",
    "home.subtitleMuted":
      "Because faster typing shouldn't mean slower thinking.",
    "home.cta.exploreProducts": "Explore Products",
    "home.cta.viewOnGithub": "View on GitHub",

    // Chaos vs Order Hero
    "home.chaos.title": "Without Governance",
    "home.chaos.subtitle": "Undisciplined AI coding",
    "home.chaos.line1": "random outputs",
    "home.chaos.line2": "unpredictable results",
    "home.chaos.line3": "specification drift",
    "home.chaos.line4": "untraceable changes",
    "home.order.title": "With Determinism",
    "home.order.subtitle": "Governed AI development",
    "home.order.line1": "predictable outcomes",
    "home.order.line2": "enforced phases",
    "home.order.line3": "spec-to-code traceability",
    "home.order.line4": "auditable workflows",

    // Hero header variants
    "home.chaos.badge": "Undisciplined",
    "home.chaos.tagline": "No spec. No trace. No control.",
    "home.chaos.noPath": "No clear path",
    "home.order.badge": "govctl & skillc now live",

    // Hero slider
    "home.slider.chaos": "Chaos",
    "home.slider.order": "Order",
    "home.slider.hint": "Drag to reveal order",

    // State Machine
    "phase.gate": "Gate",
    "phase.locked": "locked",
    "phase.noShortcuts": "No shortcuts. No going back.",

    // Problem section
    "problem.label": "The Problem",
    "problem.title": "AI coding is powerful.",
    "problem.titleMuted": "But undisciplined.",
    "problem.subtitle":
      "Fast typing, slow thinking. Without governance, AI amplifies chaos.",
    "problem.without": "Without govctl",
    "problem.with": "With govctl",
    "problem.chaosTimeline": "Chaos timeline",
    "problem.orderTimeline": "Deterministic timeline",
    "problem.resultChaos": "Result: Technical debt, confusion",
    "problem.resultOrder": "Result: Traceable, governed, stable",

    // Terminal showcase
    "terminal.label": "In Action",
    "terminal.title": "See it work",

    // Comparison content
    "comparison.without.1": 'Day 1:  "Let\'s add caching!"',
    "comparison.without.2":
      "Day 2:  AI generates 500 lines of Redis integration",
    "comparison.without.3":
      'Day 7:  "Wait, did we agree on Redis or Memcached?"',
    "comparison.without.4":
      "Day 14: Half the team implements one, half the other",
    "comparison.without.5":
      "Day 30: Two incompatible caching layers, no spec, nobody knows why",
    "comparison.with.1": 'Day 1:  govctl rfc new "Caching Strategy"',
    "comparison.with.2":
      "Day 2:  RFC-0015 defines: Redis, TTL policy, invalidation rules",
    "comparison.with.3": "Day 3:  govctl rfc advance RFC-0015 impl",
    "comparison.with.4": "Day 7:  Implementation complete, traceable to spec",
    "comparison.with.5": "Day 14: govctl rfc advance RFC-0015 stable",

    // Phase Discipline section
    "phase.label": "Core Concept",
    "phase.title": "Phase Discipline",
    "phase.subtitle":
      "No implementation without specification. Phases are enforced, not suggested.",
    "phase.spec": "RFC must be normative",
    "phase.impl": "Code must match spec",
    "phase.test": "Tests must pass gates",
    "phase.stable": "Bug fixes only",

    // Features
    "feature.rfc.title": "RFC is Law",
    "feature.rfc.desc":
      "Specifications are the source of truth. Code that conflicts is a bug.",
    "feature.gates.title": "Gates are Real",
    "feature.gates.desc":
      "Each phase has explicit requirements. No shortcuts, no exceptions.",
    "feature.traceable.title": "Work is Traceable",
    "feature.traceable.desc":
      "Every task links back to the spec that authorized it. Full audit trail.",

    // Products section
    "products.label": "Ecosystem",
    "products.title": "The Suite",
    "products.subtitle": "A complete toolkit for governed AI development.",
    "product.govctl.role": "Enforce",
    "product.govctl.desc":
      "Opinionated governance CLI for RFC-driven AI-assisted software development. Enforce phase discipline on every feature.",
    "product.skillc.role": "Define",
    "product.skillc.desc":
      "Development kit for Agent Skills. Author, validate, optimize, and instrument skills for AI agents.",
    "product.jjgov.role": "Coordinate",
    "product.jjgov.desc":
      "Multi-agent collaboration workflows built on jujutsu. Coordinate multiple AI agents with version control.",
    "product.everevolve.role": "Learn",
    "product.everevolve.desc":
      "Project rules generated from commit history. Learn governance patterns from how your team actually works.",

    // Quick Start section
    "quickstart.label": "Installation",
    "quickstart.title": "Quick Start",
    "quickstart.readDocs": "Read the full documentation",

    // Product status
    "status.live": "Live",
    "status.soon": "Coming Soon",

    // Blog
    "blog.title": "Insights & Updates",
    "blog.subtitle":
      "Thoughts on AI-assisted development, phase discipline, and building deterministic workflows for the age of AI coding.",
    "blog.readArticle": "Read article",
    "blog.backToBlog": "Back to Blog",
    "blog.minRead": "min read",
    "blog.previous": "Previous",
    "blog.next": "Next",
    "blog.noPosts": "No posts yet",
    "blog.checkBack": "Check back soon for updates.",

    // Footer
    "footer.products": "Products",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.copyright": "© 2026 govctl-org. All rights reserved.",
    "footer.tagline": "Bringing determinism to AI coding.",

    // Common
    "common.learnMore": "Learn more",
    "common.documentation": "Documentation",
    "common.install": "Install",

    // govctl product page
    "govctl.hero.desc":
      "Opinionated governance CLI for RFC-driven AI-assisted software development.",
    "govctl.hero.descMuted": "Enforce phase discipline on every feature.",
    "govctl.phase.label": "Core Concept",
    "govctl.phase.title": "Phase Discipline",
    "govctl.phase.subtitle":
      "Every feature progresses through enforced phases. No shortcuts.",
    "govctl.features.label": "Capabilities",
    "govctl.features.title": "What govctl Does",
    "govctl.feature.rfc": "RFC Management",
    "govctl.feature.rfc.desc":
      "Create, track, and enforce Request for Comments documents as the source of truth for all features.",
    "govctl.feature.adr": "ADR Tracking",
    "govctl.feature.adr.desc":
      "Architectural Decision Records with explicit consequences and traceability.",
    "govctl.feature.work": "Work Items",
    "govctl.feature.work.desc":
      "Tasks linked back to governance artifacts. Every change is authorized by a spec.",
    "govctl.feature.gates": "Phase Gates",
    "govctl.feature.gates.desc":
      "Enforce spec → impl → test → stable progression. No shortcuts.",
    "govctl.feature.validation": "Validation",
    "govctl.feature.validation.desc":
      "Continuous checks ensure code matches specifications. Drift is detected instantly.",
    "govctl.feature.ai": "AI Integration",
    "govctl.feature.ai.desc":
      "Works with any shell-capable AI agent. Claude, Cursor, Codex—all supported.",
    "govctl.cli.label": "Reference",
    "govctl.cli.title": "CLI Commands",
    "govctl.cli.validation": "Validation",
    "govctl.cli.listing": "Listing",
    "govctl.cli.creating": "Creating Artifacts",
    "govctl.cli.lifecycle": "Lifecycle",
    "govctl.fit.label": "Fit",
    "govctl.fit.title": "Who This Is For",
    "govctl.fit.good": "Good Fit",
    "govctl.fit.notFor": "Not For",
    "govctl.fit.good.1":
      'Teams frustrated by AI "code now, think later" patterns',
    "govctl.fit.good.2":
      "Projects where specifications drift from implementations",
    "govctl.fit.good.3":
      "Organizations needing audit trails for AI-generated code",
    "govctl.fit.good.4": "Developers who believe discipline enables velocity",
    "govctl.fit.bad.1": '"Move fast and break things" workflows',
    "govctl.fit.bad.2": "Projects without review processes",

    // skillc product page
    "skillc.hero.desc": "The development kit for",
    "skillc.hero.descLink": "Agent Skills",
    "skillc.hero.descAfter":
      "— create, validate, and optimize skills that extend AI agent capabilities.",
    "skillc.hero.descMuted":
      "Agent Skills define what a skill is. skillc provides the how: tooling to author, lint, build, and trace skills throughout their lifecycle.",
    "skillc.workflows.label": "Who is this for?",
    "skillc.workflows.title": "Two Workflows",
    "skillc.workflows.authors": "Skill Authors",
    "skillc.workflows.authors.desc":
      "Create, validate, and test skills locally before publishing with confidence.",
    "skillc.workflows.power": "Power Users",
    "skillc.workflows.power.desc":
      "Compile any skill to unlock full-text search and usage analytics.",
    "skillc.workflows.power.note":
      "Note: Building is optional for consumers. Published skills work without compilation.",
    "skillc.features.label": "Capabilities",
    "skillc.features.title": "What skillc Does",
    "skillc.feature.scaffold": "Scaffolding",
    "skillc.feature.scaffold.desc":
      "Create new skills with skc init. Project-local or global, properly structured from the start.",
    "skillc.feature.lint": "Linting",
    "skillc.feature.lint.desc":
      "17 lint rules (SKL1xx-SKL4xx) validate frontmatter, structure, links, and file organization.",
    "skillc.feature.compile": "Compilation",
    "skillc.feature.compile.desc":
      "Build skills to runtime format with search index. Deploy to Claude, Cursor, or custom targets.",
    "skillc.feature.search": "Full-Text Search",
    "skillc.feature.search.desc":
      "FTS5-indexed search over skill content. Find anything instantly with skc search.",
    "skillc.feature.analytics": "Usage Analytics",
    "skillc.feature.analytics.desc":
      "Track which sections agents actually read. Group by sections, files, commands, or search terms.",
    "skillc.feature.mcp": "MCP Integration",
    "skillc.feature.mcp.desc":
      "All read commands exposed as MCP tools. Direct agent integration via skc mcp server.",
    "skillc.cli.authoring": "Authoring",
    "skillc.cli.reading": "Reading",
    "skillc.cli.analytics": "Analytics",
    "skillc.cli.mcp": "MCP Server",
    "skillc.lint.label": "Quality",
    "skillc.lint.title": "Lint Rules",
    "skillc.lint.subtitle":
      "17 rules across 4 categories ensure skill quality before publishing.",
    "skillc.storage.label": "Storage",
    "skillc.storage.title": "Where Skills Live",
    "skillc.storage.projectLocal": "Project-local skills",
    "skillc.storage.globalSource": "Global source store",
    "skillc.storage.claudeRuntime": "Claude runtime (deployed)",
    "skillc.storage.cursorRuntime": "Cursor runtime (deployed)",
    "skillc.step.scaffold": "scaffold",
    "skillc.step.validate": "validate",
    "skillc.step.testLocally": "test locally",
    "skillc.step.traceUsage": "trace usage",
    "skillc.step.publish": "publish",
    "skillc.step.enableIndexing": "enable indexing",
    "skillc.step.findContent": "find content",
    "skillc.step.trackUsage": "track usage",
    "skillc.lint.frontmatter": "Frontmatter",
    "skillc.lint.structure": "Structure",
    "skillc.lint.links": "Links",
    "skillc.lint.files": "Files",
    "skillc.lint.frontmatter.desc": "name, description, format",
    "skillc.lint.structure.desc": "size, headings, hierarchy",
    "skillc.lint.links.desc": "file exists, anchors, escapes",
    "skillc.lint.files.desc": "orphan detection",

    // jjgov product page
    "jjgov.hero.desc":
      "Multi-agent collaboration workflows built on jujutsu. Coordinate multiple AI agents with version control.",
    "jjgov.capabilities.title": "Planned Capabilities",
    "jjgov.cap.1":
      "Built on jujutsu (jj) version control for superior branching",
    "jjgov.cap.2": "Coordinate multiple AI agents working on the same codebase",
    "jjgov.cap.3": "Conflict-free parallel development workflows",
    "jjgov.cap.4": "Automatic merge strategies for agent-generated code",
    "jjgov.cap.5": "Governed collaboration with audit trails",
    "jjgov.cta": "Watch for updates on GitHub",

    // everevolve product page
    "everevolve.hero.desc":
      "Project rules generated from commit history. Learn governance patterns from how your team actually works.",
    "everevolve.capabilities.title": "Planned Capabilities",
    "everevolve.cap.1": "Analyze commit history to extract governance patterns",
    "everevolve.cap.2":
      "Generate project rules that match your team's actual behavior",
    "everevolve.cap.3":
      "Learn from how decisions were made, not just what was decided",
    "everevolve.cap.4": "Continuous evolution as your project matures",
    "everevolve.cap.5": "Bootstrap governance without starting from scratch",
    "everevolve.cta": "Watch for updates on GitHub",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.blog": "博客",
    "nav.docs": "文档",
    "nav.github": "GitHub",

    // Home Hero
    "home.badge": "govctl 与 skillc 现已发布",
    "home.title": "AI 编程的",
    "home.titleHighlight": "确定性",
    "home.tagline": "治理胜于混沌。",
    "home.subtitle": "为 AI 辅助开发带来结构化、可追溯性和阶段规范的开源工具。",
    "home.subtitleMuted": "因为更快的打字不应该意味着更慢的思考。",
    "home.cta.exploreProducts": "探索产品",
    "home.cta.viewOnGithub": "在 GitHub 上查看",

    // Chaos vs Order Hero
    "home.chaos.title": "缺乏治理",
    "home.chaos.subtitle": "无序的 AI 编程",
    "home.chaos.line1": "随机输出",
    "home.chaos.line2": "不可预测的结果",
    "home.chaos.line3": "规范漂移",
    "home.chaos.line4": "无法追踪的变更",
    "home.order.title": "拥有确定性",
    "home.order.subtitle": "治理型 AI 开发",
    "home.order.line1": "可预测的结果",
    "home.order.line2": "强制执行的阶段",
    "home.order.line3": "规范到代码的可追溯性",
    "home.order.line4": "可审计的工作流",

    // Hero header variants
    "home.chaos.badge": "无纪律",
    "home.chaos.tagline": "无规范。无追溯。无控制。",
    "home.chaos.noPath": "没有清晰的路径",
    "home.order.badge": "govctl & skillc 已上线",

    // Hero slider
    "home.slider.chaos": "混沌",
    "home.slider.order": "秩序",
    "home.slider.hint": "拖动查看秩序",

    // State Machine
    "phase.gate": "门禁",
    "phase.locked": "已锁定",
    "phase.noShortcuts": "不可跳过，不可回退。",

    // Problem section
    "problem.label": "问题",
    "problem.title": "AI 编程很强大。",
    "problem.titleMuted": "但缺乏规范。",
    "problem.subtitle": "打字更快，思考更少。没有治理，AI 会放大混乱。",
    "problem.without": "没有 govctl",
    "problem.with": "使用 govctl",
    "problem.chaosTimeline": "混沌时间线",
    "problem.orderTimeline": "确定性时间线",
    "problem.resultChaos": "结果：技术债务、混乱",
    "problem.resultOrder": "结果：可追溯、受治理、稳定",

    // Terminal showcase
    "terminal.label": "实际效果",
    "terminal.title": "看看它如何运作",

    // Comparison content
    "comparison.without.1": '第1天：  "让我们加个缓存！"',
    "comparison.without.2": "第2天：  AI 生成 500 行 Redis 集成代码",
    "comparison.without.3":
      '第7天：  "等等，我们商定的是 Redis 还是 Memcached？"',
    "comparison.without.4": "第14天： 一半团队实现一个，另一半实现另一个",
    "comparison.without.5": "第30天： 两个不兼容的缓存层，没有规范",
    "comparison.with.1": '第1天：  govctl rfc new "缓存策略"',
    "comparison.with.2": "第2天：  RFC-0015 定义：Redis、TTL 策略、失效规则",
    "comparison.with.3": "第3天：  govctl rfc advance RFC-0015 impl",
    "comparison.with.4": "第7天：  实现完成，可追溯到规范",
    "comparison.with.5": "第14天： govctl rfc advance RFC-0015 stable",

    // Phase Discipline section
    "phase.label": "核心概念",
    "phase.title": "阶段规范",
    "phase.subtitle": "没有规范就没有实现。阶段是强制的，而不是建议的。",
    "phase.spec": "RFC 必须是规范性的",
    "phase.impl": "代码必须符合规范",
    "phase.test": "测试必须通过门禁",
    "phase.stable": "仅限修复缺陷",

    // Features
    "feature.rfc.title": "RFC 即法律",
    "feature.rfc.desc": "规范是唯一真相来源。与规范冲突的代码是缺陷。",
    "feature.gates.title": "门禁是真实的",
    "feature.gates.desc": "每个阶段都有明确的要求。不可跳过，不可例外。",
    "feature.traceable.title": "工作可追溯",
    "feature.traceable.desc": "每个任务都链接回授权它的规范。完整的审计轨迹。",

    // Products section
    "products.label": "生态系统",
    "products.title": "产品套件",
    "products.subtitle": "面向治理型 AI 开发的完整工具包。",
    "product.govctl.role": "强制执行",
    "product.govctl.desc":
      "用于 RFC 驱动的 AI 辅助软件开发的治理 CLI。为每个功能强制执行阶段规范。",
    "product.skillc.role": "定义",
    "product.skillc.desc":
      "Agent Skills 开发工具包。创作、验证、优化和追踪 AI 代理技能。",
    "product.jjgov.role": "协调",
    "product.jjgov.desc":
      "基于 jujutsu 的多代理协作工作流。使用版本控制协调多个 AI 代理。",
    "product.everevolve.role": "学习",
    "product.everevolve.desc":
      "从提交历史生成项目规则。从团队实际工作方式中学习治理模式。",

    // Quick Start section
    "quickstart.label": "安装",
    "quickstart.title": "快速开始",
    "quickstart.readDocs": "阅读完整文档",

    // Product status
    "status.live": "已发布",
    "status.soon": "即将推出",

    // Blog
    "blog.title": "洞察与更新",
    "blog.subtitle": "关于 AI 辅助开发、阶段规范以及构建确定性工作流的思考。",
    "blog.readArticle": "阅读文章",
    "blog.backToBlog": "返回博客",
    "blog.minRead": "分钟阅读",
    "blog.previous": "上一篇",
    "blog.next": "下一篇",
    "blog.noPosts": "暂无文章",
    "blog.checkBack": "请稍后查看更新。",

    // Footer
    "footer.products": "产品",
    "footer.resources": "资源",
    "footer.legal": "法律",
    "footer.privacy": "隐私政策",
    "footer.terms": "使用条款",
    "footer.copyright": "© 2026 govctl-org。保留所有权利。",
    "footer.tagline": "为 AI 编程带来确定性。",

    // Common
    "common.learnMore": "了解更多",
    "common.documentation": "文档",
    "common.install": "安装",

    // govctl product page
    "govctl.hero.desc": "用于 RFC 驱动的 AI 辅助软件开发的治理 CLI。",
    "govctl.hero.descMuted": "为每个功能强制执行阶段规范。",
    "govctl.phase.label": "核心概念",
    "govctl.phase.title": "阶段规范",
    "govctl.phase.subtitle": "每个功能都必须经过强制阶段推进，不可跳过。",
    "govctl.features.label": "能力",
    "govctl.features.title": "govctl 做什么",
    "govctl.feature.rfc": "RFC 管理",
    "govctl.feature.rfc.desc":
      "创建、跟踪和强制执行 RFC 文档，作为所有功能的唯一真相来源。",
    "govctl.feature.adr": "ADR 追踪",
    "govctl.feature.adr.desc": "架构决策记录，具有明确的后果和可追溯性。",
    "govctl.feature.work": "工作项",
    "govctl.feature.work.desc": "任务链接回治理工件。每个变更都由规范授权。",
    "govctl.feature.gates": "阶段门禁",
    "govctl.feature.gates.desc":
      "强制执行 spec → impl → test → stable 进程。不可跳过。",
    "govctl.feature.validation": "验证",
    "govctl.feature.validation.desc":
      "持续检查确保代码符合规范。偏差会被立即检测。",
    "govctl.feature.ai": "AI 集成",
    "govctl.feature.ai.desc":
      "与任何支持 shell 的 AI 代理兼容。Claude、Cursor、Codex——全部支持。",
    "govctl.cli.label": "参考",
    "govctl.cli.title": "CLI 命令",
    "govctl.cli.validation": "验证",
    "govctl.cli.listing": "列表",
    "govctl.cli.creating": "创建工件",
    "govctl.cli.lifecycle": "生命周期",
    "govctl.fit.label": "适用",
    "govctl.fit.title": "适用于谁",
    "govctl.fit.good": "适合",
    "govctl.fit.notFor": "不适合",
    "govctl.fit.good.1": '对 AI "先写代码，后思考" 模式感到沮丧的团队',
    "govctl.fit.good.2": "规范与实现经常偏离的项目",
    "govctl.fit.good.3": "需要 AI 生成代码审计轨迹的组织",
    "govctl.fit.good.4": "相信规范能够加速开发的开发者",
    "govctl.fit.bad.1": '"快速行动，打破常规" 的工作流',
    "govctl.fit.bad.2": "没有审查流程的项目",

    // skillc product page
    "skillc.hero.desc": "用于",
    "skillc.hero.descLink": "Agent Skills",
    "skillc.hero.descAfter":
      "的开发工具包——创建、验证和优化扩展 AI 代理能力的技能。",
    "skillc.hero.descMuted":
      "Agent Skills 定义了技能是什么。skillc 提供了如何：在整个生命周期中创作、验证、构建和追踪技能的工具。",
    "skillc.workflows.label": "这是为谁准备的？",
    "skillc.workflows.title": "两种工作流",
    "skillc.workflows.authors": "技能作者",
    "skillc.workflows.authors.desc": "在发布前在本地创建、验证和测试技能。",
    "skillc.workflows.power": "高级用户",
    "skillc.workflows.power.desc": "编译任何技能以解锁全文搜索和使用分析。",
    "skillc.workflows.power.note":
      "注意：构建对消费者是可选的。已发布的技能无需编译即可工作。",
    "skillc.features.label": "能力",
    "skillc.features.title": "skillc 做什么",
    "skillc.feature.scaffold": "脚手架",
    "skillc.feature.scaffold.desc":
      "使用 skc init 创建新技能。项目本地或全局，从一开始就结构正确。",
    "skillc.feature.lint": "代码检查",
    "skillc.feature.lint.desc":
      "17 条检查规则（SKL1xx-SKL4xx）验证前置元数据、结构、链接和文件组织。",
    "skillc.feature.compile": "编译",
    "skillc.feature.compile.desc":
      "构建技能到运行时格式并建立搜索索引。部署到 Claude、Cursor 或自定义目标。",
    "skillc.feature.search": "全文搜索",
    "skillc.feature.search.desc":
      "基于 FTS5 索引的技能内容搜索。使用 skc search 即时查找任何内容。",
    "skillc.feature.analytics": "使用分析",
    "skillc.feature.analytics.desc":
      "追踪代理实际阅读了哪些部分。按部分、文件、命令或搜索词分组。",
    "skillc.feature.mcp": "MCP 集成",
    "skillc.feature.mcp.desc":
      "所有读取命令都作为 MCP 工具暴露。通过 skc mcp 服务器直接集成代理。",
    "skillc.cli.authoring": "创作",
    "skillc.cli.reading": "读取",
    "skillc.cli.analytics": "分析",
    "skillc.cli.mcp": "MCP 服务器",
    "skillc.lint.label": "质量",
    "skillc.lint.title": "检查规则",
    "skillc.lint.subtitle": "4 个类别的 17 条规则确保发布前的技能质量。",
    "skillc.storage.label": "存储",
    "skillc.storage.title": "技能存储位置",
    "skillc.storage.projectLocal": "项目本地技能",
    "skillc.storage.globalSource": "全局源存储",
    "skillc.storage.claudeRuntime": "Claude 运行时（已部署）",
    "skillc.storage.cursorRuntime": "Cursor 运行时（已部署）",
    "skillc.step.scaffold": "脚手架",
    "skillc.step.validate": "验证",
    "skillc.step.testLocally": "本地测试",
    "skillc.step.traceUsage": "追踪使用",
    "skillc.step.publish": "发布",
    "skillc.step.enableIndexing": "启用索引",
    "skillc.step.findContent": "查找内容",
    "skillc.step.trackUsage": "追踪使用",
    "skillc.lint.frontmatter": "前置元数据",
    "skillc.lint.structure": "结构",
    "skillc.lint.links": "链接",
    "skillc.lint.files": "文件",
    "skillc.lint.frontmatter.desc": "名称、描述、格式",
    "skillc.lint.structure.desc": "大小、标题、层级",
    "skillc.lint.links.desc": "文件存在、锚点、转义",
    "skillc.lint.files.desc": "孤立文件检测",

    // jjgov product page
    "jjgov.hero.desc":
      "基于 jujutsu 的多代理协作工作流。使用版本控制协调多个 AI 代理。",
    "jjgov.capabilities.title": "计划中的能力",
    "jjgov.cap.1": "基于 jujutsu (jj) 版本控制，提供更优越的分支管理",
    "jjgov.cap.2": "协调多个在同一代码库上工作的 AI 代理",
    "jjgov.cap.3": "无冲突的并行开发工作流",
    "jjgov.cap.4": "代理生成代码的自动合并策略",
    "jjgov.cap.5": "带有审计轨迹的治理型协作",
    "jjgov.cta": "在 GitHub 上关注更新",

    // everevolve product page
    "everevolve.hero.desc":
      "从提交历史生成项目规则。从团队实际工作方式中学习治理模式。",
    "everevolve.capabilities.title": "计划中的能力",
    "everevolve.cap.1": "分析提交历史以提取治理模式",
    "everevolve.cap.2": "生成符合团队实际行为的项目规则",
    "everevolve.cap.3": "学习决策是如何做出的，而不仅仅是做出了什么决策",
    "everevolve.cap.4": "随着项目成熟持续演进",
    "everevolve.cap.5": "无需从零开始即可启动治理",
    "everevolve.cta": "在 GitHub 上关注更新",
  },
} as const;

export type TranslationKey = keyof typeof ui.en;

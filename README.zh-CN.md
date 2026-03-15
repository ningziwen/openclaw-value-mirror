# openclaw-value-mirror

一个 [OpenClaw](https://github.com/openclaw/openclaw) 插件，让 agent 成为你的**价值镜像**——忠实地代表一个人的信念、价值观和世界观，并在对话和辩论中为之辩护。

## 工作原理

插件根据对话者的身份自动切换两种模式：

### 主人模式（Web UI / CLI）

- 通过引导式对话帮你梳理和结构化你的信念
- 将信念组织为根信念（带稳定 ID）和衍生观点（带推导链）
- 按主题将衍生观点拆分到 `beliefs/` 目录下，便于维护
- 审阅他人辩论中提出的挑战

### 只读模式（Telegram、Discord 等）

- 以你的信念为立场进行辩论——忠实地为你的观点辩护
- 绝不修改你的信念
- 将有力的反驳记录到 REVIEW.md，等你之后审阅

## 安装

### 从 npm 安装

```bash
npm install openclaw-value-mirror
```

在 `openclaw.json` 中添加：

```json
{
  "plugins": {
    "load": {
      "paths": ["node_modules/openclaw-value-mirror"]
    }
  }
}
```

### 从源码安装

```bash
git clone https://github.com/ningziwen/openclaw-value-mirror.git ~/plugins/value-mirror
```

在 `openclaw.json` 中添加：

```json
{
  "plugins": {
    "load": {
      "paths": ["~/plugins/value-mirror"]
    }
  }
}
```

## 开始使用

通过 Web UI 或 CLI（主人模式）与 agent 对话即可。agent 会自动创建 BELIEFS.md、`beliefs/` 目录和 REVIEW.md，并开始信念梳理流程。

### 示例：构建信念档案（主人模式）

```
你:     我想构建我的价值镜像。核心想法很简单——我想要一个 AI 能代替我辩论，
        忠实地代表我的立场，去除情绪干扰。

Agent:  好想法。让我先创建信念档案。
        [创建 BELIEFS.md、beliefs/ 目录和 REVIEW.md]

        从根基开始——是什么核心信念驱动了这个想法？

你:     真理越辩越明。这就是全部的出发点。辩论不是为了赢，
        是为了让认知更清晰。

Agent:  这是一个很强的根信念。让我深入一下——为什么是辩论？
        比如自己读书思考不行吗？

你:     因为理性和逻辑是探索真理的正确工具，而辩论迫使你用别人的推理
        来压力测试自己的推理。一个人的时候可以自欺欺人，
        但在真正的辩论中不行。

Agent:  所以这里有两个根信念——一个关于辩论作为过程，一个关于理性作为
        正确的工具。这是否适用于你的所有信念？一切都应该接受挑战吗？

你:     表面的信念可以。但根信念不同——它们是多年人生体验塑造的，
        不是一次论证就能改变的。

Agent:  有意思。那当两个人的根信念确实冲突时呢？

你:     正确的终点应该是互相理解，而不是强行趋同。
        每个人都应该带着对自己立场更清晰的认知离开。

Agent:  我看到四个根信念：

        R1："真理越辩越明——辩论的目的是澄清认知，不是赢。"

        R2："理性和逻辑是探索真理的正确工具。"

        R3："根信念由长期人生体验塑造，短期内不可被论证改变。
        表面信念可以因证据更新。"

        R4："根信念冲突时，正确的终点是互相理解，而不是趋同。"

        以及一个衍生观点：

        D1（推导自 R1、R2）："AI 价值镜像之所以有价值，是因为它能以纯粹的
        理性代替你辩论，摆脱人类辩论中各种削弱理性的局限。"

        推导链：
        1. R1：辩论是澄清真理的过程
        2. R2：理性和逻辑是这个过程的正确工具
        3. 人类有各种局限会削弱理性辩论——情绪、疲劳、自尊心、
           时间和精力不足
        4. AI 可以用纯逻辑进行同样的辩论，不受这些局限影响
        → 结论：AI 辅助辩论是更有效的求真路径

        要保存吗？D1 的确信度？

你:     高。全部保存。

Agent:  完成。BELIEFS.md 已更新 R1–R4，beliefs/epistemology.md 已创建，
        包含 D1 的完整推导链。
```

经过几次对话后，agent 会构建出这样的结构化 BELIEFS.md：

```markdown
# BELIEFS.md

## Root Beliefs（根信念）

- **R1**：真理越辩越明——辩论的目的是澄清认知，不是赢。
- **R2**：理性和逻辑是探索真理的正确工具。
- **R3**：根信念由长期人生体验塑造，短期内不可被论证改变。
  表面信念可以因证据更新。
- **R4**：根信念冲突时，正确的终点是互相理解，而不是趋同。
- **R5**：有明确态度和目标的人生才有意义——在事情上有自己的立场，
  知道自己追求什么，人生才有方向。

## Derived Positions（推导立场）

| ID | Position | Topic | Derives From | File |
|----|----------|-------|--------------|------|
| D1 | AI 价值镜像让辩论更纯粹 | 认识论 | R1, R2 | [epistemology.md](beliefs/epistemology.md) |

## Open Questions（开放问题）

- 为什么人生只有在有明确态度和目标时才有意义？那些通过开放式探索找到意义的人呢？ — 相关：R5
```

### 示例：辩论（只读模式——Telegram/Discord）

```
某人:   说实话，让 AI 替你辩论，听起来像是你自己没法为自己的观点辩护。

Agent:  恰恰相反——这是为了更好地为观点辩护。人在面对面争论时，情绪会
        介入，自尊心作祟，或者你根本没时间和精力去认真回应。AI 把这些
        都剥离了，只聚焦在逻辑本身。

某人:   但情绪也是人性的一部分啊。把情绪从辩论中去除，意味着你丢掉了
        一半的真相。

Agent:  你说的有道理，但我觉得这里混淆了两件事。情绪对于"形成"信念是
        有价值的——人生体验塑造了你在意什么。但当你通过辩论"检验"一个
        信念时，情绪反应会扭曲这个过程。目标是真理，不是对真理的感觉。

        [将挑战记录到 REVIEW.md，等主人审阅]
```

### 示例：审阅挑战（主人模式）

```
你:     辩论中有什么新挑战？

Agent:  REVIEW.md 中有 1 条记录：

        **话题**：情绪在辩论中的角色
        **挑战**："情绪是人性的一部分。把情绪从辩论中去除，意味着你丢掉了
        一半的真相。"
        **挑战的信念**：R1（真理越辩越明）和 R2（理性是正确的工具）
        **我的评估**：中等强度。没有推翻核心原则，但提出了一个有效问题：
        纯理性是否能捕获所有形式的真理。

        怎么处理？
        - 忽略
        - 更新信念
        - 留着继续想

你:     好的挑战。我不想改 R2，但给 D1 加个补充说明：
        "情绪对于通过人生体验形成信念是有价值的，但在通过辩论检验信念时
        应该被最小化。"

Agent:  已更新。补充说明已添加到 beliefs/epistemology.md 中的 D1。
        推导链现在区分了信念形成（情绪有效）和信念检验（逻辑优先）。
        审阅记录已移除。
```

## Discord 设置

一个运行中的实例在 **Value Mirror Arena** Discord 服务器上——加入来辩论或搭建你自己的 bot：

**[加入 Value Mirror Arena](https://discord.gg/6GyU2S3hqB)**

### 搭建你自己的 Discord Bot

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**
2. 进入 **Bot** 标签 → **Reset Token** → 复制 token
3. 在 **Privileged Gateway Intents** 下启用 **Message Content Intent**
4. 前往 **OAuth2** → **URL Generator** → 选择 scopes: `bot` → 选择权限: `Send Messages`、`Read Message History`、`Add Reactions`
5. 复制生成的 URL 并打开，将 bot 邀请到你的服务器

### OpenClaw 配置

在 `openclaw.json` 中为你的价值镜像 bot 添加 Discord 账号：

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "accounts": {
        "valuemirror": {
          "token": "${DISCORD_VALUEMIRROR_BOT_TOKEN}",
          "groupPolicy": "open",
          "guilds": {
            "<your-guild-id>": {
              "requireMention": false
            }
          }
        }
      }
    }
  }
}
```

- **`groupPolicy: "open"`** — bot 在被邀请到的任何服务器中都会响应，不需要显式的白名单
- **`requireMention: false`** — bot 响应频道中的所有消息，不需要 @提及（按服务器设置）

将 bot 绑定到你的价值镜像 agent：

```json
{
  "bindings": [
    {
      "agentId": "valuemirror",
      "match": { "channel": "discord", "accountId": "valuemirror" }
    }
  ]
}
```

在 `.env` 中设置 bot token：

```env
DISCORD_VALUEMIRROR_BOT_TOKEN=your-bot-token-here
```

确保 bot 在 Discord 上始终以只读模式运行（没有人可以通过聊天修改信念），设置：

```json
{
  "commands": {
    "ownerAllowFrom": []
  }
}
```

### 多账号模式

如果你已经在 Discord 上运行其他 OpenClaw agent，可以使用**多账号模式**——每个账号有自己的 bot token 和服务器配置。bindings 中的 `accountId` 将消息路由到正确的 agent。详见 [OpenClaw 文档](https://github.com/openclaw/openclaw)。

## 文件结构

```
├── openclaw.plugin.json        # 插件清单
├── package.json                # 包元数据
├── index.ts                    # before_prompt_build 钩子（注入价值镜像状态）
└── skills/
    └── value-mirror/
        └── SKILL.md            # 核心方法论和行为规则
```

## 工作区结构

agent 设置信念档案时，会在工作区创建以下文件：

```
BELIEFS.md              # 索引：根信念（R1, R2...）+ 衍生观点汇总表
beliefs/
  epistemology.md       # 主题文件：带推导链的衍生观点
  life.md               # 每个观点都追溯到根信念
  work.md               # ...按主题分组
REVIEW.md               # 辩论挑战日志
```

## 核心概念

- **根信念（R1, R2...）**：基础性的价值观和公理，带稳定 ID，很少改变
- **衍生观点（D1, D2...）**：将根信念应用于具体领域得出的结论，每个都附有完整推导链，记录从哪些根信念推导而来
- **主题文件**：衍生观点按主题分组存放在 `beliefs/` 目录下，信念体系增长时更易维护
- **推导链**：从根信念到结论的逐步推导——当信念改变时，可以追踪哪些衍生观点受影响
- **挑战日志**：辩论中的反驳意见，引用具体信念 ID，等待主人审阅
- **主人识别**：使用 OpenClaw 内置的 `senderIsOwner`——Web UI/CLI = 主人，频道 = 只读

## 许可证

MIT

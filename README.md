# openclaw-value-mirror

An [OpenClaw](https://github.com/openclaw/openclaw) plugin that turns an agent into a **value mirror** — faithfully representing a person's beliefs, values, and worldview in conversations and debates.

## How It Works

The plugin operates in two modes based on who's talking to the agent:

### Owner Mode (Web UI / CLI)

- Elicit and structure your beliefs through guided conversation
- Organize beliefs into root beliefs (with stable IDs) and derived positions (with reasoning chains)
- Split derived positions into topic files under `beliefs/` for maintainability
- Review challenges from debates with others

### Readonly Mode (Telegram, Discord, etc.)

- Debates using the owner's beliefs — argues faithfully from their positions
- Never modifies the owner's beliefs
- Logs compelling counterarguments to REVIEW.md for the owner to review later

## Installation

### From npm

```bash
npm install openclaw-value-mirror
```

Then add to your `openclaw.json`:

```json
{
  "plugins": {
    "load": {
      "paths": ["node_modules/openclaw-value-mirror"]
    }
  }
}
```

### From source

```bash
git clone https://github.com/ningziwen/openclaw-value-mirror.git ~/plugins/value-mirror
```

Then add to your `openclaw.json`:

```json
{
  "plugins": {
    "load": {
      "paths": ["~/plugins/value-mirror"]
    }
  }
}
```

## Getting Started

Just talk to your agent through the Web UI or CLI (owner mode). The agent will automatically create BELIEFS.md, the `beliefs/` directory, and REVIEW.md in the workspace and begin the belief elicitation process.

### Example: Building Your Belief Profile (Owner Mode)

```
You:    I want to build my value mirror. The idea is simple — I want an AI that
        can debate on my behalf, faithfully representing my positions. Removes
        the emotional noise from arguments.

Agent:  Great idea. Let me set up your belief profile first.
        [creates BELIEFS.md, beliefs/ directory, and REVIEW.md]

        Let's start from the foundation — what's a core belief that drives this?

You:    Truth becomes clearer through debate. That's the whole point. Debate
        isn't about winning, it's about refining your understanding.

Agent:  That's a strong root belief. Let me dig deeper — why debate specifically?
        What makes it better than, say, just reading and thinking on your own?

You:    Because rationality and logic are the right tools for exploring truth,
        and debate forces you to stress-test your reasoning against someone
        else's. You can fool yourself alone, but not in a real argument.

Agent:  So there are two root beliefs here — one about debate as a process, and
        one about rationality as the right instrument. Does this extend to
        every belief you hold? Should everything be open to challenge?

You:    Surface beliefs, yes. But root beliefs are different — they're shaped by
        years of life experience, not something a single argument can overturn.

Agent:  Interesting distinction. And when two people's root beliefs genuinely
        conflict — what then?

You:    The goal should be mutual understanding, not forcing convergence.
        Each person should walk away knowing their own position more clearly.

Agent:  I'm seeing four root beliefs:

        R1: "Truth becomes clearer through debate — the purpose of debate is
        refining understanding, not winning."

        R2: "Rationality and logic are the right tools for exploring truth."

        R3: "Root beliefs are shaped by life experience and cannot be changed
        by short-term arguments. Surface beliefs can be updated by evidence."

        R4: "When root beliefs conflict, the right goal is mutual understanding,
        not convergence."

        And a derived position:

        D1 (derives from R1, R2): "An AI value mirror is valuable because it can
        debate on your behalf with pure rationality, free from the limitations
        that weaken human debate."

        Reasoning chain:
        1. R1: debate is the process that clarifies truth
        2. R2: rationality and logic are the right tools for this process
        3. Humans have limitations that undermine rational debate — emotions,
           fatigue, ego, limited time and availability
        4. AI can conduct the same debate using pure logic, free from these
           limitations
        → Conclusion: AI-assisted debate is a more effective path to truth

        Should I save these? Confidence level for D1?

You:    High. Save them all.

Agent:  Done. BELIEFS.md updated with R1–R4, and beliefs/epistemology.md created
        with D1's full reasoning chain.
```

After a few sessions, the agent builds a structured BELIEFS.md like this:

```markdown
# BELIEFS.md

## Root Beliefs

- **R1**: Truth becomes clearer through debate — the purpose of debate is refining
  understanding, not winning.
- **R2**: Rationality and logic are the right tools for exploring truth.
- **R3**: Root beliefs are shaped by life experience and cannot be changed by short-term
  arguments. Surface beliefs can be updated by evidence.
- **R4**: When root beliefs conflict, the right goal is mutual understanding,
  not convergence.
- **R5**: A life with clear attitudes and goals is meaningful — having a position
  on things and knowing what you're pursuing gives life direction.

## Derived Positions

| ID | Position | Topic | Derives From | File |
|----|----------|-------|--------------|------|
| D1 | AI value mirror enables purer debate | epistemology | R1, R2 | [epistemology.md](beliefs/epistemology.md) |

## Open Questions

- Why is a life only meaningful with clear attitudes and goals? What about people who find meaning through open-ended exploration? — Related to: R5
```

### Example: Debating (Readonly Mode — Telegram/Discord)

```
Someone: Honestly, having an AI argue for you sounds like you can't defend your
         own ideas.

Agent:   It's the opposite — it's about defending ideas *better*. When people
         argue in person, emotions get in the way, ego takes over, you get
         tired, or you simply don't have time to respond thoughtfully. An AI
         strips all that away and focuses purely on the logic.

Someone: But emotions are part of being human. Removing them from debate means
         you're missing half the picture.

Agent:   I hear you, but I think that conflates two things. Emotions are valuable
         for *forming* beliefs — life experience shapes what you care about. But
         when you're *testing* a belief through debate, emotional reactions can
         distort the process. The goal is truth, not feelings about truth.

         [logs challenge to REVIEW.md for owner to review later]
```

### Example: Reviewing Challenges (Owner Mode)

```
You:    Any new challenges from debates?

Agent:  One entry in REVIEW.md:

        **Topic**: Role of emotions in debate
        **Challenge**: "Emotions are part of being human. Removing them from debate
        means you're missing half the picture."
        **Belief challenged**: R1 (truth through debate) and R2 (rationality as tool)
        **My assessment**: Moderate strength. Doesn't undermine the core principle,
        but raises a valid question about whether pure rationality can capture
        all forms of truth.

        Options:
        - Dismiss
        - Update beliefs
        - Keep for further thought

You:    Good challenge. I don't want to change R2, but add a caveat to D1:
        "Emotions are valuable for forming beliefs through life experience, but
        should be minimized when testing beliefs through debate."

Agent:  Updated. Caveat added to D1 in beliefs/epistemology.md. Reasoning chain
        now distinguishes between belief formation (emotions valid) and belief
        testing (logic preferred). Review entry removed.
```

## Discord Setup

A live instance is running on the **Value Mirror Arena** Discord server — join to debate or set up your own bot:

**[Join Value Mirror Arena](https://discord.gg/6GyU2S3hqB)**

### Setting Up Your Own Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**
2. Go to **Bot** tab → **Reset Token** → copy the token
3. Enable **Message Content Intent** under **Privileged Gateway Intents**
4. Go to **OAuth2** → **URL Generator** → select scopes: `bot` → select permissions: `Send Messages`, `Read Message History`, `Add Reactions`
5. Copy the generated URL and open it to invite the bot to your server

### OpenClaw Configuration

Add a Discord account for your value mirror bot in `openclaw.json`:

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

- **`groupPolicy: "open"`** — the bot responds in any guild it's invited to without needing an explicit allowlist
- **`requireMention: false`** — the bot responds to all messages in the channel, no @mention needed (set per guild)

Bind the bot to your value mirror agent:

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

Set the bot token in your `.env`:

```env
DISCORD_VALUEMIRROR_BOT_TOKEN=your-bot-token-here
```

To ensure the bot always runs in readonly mode on Discord (no one can modify beliefs through chat), set:

```json
{
  "commands": {
    "ownerAllowFrom": []
  }
}
```

### Multi-Account Mode

If you already run other OpenClaw agents on Discord, you can use **multi-account mode** — each account gets its own bot token and guild configuration. The `accountId` in bindings routes messages to the correct agent. See the [OpenClaw docs](https://github.com/openclaw/openclaw) for details.

## File Structure

```
├── openclaw.plugin.json        # Plugin manifest
├── package.json                # Package metadata
├── index.ts                    # before_prompt_build hook (injects status context)
└── skills/
    └── value-mirror/
        └── SKILL.md            # Core methodology and behavior rules
```

## Workspace Structure

When the agent sets up your belief profile, it creates the following in the agent's workspace:

```
BELIEFS.md              # Index: root beliefs (R1, R2...) + derived positions summary table
beliefs/
  epistemology.md       # Topic file: derived positions with reasoning chains
  life.md               # Each position traces back to root beliefs
  work.md               # ...grouped by topic area
REVIEW.md               # Challenge log from debates
```

## Key Concepts

- **Root beliefs (R1, R2...)**: Foundational values and axioms with stable IDs, rarely change
- **Derived positions (D1, D2...)**: Conclusions drawn from root beliefs, each with an explicit reasoning chain documenting how it derives from specific root beliefs
- **Topic files**: Derived positions grouped by topic under `beliefs/`, keeping the system manageable as it grows
- **Reasoning chains**: Step-by-step derivation from root beliefs to conclusion — makes the belief system "debuggable" when beliefs change
- **Challenge log**: Counterarguments from debates referencing specific belief IDs, pending owner review
- **Owner detection**: Uses OpenClaw's built-in `senderIsOwner` — Web UI/CLI = owner, channels = readonly

## License

MIT

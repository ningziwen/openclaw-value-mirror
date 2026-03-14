import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const plugin = {
  id: "openclaw-value-mirror",
  name: "Value Mirror",
  description:
    "Agents that faithfully represent a person's values, beliefs, and worldview.",

  register(api: OpenClawPluginApi) {
    // Inject dynamic context about the value-mirror state before each prompt.
    // The agent already receives `senderIsOwner` in its system prompt,
    // so the skill instructions handle owner vs readonly logic.
    // This hook adds awareness of which workspace files exist.
    api.on("before_prompt_build", (event, ctx) => {
      const workspaceDir = ctx.workspaceDir;
      if (!workspaceDir) return;

      const beliefsPath = join(workspaceDir, "BELIEFS.md");
      const reviewPath = join(workspaceDir, "REVIEW.md");
      const soulPath = join(workspaceDir, "SOUL.md");

      const hasBeliefs = existsSync(beliefsPath);
      const hasReview = existsSync(reviewPath);
      const hasSoul = existsSync(soulPath);

      // Only inject context if this workspace uses value-mirror
      if (!hasBeliefs && !hasSoul) return;

      const segments: string[] = [];
      segments.push("## Value Mirror Status");

      if (hasBeliefs) {
        segments.push("- BELIEFS.md: present");
      } else {
        segments.push(
          "- BELIEFS.md: missing (ask the owner to set up their beliefs)",
        );
      }

      if (hasSoul) {
        segments.push("- SOUL.md: present");
      }

      if (hasReview) {
        const content = readFileSync(reviewPath, "utf-8");
        const entryCount = (content.match(/^## /gm) || []).length;
        segments.push(`- REVIEW.md: ${entryCount} entries pending review`);
      } else {
        segments.push("- REVIEW.md: no pending reviews");
      }

      return {
        appendSystemContext: segments.join("\n"),
      };
    });
  },
};

export default plugin;

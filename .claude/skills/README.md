# Skills

Project-level skills for Claude Code. Each subdirectory with a `SKILL.md` is
auto-discovered and made available in Claude Code sessions (web and local) —
no `/plugin install` required.

## Included skills

These were imported from the **[superpowers-lab](https://github.com/obra/superpowers-lab)**
plugin by Jesse Vincent (obra), MIT-licensed (see `LICENSE`).

| Skill | Purpose | Runtime needs |
|-------|---------|---------------|
| `finding-duplicate-functions` | Detect semantic code duplication (same intent, different code) via two-phase LLM clustering | shell + LLM |
| `mcp-cli` | Invoke MCP servers on-demand via the `mcp` CLI without pre-loading them | `mcp` CLI installed |
| `using-tmux-for-interactive-commands` | Drive interactive TUIs (vim, `git rebase -i`, REPLs) through tmux | `tmux` installed |
| `windows-vm` | Create/manage a headless Windows 11 VM in Docker (KVM + SSH) | Docker + KVM (not available in the web sandbox) |

## Notes

- `windows-vm` requires Docker with KVM acceleration and will not run inside the
  Claude Code web sandbox, but is included so it's available when running locally.
- `using-tmux-for-interactive-commands` and `mcp-cli` depend on `tmux` / the `mcp`
  CLI being installed in the environment where the session runs.

## Caveman skills

Imported from the **[caveman](https://github.com/JuliusBrussee/caveman)** plugin
by Julius Brussee, MIT-licensed (see `CAVEMAN-LICENSE`). Companion agents live in
`../agents/` (`cavecrew-investigator`, `cavecrew-builder`, `cavecrew-reviewer`).

| Skill | Purpose |
|-------|---------|
| `caveman` | Ultra-compressed reply mode (lite/full/ultra/wenyan). On-demand via `/caveman`. |
| `caveman-commit` | Conventional-Commit messages, ≤50-char subject. |
| `caveman-review` | One-line-per-finding PR review comments. |
| `caveman-stats` | Session token usage + estimated savings. |
| `caveman-compress` | Rewrite memory files (e.g. `CLAUDE.md`) into compact form. |
| `caveman-help` | Quick reference for all caveman modes/commands. |
| `cavecrew` | Decision guide for when to delegate to the `cavecrew-*` agents. |

**Only the skills + agents are installed** — these activate on demand (e.g.
typing `/caveman`). The plugin's *always-on* behavior (SessionStart hook,
statusline badge, `caveman-shrink` MCP server) is **not** wired up; that requires
`.claude/settings.json` hook/statusline/MCP configuration. The original plugin's
hook scripts are not included here.

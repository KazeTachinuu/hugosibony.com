---
title: "Stabilize a reverse shell"
description: "Turn a raw netcat shell into a full interactive TTY: job control, arrow keys, tab-completion, and a working Ctrl+C."
date: 2025-04-08T11:14:36-04:00
updated: 2026-07-18
categories: ["notes"]
tags: ["reverse", "shell", "tty", "stabilize", "linux"]
---

A raw reverse shell has no job control, no arrow keys, no tab-completion, and Ctrl+C kills the whole session instead of the running command. Three steps fix that.

## 1. Spawn a PTY

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

Gives you a real TTY. You still have no autocompletion, arrow keys, or working Ctrl+C.

## 2. Set TERM

```bash
export TERM=xterm
```

Lets full-screen programs work: `clear`, `less`, `vim`, and anything that reads terminal capabilities.

## 3. Fix your local terminal

Background the shell with Ctrl+Z, then run this in your own terminal:

```bash
stty raw -echo; fg
```

- `stty raw -echo` turns off local echo and line buffering, so tab-completion, arrow keys, and Ctrl+C reach the remote shell.
- `fg` foregrounds the backgrounded shell.

To fix line wrapping, read your terminal size locally with `stty size` (rows then columns), then set it in the remote shell:

```bash
stty rows 50 cols 200
```

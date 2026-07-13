---
title: "Stable Reverse Shell"
description: "Steps to stabilize a shell"
date: 2025-04-08T11:14:36-04:00
updated: 2026-07-13
categories: ["notes"]
tags: ["reverse", "shell", "tty", "stabilize", "linux"]
---

### Step one: spawn a PTY

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

This gives you a proper TTY. Still missing autocompletion, arrow keys, and a working CTRL+C.

### Step two: set TERM

```bash
export TERM=xterm
```

Enables terminal commands like `clear`.

### Step three: fix your local terminal

Background the shell with `CTRL+Z`, then back in your own terminal:

```bash
stty raw -echo; fg
```

- `stty raw -echo` turns off local echo and line buffering, so tab-completion, arrow keys, and CTRL+C reach the remote shell.
- `fg` foregrounds the backgrounded shell.

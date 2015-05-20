# nodejs-buffer-bug-case

This code seems to trigger a bug in node.js. It happens like so:
```shell
➜  nodejs-buffer-bug-case git:(master) ✗ uname -a
Darwin skerton.local 14.3.0 Darwin Kernel Version 14.3.0: Mon Mar 23 11:59:05 PDT 2015; root:xnu-2782.20.48~5/RELEASE_X86_64 x86_64
➜  nodejs-buffer-bug-case git:(master) ✗ ~/.local/node-v0.10.38-darwin-x64/bin/node bug-case.js
➜  nodejs-buffer-bug-case git:(master) ✗ ~/.local/node-v0.11.0-darwin-x64/bin/node bug-case.js
[1]    40675 segmentation fault  ~/.local/node-v0.11.0-darwin-x64/bin/node bug-case.js
➜  nodejs-buffer-bug-case git:(master) ✗ ~/.local/node-v0.12.3-darwin-x64/bin/node bug-case.js
[1]    41048 segmentation fault  ~/.local/node-v0.12.3-darwin-x64/bin/node bug-case.js
```

It appears to happen in `Buffer.toString()`, yet seems not to happen if I call
`console.log()` first:
```shell
➜  nodejs-buffer-bug-case git:(master) ✗ USE_CONSOLE_LOG=1 ~/.local/node-v0.10.38-darwin-x64/bin/node bug-case.js
{... output omitted, but no segfault ...}
➜  nodejs-buffer-bug-case git:(master) ✗ USE_CONSOLE_LOG=1 ~/.local/node-v0.11.0-darwin-x64/bin/node bug-case.js
{... output omitted, but no segfault ...}
➜  nodejs-buffer-bug-case git:(master) ✗ USE_CONSOLE_LOG=1 ~/.local/node-v0.12.3-darwin-x64/bin/node bug-case.js
{... output omitted, but no segfault ...}
```

Additionally, the issue seems to go away when I make a throwaway copy of the
buffer that I never use:
```shell
➜  nodejs-buffer-bug-case git:(master) ✗ USE_BUFFER_COPY=1 ~/.local/node-v0.10.38-darwin-x64/bin/node bug-case.js
{... output omitted, but no segfault ...}
➜  nodejs-buffer-bug-case git:(master) ✗ USE_BUFFER_COPY=1 ~/.local/node-v0.11.0-darwin-x64/bin/node bug-case.js
{... output omitted, but no segfault ...}
➜  nodejs-buffer-bug-case git:(master) ✗ USE_BUFFER_COPY=1 ~/.local/node-v0.12.3-darwin-x64/bin/node bug-case.js
{... output omitted, but no segfault ...}
```

It also does *not* appear to happen on my Ubuntu VM:
```shell
lmorchard@lmorchard:~/nodejs-buffer-bug-case$ uname -a
Linux lmorchard.xen.prgmr.com 3.2.0-23-virtual #36-Ubuntu SMP Tue Apr 10 22:29:03 UTC 2012 x86_64 x86_64 x86_64 GNU/Linux
lmorchard@lmorchard:~/nodejs-buffer-bug-case$ ~/.local/node-v0.11.0-linux-x64/bin/node bug-case.js
```

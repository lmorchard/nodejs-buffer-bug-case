# nodejs-buffer-bug-case

This code seems to trigger a bug in node.js. It happens like so:
```shell
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


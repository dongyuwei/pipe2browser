pipe2browser
============

pipe output( **stdout** and **stderror** ) of shell cmd to browser,instantly. by nodejs

how to use?
1. `sudo npm install -g pipe2browser`
2. modify the `cmd` in **cmd.json** of current dir(if `cmd.json` does't exists, create it) to test.
a example cmd.json:
```
{
    "cmd":"svn up --non-interactive --trust-server-cert --username dyw --password myPasswd /tmp/myCode"
}
```
3. `pipe2browser -restart`, enjoy!

 ** Note: the default **cmd.json** should exists in your current dir(`pwd`), where you start  pipe2browser** 

 
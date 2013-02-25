pipe output( **stdout** and **stderror** ) of shell cmd to browser,instantly. by nodejs
============

how to use?

1. `sudo npm install -g pipe2browser`
2. modify the `cmd` in **cmd.json** of current dir to test.
3. `pipe2browser -restart`, enjoy!

an example cmd.json:
```
{
    "cmd":"svn up --non-interactive --trust-server-cert --username dyw --password myPasswd /tmp/myCode"
}
```

__Note:__ a default **cmd.json** will created in your current dir(`pwd`), where you start  **pipe2browser** 

 

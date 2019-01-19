## Webhook Service demo

一个基于koa用来处理webhook回调的服务的小小demo

### 项目目录

```
├── package.json
├── pm2.config.js // 生产环境的pm2配置文件
└── src
    ├── app.js    // 应用入口文件
    ├── config.js // 应用配置文件
    ├── router.js // 路由定义文件
    ├── scripts   // 存放需要执行的node脚本文件
    │   └── demo.js 
    └── utils
        └── tools.js // 常用函数的封装
```

### 项目依赖

+ koa全家桶
+ `simple-git` 在node中执行git命令
+ `node-cmd` 在node中执行命令行命令
+ `bluebird` 将`node-cmd` 的命令转为promise

### npm script

+ `npm run dev` 使用`nodemon`启动入口文件，用于开发
+ `npm run start` 生产环境使用`pm2`启动项目
+ `npm run reload` 重启生产环境的服务

### 添加一个新项目

1. 添加路由：在`router.js`中添加对应路由以及过滤条件，参考`/demo`路由
2. 添加执行脚本：在`script.js`中添加需要执行的脚本文件，参考`demo.js`
3. 重启项目：`npm run reload`
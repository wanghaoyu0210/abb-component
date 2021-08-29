# npm publish
## npm login登陆
## package.json配置
* "private": false 
* "files": ["dist"] // 发布的时候上传哪些文件
* "peerDependencies": {"vue": "^3.0.0"} // 外部依赖
* script: { "prepublishOnly": "npm run build" } // 确保npm publish的是最新的dist文件

## 发布前的准备
* 检查eslint---npm run lint 
* 单元测试---npm run test
* rollup打包---npm run build

## 安装husky运行git生命周期
```
npm install husky@4 -D

// package.json 配置下面这段代码
"husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test"
    }
}
```